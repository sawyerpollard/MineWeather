import getStorageItem from './storageUtils';

export type Unit = 'metric' | 'imperial';

export interface WeatherResponse {
    current: {
        temp: number,
        dew_point: number,
        weather: { 
            main: string,
            description: string,
        }[],
        dt: number,
        sunrise: number,
        sunset: number,
    },
}

export interface WeatherObject {
    weather: WeatherResponse,
    units: Unit,
    lang: string,
    lastUpdated: number,
}

export async function getCurrentWeather(latitude: number, longitude: number, units: Unit, lang: string, apiKey: string): Promise<WeatherResponse> {
    const base = 'https://api.openweathermap.org';
    const endpoint= new URL(`/data/2.5/onecall?lang=${lang}&lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`, base);

    console.log('Weather API called.');
    const response = await fetch(endpoint.toString());
    return response.json();
}

function expired(lastUpdated: number, TTL: number): boolean {
    return (Date.now() - lastUpdated) / 60000 > TTL;
}

export async function getCachedWeather(latitude: number, longitude: number, units: Unit, lang: string, TTL: number, apiKey: string): Promise<WeatherObject> {
    const cachedWeatherObject = await getStorageItem('weatherObject') as WeatherObject;

    if (cachedWeatherObject !== undefined) {
        const { lastUpdated } = cachedWeatherObject;
        const cachedUnits = cachedWeatherObject.units;
        const cachedLang = cachedWeatherObject.lang;

        if (!expired(lastUpdated, TTL) && cachedUnits === units && cachedLang === lang) {
            console.log('Weather cache hit.\n');
            return cachedWeatherObject;
        }
    }

    const currentWeather = await getCurrentWeather(latitude, longitude, units, lang, apiKey);

    const weatherObject: WeatherObject = {
        weather: currentWeather,
        units,
        lang,
        lastUpdated: Date.now(),
    };

    chrome.storage.local.set({ weatherObject });
    console.log('Weather cache renewed.\n');
    return weatherObject;
}

export function getTemperature(weather: WeatherResponse): number {
    return weather.current.temp;
}

export function getDewPoint(weather: WeatherResponse): number {
    return weather.current.dew_point;
}

export function isSnowing(weather: WeatherResponse): boolean {
    const conditions = weather.current.weather.map((condition) => condition.main);
    return conditions.includes('Snow');
}

export function isRaining(weather: WeatherResponse): boolean {
    const conditions = weather.current.weather.map((condition) => condition.main);
    return conditions.includes('Rain');
}
