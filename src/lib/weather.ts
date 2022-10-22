import getStorageItem from './storageUtils';

export type Unit = 'metric' | 'imperial';
export interface WeatherData {
    temperature: number,
    dewPoint: number,
    weatherCode: number,
    sunrise: number,
    sunset: number,
    unit: Unit,
    timestamp: number,
}

export async function getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    const base = 'https://api.open-meteo.com';
    const endpoint= new URL(`/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,dewpoint_2m,weathercode&daily=sunrise,sunset&timezone=GMT&timeformat=unixtime`, base);

    console.log('Weather API called.');
    const response = await fetch(endpoint.toString());
    const weather = await response.json();

    const forecastTimes: number[] = weather['hourly']['time'] as number[];
    const currentTime = Date.now() / 1000;
    const forecastTimeDeltas = forecastTimes.map(t => Math.abs(t - currentTime));
    const currentIndex = forecastTimeDeltas.indexOf(Math.min(...forecastTimeDeltas));

    const weatherData: WeatherData = {
        temperature: weather['hourly']['temperature_2m'][currentIndex],
        dewPoint: weather['hourly']['dewpoint_2m'][currentIndex],
        weatherCode: weather['hourly']['weathercode'][currentIndex],
        sunrise: weather['daily']['sunrise'][0],
        sunset: weather['daily']['sunset'][0],
        unit: 'metric',
        timestamp: Date.now() / 1000,
    };
    
    return weatherData;
}

function expired(lastUpdated: number, TTL: number): boolean {
    return (Date.now() / 1000 - lastUpdated) / 60000 > TTL;
}

export async function getCachedWeather(latitude: number, longitude: number, TTL: number): Promise<WeatherData> {
    const cachedWeatherData = await getStorageItem('weatherData') as WeatherData;

    if (cachedWeatherData !== undefined) {
        const { timestamp } = cachedWeatherData;

        if (!expired(timestamp, TTL)) {
            console.log('Weather cache hit.\n');
            return cachedWeatherData;
        }
    }

    const weatherData = await getCurrentWeather(latitude, longitude);

    chrome.storage.local.set({ weatherData });
    console.log('Weather cache renewed.\n');
    return weatherData;
}

export function getTemperature(weather: WeatherData, unit: Unit): number {
    if (unit === 'imperial') {
        return celsiusToFahrenheit(weather.temperature);
    } else {
        return weather.temperature
    }
}

export function getDewPoint(weather: WeatherData, unit: Unit): number {
    if (unit === 'imperial') {
        return celsiusToFahrenheit(weather.dewPoint);
    } else {
        return weather.dewPoint
    }
}

export function isSnowing(weather: WeatherData): boolean {
    const snowingCodes = [71, 73, 75, 77, 85, 86];
    return snowingCodes.includes(weather.weatherCode);
}

export function isRaining(weather: WeatherData): boolean {
    const rainingCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
    return rainingCodes.includes(weather.weatherCode);
}

export function celsiusToFahrenheit(c: number): number {
    const f = c * (9 / 5) + 32;
    return f;
}

export function weatherCodeString(weatherCode: number): string {
    const weatherCodeStrings: Record<number, string> = {
        0: 'clear sky',

        1: 'mostly clear',
        2: 'partly cloudy',
        3: 'cloudy',

        45: 'fog',
        48: 'fog',

        51: 'drizzle',
        53: 'drizzle',
        55: 'drizzle',

        56: 'freezing drizzle',
        57: 'freezing drizzle',

        61: 'light rain',
        63: 'rain',
        65: 'heavy rain',

        66: 'freezing rain',
        67: 'freezing rain',

        71: 'light snow',
        73: 'snow',
        75: 'heavy snow',

        77: 'snow',

        80: 'light rain',
        81: 'rain',
        82: 'heavy rain',

        85: 'light snow',
        86: 'heavy snow',

        95: 'thunderstorm',

        96: 'thunderstorm',
        99: 'thunderstorm',
    };

    return weatherCodeStrings[weatherCode];
}
