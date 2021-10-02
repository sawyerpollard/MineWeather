async function getCurrentWeather(latitude, longitude, units, lang, apiKey) {
    const base = 'https://api.openweathermap.org';
    const endpoint = new URL(`/data/2.5/onecall?lang=${lang}&lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`, base);

    console.log('Weather API called.');
    const response = await fetch(endpoint);
    return response.json();
}

function getStorageItem(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve);
    });
}

async function cacheWeather(coords, units, lang, apiKey) {
    const currentWeather = await getCurrentWeather(coords.latitude, coords.longitude, units, lang, apiKey);

    const weatherObject = {
        weather: currentWeather,
        units,
        lang,
        lastUpdated: Date.now(),
    };

    chrome.storage.local.set({ weatherObject });
}

chrome.runtime.onInstalled.addListener(async () => {
    console.log('Installing ...');

    const units = 'imperial';
    const TTL = 30;

    chrome.storage.local.set({ units });
    chrome.storage.local.set({ TTL });

    chrome.alarms.create({ periodInMinutes: TTL });

    console.log('Installed.\n');
});

chrome.alarms.onAlarm.addListener(async () => {
    console.log('Beginning background weather refresh ...');

    const lang = chrome.i18n.getUILanguage().substring(0, 2);

    const { units } = await getStorageItem('units');

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

    await cacheWeather(coords, units, lang, apiKey);
    console.log('Finished background weather refresh.\n');
});
