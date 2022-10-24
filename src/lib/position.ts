import getStorageItem from './storageUtils';

interface Position {
    coords: {
        latitude: number,
        longitude: number
    },
    timestamp: number
}

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

function expired(lastUpdated: number, TTL: number): boolean {
    return (Date.now() / 1000 - lastUpdated) / 60 > TTL;
}

async function cachePosition(): Promise<Position> {
    console.log('Retrieving position ...');
    const { coords } = await getPosition();
    console.log('Retrieved position.');

    const position: Position = {
        coords: {
            latitude: coords.latitude,
            longitude: coords.longitude,
        },
        timestamp: Date.now() / 1000,
    };

    chrome.storage.local.set({ position });
    console.log('Position cached.\n');
    return position;
}

async function getCachedPosition(TTL: number): Promise<Position> {
    const cachedPosition = await getStorageItem('position') as Position;

    if (cachedPosition === undefined) {
        console.log('Initializing position cache ...');
        const position = await cachePosition();
        return position;
    }

    const { timestamp } = cachedPosition;

    if (expired(timestamp, TTL)) {
        console.log('Renewing position cache.');
        cachePosition();
    }

    console.log('Position cache hit.\n');
    return cachedPosition;
}

export { getPosition, cachePosition, getCachedPosition, Position };
