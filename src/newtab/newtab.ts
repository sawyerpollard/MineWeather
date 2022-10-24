import * as Position from '../lib/position';
import * as Weather from '../lib/weather';
import { Unit } from '../lib/weather';

import { getWeatherImage } from '../lib/weatherImage';
import { getCondition } from '../lib/condition';
import { getTime } from '../lib/time';

import handleResize from '../lib/handleResize';
import getStorageItem from '../lib/storageUtils';

import theme from '../themes/minecraft';

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
    const unit = await getStorageItem('unit') as Unit;
    const TTL = await getStorageItem('TTL') as number;

    const position = await Position.getCachedPosition(TTL);
    const { coords } = position;


    // Remove help text
    clearTimeout(helpTimeout);
    helpText.style.opacity = '0';
    setTimeout(() => helpText.remove(), 1000);


    // Retrieve current weather and get description
    const weather = await Weather.getCachedWeather(coords.latitude, coords.longitude, TTL);
    const description = Weather.weatherCodeString(weather.weatherCode);


    // Get weather image
    const condition = getCondition(
        Weather.getTemperature(weather, unit),
        Weather.getDewPoint(weather, unit),
        Weather.isSnowing(weather),
        Weather.isRaining(weather),
        unit,
    );

    const time = getTime(weather.timestamp, weather.sunrise, weather.sunset);
    const weatherImage = getWeatherImage(theme, condition, time);


    // Create HTML elements
    createElements(
        weatherImage.caption, theme.basePath + weatherImage.filePath,
        weatherImage.attribution.author, weatherImage.attribution.link,
        Weather.getTemperature(weather, unit), description,
        (Date.now() / 1000 - weather.timestamp) / 60,
    );
}

loadNewTab();
