import * as Weather from '../lib/weather';
import { Unit } from './weather';

export enum Condition {
    SNOWING,
    RAINING,
    COLD,
    CHILLY,
    HUMID,
    MEDITERRANEAN,
    DESERT,
    TROPICAL,
    UNKNOWN
}

export function getCondition(temperature: number, dewPoint: number, isSnowing: boolean, isRaining: boolean, unit: Unit): Condition {
    if (unit === 'metric') {
        temperature = Weather.celsiusToFahrenheit(temperature);
        dewPoint = Weather.celsiusToFahrenheit(dewPoint);
    }

    if (isSnowing) return Condition.SNOWING;

    if (isRaining) return Condition.RAINING;

    if (temperature < 40) return Condition.COLD;

    if (temperature < 55) return Condition.CHILLY;

    if (dewPoint < 60) {
        if (temperature < 85) return Condition.MEDITERRANEAN;
        return Condition.DESERT;
    }

    if (dewPoint >= 60) {
        if (temperature < 85) return Condition.HUMID;
        return Condition.TROPICAL;
    }

    return Condition.UNKNOWN;
}
