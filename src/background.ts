import { getCurrentWeather, Unit } from './lib/weather';
import { Position } from './lib/position';
import getStorageItem from './lib/storageUtils';

async function cacheWeather(latitude: number, longitude: number) {
    const weatherData = await getCurrentWeather(latitude, longitude);

    chrome.storage.local.set({ weatherData });
}

chrome.runtime.onInstalled.addListener(async () => {
    console.log('Installing ...');

    // Using navigator.language instead of chrome.getUILanguage() due to Chrome limitation
    const lang = navigator.language.substring(0, 2);

    if (await getStorageItem('unit') as Unit === undefined) {
        const unit = (lang === 'en') ? 'imperial' : 'metric';
        chrome.storage.local.set({ unit });
    }

    const TTL = 30;

    chrome.storage.local.set({ TTL });

    chrome.alarms.create({ periodInMinutes: TTL });

    console.log('Installed.\n');
});

chrome.alarms.onAlarm.addListener(async () => {
    console.log('Beginning background weather refresh ...');

    const position = await getStorageItem('position') as Position;
    if (position === undefined) {
        console.log('No position stored.\n');
        return;
    }
    const { coords } = position;

    await cacheWeather(coords.latitude, coords.longitude);
    console.log('Finished background weather refresh.\n');
});
