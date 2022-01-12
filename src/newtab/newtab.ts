import * as Position from '../lib/position';
import * as Weather from '../lib/weather';
import { Unit } from '../lib/weather';

import { getWeatherImage } from '../lib/weatherImage';
import { getCondition } from '../lib/condition';
import { getTime } from '../lib/time';

import handleResize from '../lib/handleResize';
import getStorageItem from '../lib/storageUtils';

import theme from '../themes/minecraft';

import apiKey from '../apiKey';

import './newtab.css';

function createElements(imageCaption: string, imagePath: string, imageAuthor: string, imageLink: string, temperature: number, description: string, cacheLifetime: number) {
    // Create responsive fullscreen image
    const fullscreenImage = document.querySelector('#fullscreen-image') as HTMLImageElement;
    fullscreenImage.src = imagePath;

    fullscreenImage.addEventListener('load', () => handleResize(fullscreenImage));
    window.addEventListener('resize', () => handleResize(fullscreenImage));


    // Create weather description text
    const descriptionElement = document.querySelector('#description') as HTMLHeadingElement;
    descriptionElement.textContent = imageCaption;

    const weatherElement = document.querySelector('#conditions') as HTMLHeadingElement;
    weatherElement.textContent = chrome.i18n.getMessage('conditionsDescription', [Math.round(temperature).toString(), description]);


    // Create image attribution text
    const attributionElement = document.querySelector('#attribution') as HTMLAnchorElement;
    attributionElement.textContent = chrome.i18n.getMessage('imageCredit', imageAuthor);
    attributionElement.href = imageLink;


    // Create "last updated" text
    const lastUpdatedElement = document.querySelector('#last-updated') as HTMLDivElement;
    let lastUpdatedText;
    if (cacheLifetime < 2) {
        lastUpdatedText = chrome.i18n.getMessage('updatedMomentsAgo');
    } else if (cacheLifetime < 120) {
        lastUpdatedText = chrome.i18n.getMessage('updatedMinutesAgo', Math.floor(cacheLifetime).toString());
    } else {
        lastUpdatedText = chrome.i18n.getMessage('updatedHoursAgo', Math.floor(cacheLifetime / 60).toString());
    }
    lastUpdatedElement.textContent = lastUpdatedText;


    // Create loading icon
    const loadingPane = document.querySelector('#loading-pane') as HTMLDivElement;
    loadingPane.style.opacity = '0';
    setTimeout(() => loadingPane.remove(), 1000);
}

async function loadNewTab() {
    // Set new tab title
    const title = document.querySelector('title') as HTMLTitleElement;
    title.textContent = chrome.i18n.getMessage('newTab');


    // Display help text
    const helpText = document.querySelector('#help') as HTMLDivElement;
    helpText.textContent = chrome.i18n.getMessage('locationHelp');
    const helpTimeout = setTimeout(() => { helpText.style.opacity = '1'; }, 3000);


    // Retrieve necessary data
    const lang = chrome.i18n.getUILanguage().substring(0, 2);
    chrome.storage.local.set({ lang });

    const units = await getStorageItem('units') as Unit;
    const TTL = await getStorageItem('TTL') as number;

    const position = await Position.getCachedPosition(TTL);
    const { coords } = position;


    // Remove help text
    clearTimeout(helpTimeout);
    helpText.style.opacity = '0';
    setTimeout(() => helpText.remove(), 1000);
    

    // Store API key if not already
    if (await getStorageItem('apiKey') as string === undefined) {
        chrome.storage.local.set({ apiKey });
    }


    // Retrieve current weather and get descriptions
    const { weather, lastUpdated } = await Weather.getCachedWeather(coords.latitude, coords.longitude, units, lang, TTL, apiKey);
    const descriptions = weather.current.weather.map((condition) => condition.description);


    // Get weather image
    const condition = getCondition(
        Weather.getTemperature(weather),
        Weather.getDewPoint(weather),
        Weather.isSnowing(weather),
        Weather.isRaining(weather),
        units,
    );

    const time = getTime(weather.current.dt, weather.current.sunrise, weather.current.sunset);
    const weatherImage = getWeatherImage(theme, condition, time);


    // Create HTML elements
    createElements(
        weatherImage.caption, theme.basePath + weatherImage.filePath,
        weatherImage.attribution.author, weatherImage.attribution.link,
        Weather.getTemperature(weather), descriptions[0],
        (Date.now() - lastUpdated) / 60000,
    );
}

loadNewTab();
