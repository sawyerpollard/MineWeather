import { Theme, WeatherImage } from './theme';
import { Condition } from './condition';
import { Time } from './time';

export function getWeatherImage(theme: Theme, condition: Condition, time: Time): WeatherImage {
    return theme.conditions[condition][time][0];
}
