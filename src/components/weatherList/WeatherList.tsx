import React, {useState, useEffect, createContext, useContext} from 'react';
import {convertToFahrenheit, getDateAdjustedForTimezone, PageProps} from "../../utils";

export const FetchContext = createContext(fetch)

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export type ForecastResponseItem = {
    dt: number,
    main: {
        temp: number
    },
    weather: [{ main: string }]
}

export type Forecast = {
    dayOfWeek: string,
    hours: number,
    temp: number,
    condition: string,
}

export const WeatherList = ({location, apiKey}: PageProps) => {
    const [forecasts, setForecasts] = useState([]);
    const injectedFetch = useContext(FetchContext)

    useEffect(() => {
        populateForecasts()
    }, [location])

    const populateForecasts = async () => {
        const result = await injectedFetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`,
            {
                method: 'GET',
            }).then((result: { json: () => any; }) => {
            return result.json()
        })
        const timezoneOffset = result.city.timezone;
        const forecastList = result.list.map((item: ForecastResponseItem) => {
                const dateTime = getDateAdjustedForTimezone(item.dt, timezoneOffset);
                return {
                    dayOfWeek: daysOfTheWeek[dateTime.getDay()],
                    hours: dateTime.getHours(),
                    temp: convertToFahrenheit(item.main.temp),
                    condition: item.weather[0].main
                }
            }
        ).filter((forecast: Forecast) => {
            return forecast.hours === 7 || forecast.hours === 19
        })
        setForecasts(forecastList)
    };

    return (
        <div>
            <h4>Forecast:</h4>
            <table>
                <tbody>
                {forecasts.map((forecast: Forecast, i) => (
                    <tr key={`forecast-${i}`}>
                        <td>{forecast.dayOfWeek}</td>
                        <td>{forecast.hours <= 12 ? "AM" : "PM"}</td>
                        <td>{forecast.temp}&#xb0;</td>
                        <td>{forecast.condition}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
