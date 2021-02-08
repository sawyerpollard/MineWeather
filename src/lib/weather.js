/* eslint-disable max-len */

import getStorageItem from './storageUtils.js';

async function getCurrentWeather(latitude, longitude, units, apiKey) {
    const base = 'https://api.openweathermap.org';
    const endpoint = new URL(`/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`, base);

    console.log('Weather API called.');
    const response = await fetch(endpoint);
    return response.json();
}

function expired(lastUpdated, TTL) {
    return (Date.now() - lastUpdated) / 60000 > TTL;
}

async function getCachedWeather(coords, units, TTL, apiKey) {
    const cachedWeatherObject = (await getStorageItem('weatherObject')).weatherObject;

    if (cachedWeatherObject !== undefined) {
        const cachedUnits = cachedWeatherObject.units;
        const { lastUpdated } = cachedWeatherObject;

        if (!expired(lastUpdated, TTL) && cachedUnits === units) {
            console.log('Weather cache hit.\n');
            return cachedWeatherObject;
        }
    }

    const currentWeather = await getCurrentWeather(coords.latitude, coords.longitude, units, apiKey);

    const weatherObject = {
        weather: currentWeather,
        units,
        lastUpdated: Date.now(),
    };

    chrome.storage.local.set({ weatherObject });
    console.log('Weather cache renewed.\n');
    return weatherObject;
}

function getTemperature(weather) {
    return weather.current.temp;
}

function getDewPoint(weather) {
    return weather.current.dew_point;
}

function isSnowing(weather) {
    const conditions = weather.current.weather.map((condition) => condition.main);
    return conditions.includes('Snow');
}

function isRaining(weather) {
    const conditions = weather.current.weather.map((condition) => condition.main);
    return conditions.includes('Rain');
}

export {
    getCurrentWeather, getCachedWeather, getTemperature, getDewPoint, isSnowing, isRaining,
};
