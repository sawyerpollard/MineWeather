/* eslint-disable max-len */

async function getCurrentWeather(latitude, longitude, units, apiKey) {
    const base = 'https://api.openweathermap.org';
    const endpoint = new URL(`/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`, base);

    console.log('Weather API called.');
    const response = await fetch(endpoint);
    return response.json();
}

function getStorageItem(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve);
    });
}

async function cacheWeather(coords, units, apiKey) {
    const currentWeather = await getCurrentWeather(coords.latitude, coords.longitude, units, apiKey);

    const weatherObject = {
        weather: currentWeather,
        lastUpdated: Date.now(),
    };

    chrome.storage.local.set({ weatherObject });
}

chrome.runtime.onInstalled.addListener(async () => {
    console.log('Installing ...');

    const units = 'imperial';
    const language = 'english';
    const TTL = 30;

    chrome.storage.local.set({ units });
    chrome.storage.local.set({ language });
    chrome.storage.local.set({ TTL });

    chrome.alarms.create({ periodInMinutes: TTL });

    console.log('Installed.\n');
});

chrome.alarms.onAlarm.addListener(async () => {
    console.log('Beginning background weather refresh ...');
    const { units } = await getStorageItem('units');
    const { language } = await getStorageItem('language');

    const { apiKey } = await getStorageItem('apiKey');
    if (apiKey === undefined) {
        console.log('No API key stored.\n');
        return;
    }

    const { position } = await getStorageItem('position');
    if (position === undefined) {
        console.log('No position stored.\n');
        return;
    }
    const { coords } = position;

    await cacheWeather(coords, units, apiKey);
    console.log('Finished background weather refresh.\n');
});
