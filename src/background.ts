import { getCurrentWeather, Unit, WeatherObject } from './lib/weather';
import { Position } from './lib/position';
import getStorageItem from './lib/storageUtils';

async function cacheWeather(latitude: number, longitude: number, units: Unit, lang: string, apiKey: string) {
    const currentWeather = await getCurrentWeather(latitude, longitude, units, lang, apiKey);

    const weatherObject: WeatherObject = {
        weather: currentWeather,
        units,
        lang,
        lastUpdated: Date.now(),
    };

    chrome.storage.local.set({ weatherObject });
}

chrome.runtime.onInstalled.addListener(async () => {
    console.log('Installing ...');

    // Using navigator.language instead of chrome.getUILanguage() due to Chrome limitation
    const lang = navigator.language.substring(0, 2);

    if (await getStorageItem('units') as Unit === undefined) {
        const units = (lang === 'en') ? 'imperial' : 'metric';
        chrome.storage.local.set({ units });
    }

    const TTL = 30;

    chrome.storage.local.set({ TTL });

    chrome.alarms.create({ periodInMinutes: TTL });

    console.log('Installed.\n');
});

chrome.alarms.onAlarm.addListener(async () => {
    console.log('Beginning background weather refresh ...');

    const lang = await getStorageItem('lang') as string;
    if (lang === undefined) {
        console.log('No language stored.\n');
        return;
    }

    const units = await getStorageItem('units') as Unit;
    if (lang === undefined) {
        console.log('No units stored.\n');
        return;
    }

    const apiKey = await getStorageItem('apiKey') as string;
    if (apiKey === undefined) {
        console.log('No API key stored.\n');
        return;
    }

    const position = await getStorageItem('position') as Position;
    if (position === undefined) {
        console.log('No position stored.\n');
        return;
    }
    const { coords } = position;

    await cacheWeather(coords.latitude, coords.longitude, units, lang, apiKey);
    console.log('Finished background weather refresh.\n');
});
