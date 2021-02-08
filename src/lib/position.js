import getStorageItem from './storageUtils.js';

function getPosition(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

function expired(lastUpdated, TTL) {
    return (Date.now() - lastUpdated) / 60000 > TTL;
}

async function cachePosition() {
    console.log('Retrieving position ...');
    const { coords } = await getPosition();
    console.log('Retrieved position.');

    const position = {
        coords: {
            latitude: coords.latitude,
            longitude: coords.longitude,
        },
        lastUpdated: Date.now(),
    };

    chrome.storage.local.set({ position });
    console.log('Position cached.\n');
    return position;
}

async function getCachedPosition(TTL) {
    const cachedPosition = (await getStorageItem('position')).position;

    if (cachedPosition === undefined) {
        console.log('Initializing position cache ...');
        const position = await cachePosition();
        return position;
    }

    const { lastUpdated } = cachedPosition;

    if (expired(lastUpdated, TTL)) {
        console.log('Renewing position cache.');
        cachePosition();
    }

    console.log('Position cache hit.\n');
    return cachedPosition;
}

export { getPosition, cachePosition, getCachedPosition };
