export default class Condition {
    static get(temperature, dewPoint, isSnowing, isRaining) {
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

        return null;
    }

    static get SNOWING() {
        return 'snowing';
    }

    static get RAINING() {
        return 'raining';
    }

    static get COLD() {
        return 'cold';
    }

    static get CHILLY() {
        return 'chilly';
    }

    static get HUMID() {
        return 'humid';
    }

    static get MEDITERRANEAN() {
        return 'mediterranean';
    }

    static get DESERT() {
        return 'desert';
    }

    static get TROPICAL() {
        return 'tropical';
    }
}
