/* eslint-disable no-param-reassign */

function getStorageItem(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve);
    });
}

async function updateUnitButtons(fahrenheitButton, celsiusButton) {
    const { units } = await getStorageItem('units');

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
}

document.querySelector('#popup-label').textContent = chrome.i18n.getMessage('popupLabel');
document.querySelector('#unit-selector-label').textContent = chrome.i18n.getMessage('unitSelectorLabel');
document.querySelector('#fahrenheit-selector-label').textContent = chrome.i18n.getMessage('fahrenheitSelectorLabel');
document.querySelector('#celsius-selector-label').textContent = chrome.i18n.getMessage('celsiusSelectorLabel');

const fahrenheitButton = document.querySelector('#fahrenheit');
const celsiusButton = document.querySelector('#celsius');

updateUnitButtons(fahrenheitButton, celsiusButton);

fahrenheitButton.addEventListener('click', () => {
    chrome.storage.local.set({ units: 'imperial' });
});

celsiusButton.addEventListener('click', () => {
    chrome.storage.local.set({ units: 'metric' });
});
