export enum Time {
    DAY,
    TWILIGHT,
    NIGHT
}

export function getTime(currentTime: number, sunriseTime: number, sunsetTime: number): Time {
    const minutesFromSunrise = Math.abs((currentTime - sunriseTime) / 60);
    const minutesFromSunset = Math.abs(currentTime - sunsetTime) / 60;

    if (minutesFromSunset < 30 || minutesFromSunrise < 30) return Time.TWILIGHT;

    if (currentTime > sunsetTime || currentTime < sunriseTime) return Time.NIGHT;

    return Time.DAY;
}
