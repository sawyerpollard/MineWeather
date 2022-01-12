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

export function getCondition(temperature: number, dewPoint: number, isSnowing: boolean, isRaining: boolean, units: Unit): Condition {
    if (units === 'metric') {
        temperature = celsiusToImperial(temperature);
        dewPoint = celsiusToImperial(dewPoint);
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

function celsiusToImperial(c: number): number {
    const f = c * (9 / 5) + 32;
    return f;
}
