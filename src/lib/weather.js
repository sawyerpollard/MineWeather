import getStorageItem from './storageUtils.js';

async function getCurrentWeather(latitude, longitude, units, lang, apiKey) {
    const base = 'https://api.openweathermap.org';
    const endpoint = new URL(`/data/2.5/onecall?lang=${lang}&lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`, base);

    console.log('Weather API called.');
    const response = await fetch(endpoint);
    return response.json();
}

function expired(lastUpdated, TTL) {
    return (Date.now() - lastUpdated) / 60000 > TTL;
}

async function getCachedWeather(coords, units, lang, TTL, apiKey) {
    const cachedWeatherObject = (await getStorageItem('weatherObject')).weatherObject;

    if (cachedWeatherObject !== undefined) {
        const { lastUpdated } = cachedWeatherObject;
        const cachedUnits = cachedWeatherObject.units;
        const cachedLang = cachedWeatherObject.lang;

        if (!expired(lastUpdated, TTL) && cachedUnits === units && cachedLang === lang) {
            console.log('Weather cache hit.\n');
            return cachedWeatherObject;
        }
    }

    const currentWeather = await getCurrentWeather(coords.latitude, coords.longitude, units, lang, apiKey);

    const weatherObject = {
        weather: currentWeather,
        units,
        lang,
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

function getTimeOfDay(currentTime, sunriseTime, sunsetTime) {
    const minutesFromSunrise = Math.abs((currentTime - sunriseTime) / 60);
    const minutesFromSunset = Math.abs(currentTime - sunsetTime) / 60;

    if (minutesFromSunset < 30 || minutesFromSunrise < 30) return 'sunset';

    if (currentTime > sunsetTime || currentTime < sunriseTime) return 'night';

    return 'day';
}

export {
    getCurrentWeather, getCachedWeather, getTemperature, getDewPoint, isSnowing, isRaining, getTimeOfDay,
};
