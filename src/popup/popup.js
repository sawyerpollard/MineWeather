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

const fahrenheitButton = document.querySelector('#fahrenheit');
const celsiusButton = document.querySelector('#celsius');

updateUnitButtons(fahrenheitButton, celsiusButton);

fahrenheitButton.addEventListener('click', () => {
    chrome.storage.local.set({ units: 'imperial' });
});

celsiusButton.addEventListener('click', () => {
    chrome.storage.local.set({ units: 'metric' });
});
