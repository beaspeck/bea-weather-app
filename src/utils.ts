export const convertToFahrenheit = (kelvin?: number) => {
    if (!kelvin) return;
    return Math.round(((kelvin-273.15) * 1.8) + 32);
}

export const getDateAdjustedForTimezone = (utcSeconds: number, shiftInSecondsFromUTC: number) => {
    const date = new Date(0);
    date.setUTCSeconds(utcSeconds + shiftInSecondsFromUTC + (date.getTimezoneOffset()*60));
    return date
}

export interface PageProps {
    location: string;
    apiKey?: string;
}
