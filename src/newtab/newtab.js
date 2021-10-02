import WeatherImage from '../lib/WeatherImage.js';
import Condition from '../lib/Condition.js';

import * as Position from '../lib/position.js';
import * as Weather from '../lib/weather.js';

import handleResize from '../lib/handleResize.js';
import getStorageItem from '../lib/storageUtils.js';

import imageObject from '../image_objects/Minecraft.js';

import apiKey from '../apiKey.js';

function createElements(imageCaption, imagePath, imageAuthor, imageLink, temperature, description, cacheLifetime) {
    const fullscreenImage = document.querySelector('#fullscreen-image');
    fullscreenImage.src = imagePath;

    fullscreenImage.addEventListener('load', () => handleResize(fullscreenImage));
    window.addEventListener('resize', () => handleResize(fullscreenImage));

    const descriptionElement = document.querySelector('#description');
    descriptionElement.innerHTML = imageCaption;

    const weatherElement = document.querySelector('#conditions');
    weatherElement.innerHTML = chrome.i18n.getMessage('conditionsDescription', [Math.round(temperature), description]);

    const attributionElement = document.querySelector('#attribution');
    attributionElement.innerHTML = chrome.i18n.getMessage('imageCredit', imageAuthor);
    attributionElement.href = imageLink;

    const lastUpdatedElement = document.querySelector('#last-updated');
    let lastUpdatedText;
    if (cacheLifetime < 2) {
        lastUpdatedText = chrome.i18n.getMessage('updatedMomentsAgo');
    } else if (cacheLifetime < 120) {
        lastUpdatedText = chrome.i18n.getMessage('updatedMinutesAgo', Math.floor(cacheLifetime));
    } else {
        lastUpdatedText = chrome.i18n.getMessage('updatedHoursAgo', Math.floor(cacheLifetime / 60));
    }
    lastUpdatedElement.innerHTML = lastUpdatedText;

    const loadingPane = document.querySelector('#loading-pane');
    loadingPane.style.opacity = 0;
    setTimeout(() => loadingPane.remove(), 1000);
}

async function loadNewTab() {
    const title = document.querySelector('title');
    title.innerHTML = chrome.i18n.getMessage('newTab');

    const helpText = document.querySelector('#help');
    helpText.innerHTML = chrome.i18n.getMessage('locationHelp');
    const helpTimeout = setTimeout(() => { helpText.style.opacity = 1; }, 3000);

    const lang = chrome.i18n.getUILanguage().substring(0, 2);

    const { units } = await getStorageItem('units');
    const { TTL } = await getStorageItem('TTL');

    const position = await Position.getCachedPosition(TTL);
    const { coords } = position;

    clearTimeout(helpTimeout);
    helpText.style.opacity = 0;
    setTimeout(() => helpText.remove(), 1000);

    if ((await getStorageItem('apiKey')).apiKey === undefined) {
        chrome.storage.local.set({ apiKey });
    }

    const { weather, lastUpdated } = await Weather.getCachedWeather(coords, units, lang, TTL, apiKey);

    const descriptions = weather.current.weather.map((condition) => condition.description);

    const condition = Condition.get(
        Weather.getTemperature(weather),
        Weather.getDewPoint(weather),
        Weather.isSnowing(weather),
        Weather.isRaining(weather),
        units,
    );

    const weatherImage = new WeatherImage(imageObject, condition);

    createElements(
        weatherImage.caption, weatherImage.path,
        weatherImage.author, weatherImage.link,
        Weather.getTemperature(weather), descriptions[0],
        (Date.now() - lastUpdated) / 60000,
    );
}

loadNewTab();
