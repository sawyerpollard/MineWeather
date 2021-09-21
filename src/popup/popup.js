/* eslint-disable no-param-reassign */

function getStorageItem(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve);
    });
}

async function updateUnitButtons(fahrenheitButton, celsiusButton, englishButton, frenchButton) {
    const { units } = await getStorageItem('units');
    const { language } = await getStorageItem('language');

    switch (units) {
        case 'imperial':
            fahrenheitButton.checked = true;
            break;
        case 'metric':
            celsiusButton.checked = true;
            break;
        default:
            fahrenheitButton.checked = true;
    }

    switch (language) {
        case 'english':
            englishButton.checked = true;
            break;
        case 'french':
            frenchButton.checked = true;
            break;
        default:
            englishButton.checked = true;
        }
}

const fahrenheitButton = document.querySelector('#fahrenheit');
const celsiusButton = document.querySelector('#celsius');
const englishButton = document.querySelector('#english')
const frenchButton = document.querySelector('#french')

updateUnitButtons(fahrenheitButton, celsiusButton, englishButton, frenchButton);

fahrenheitButton.addEventListener('click', () => {
    chrome.storage.local.set({ units: 'imperial' });
});

celsiusButton.addEventListener('click', () => {
    chrome.storage.local.set({ units: 'metric' });
});

englishButton.addEventListener('click', () => {
    chrome.storage.local.set({ language: 'english' });
});

frenchButton.addEventListener('click', () => {
    chrome.storage.local.set({ language: 'french' });
});