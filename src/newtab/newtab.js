import WeatherImage from '../lib/WeatherImage.js';
import Condition from '../lib/Condition.js';

import * as Position from '../lib/position.js';
import * as Weather from '../lib/weather.js';

import handleResize from '../lib/handleResize.js';
import getStorageItem from '../lib/storageUtils.js';

import imageObject from '../image_objects/Minecraft.js';

import apiKey from '../apiKey.js';

// eslint-disable-next-line max-len
function createElements(imageCaption, imagePath, imageAuthor, imageLink, temperature, description, cacheLifetime) {
    const fullscreenImage = document.querySelector('#fullscreen-image');
    fullscreenImage.src = imagePath;

    fullscreenImage.addEventListener('load', () => handleResize(fullscreenImage));
    window.addEventListener('resize', () => handleResize(fullscreenImage));

    const descriptionElement = document.querySelector('#description');
    descriptionElement.innerHTML = imageCaption;

    const weatherElement = document.querySelector('#conditions');
    weatherElement.innerHTML = `${Math.round(temperature)}\u00B0 and ${description}`;

    const attributionElement = document.querySelector('#attribution');
    attributionElement.innerHTML = `By ${imageAuthor}`;
    attributionElement.href = imageLink;

    const lastUpdatedElement = document.querySelector('#last-updated');
    let lastUpdatedText;
    if (cacheLifetime < 2) {
        lastUpdatedText = 'Last updated moments ago.';
    } else if (cacheLifetime < 120) {
        lastUpdatedText = `Last updated ${Math.floor(cacheLifetime)} minutes ago.`;
    } else {
        lastUpdatedText = `Last updated ${Math.floor(cacheLifetime / 60)} hours ago.`;
    }
    lastUpdatedElement.innerHTML = lastUpdatedText;

    const loadingPane = document.querySelector('#loading-pane');
    loadingPane.style.opacity = 0;
    setTimeout(() => loadingPane.remove(), 1000);
}

async function loadNewTab() {
    const { units } = await getStorageItem('units');
    const { TTL } = await getStorageItem('TTL');

    const helpText = document.querySelector('#help');
    const helpTimeout = setTimeout(() => { helpText.style.opacity = 1; }, 3000);

    const position = await Position.getCachedPosition(TTL);
    const { coords } = position;

    clearTimeout(helpTimeout);
    helpText.style.opacity = 0;
    setTimeout(() => helpText.remove(), 1000);

    if ((await getStorageItem('apiKey')).apiKey === undefined) {
        chrome.storage.local.set({ apiKey });
    }

    const { weather, lastUpdated } = await Weather.getCachedWeather(coords, units, TTL, apiKey);

    const descriptions = weather.current.weather.map((condition) => condition.description);

    const condition = Condition.get(
        Weather.getTemperature(weather),
        Weather.getDewPoint(weather),
        Weather.isSnowing(weather),
        Weather.isRaining(weather),
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
