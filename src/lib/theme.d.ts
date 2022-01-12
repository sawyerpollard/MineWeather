import { Condition } from './condition';
import { Time } from './time';

export interface WeatherImage {
    name: string,
    caption: string,
    attribution: {
        author: string,
        link: string,
    },
    filePath: string,
}

export interface TimeImages {
    [Time.DAY]: WeatherImage[],
    [Time.TWILIGHT]: WeatherImage[],
    [Time.NIGHT]: WeatherImage[],
}

export interface ConditionImages {
    [Condition.SNOWING]: TimeImages,
    [Condition.RAINING]: TimeImages,
    [Condition.COLD]: TimeImages,
    [Condition.CHILLY]: TimeImages,
    [Condition.HUMID]: TimeImages,
    [Condition.MEDITERRANEAN]: TimeImages,
    [Condition.DESERT]: TimeImages,
    [Condition.TROPICAL]: TimeImages,
    [Condition.UNKNOWN]: TimeImages,
}

export interface Theme {
    name: string,
    basePath: string,
    conditions: ConditionImages,    
}
