import { Unit } from '../lib/weather';

import getStorageItem from '../lib/storageUtils';

import './popup.css';

async function updateUnitButtons(fahrenheitButton: HTMLInputElement, celsiusButton: HTMLInputElement) {
    const unit = await getStorageItem('unit') as Unit;

    switch (unit) {
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

const popupLabel = document.querySelector('#popup-label') as HTMLHeadingElement;
popupLabel.textContent = chrome.i18n.getMessage('popupLabel');

const unitSelectorLabel = document.querySelector('#unit-selector-label') as HTMLHeadingElement;
unitSelectorLabel.textContent = chrome.i18n.getMessage('unitSelectorLabel');

const fahrenheitSelectorLabel = document.querySelector('#fahrenheit-selector-label') as HTMLLabelElement;
fahrenheitSelectorLabel.textContent = chrome.i18n.getMessage('fahrenheitSelectorLabel');

const celsiusSelectorLabel = document.querySelector('#celsius-selector-label') as HTMLLabelElement;
celsiusSelectorLabel.textContent = chrome.i18n.getMessage('celsiusSelectorLabel');

const fahrenheitButton = document.querySelector('#fahrenheit') as HTMLInputElement;
const celsiusButton = document.querySelector('#celsius') as HTMLInputElement;

updateUnitButtons(fahrenheitButton, celsiusButton);

fahrenheitButton.addEventListener('click', () => {
    chrome.storage.local.set({ unit: 'imperial' });
});

celsiusButton.addEventListener('click', () => {
    chrome.storage.local.set({ unit: 'metric' });
});
