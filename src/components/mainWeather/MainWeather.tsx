import React, {useState, useEffect, createContext, useContext} from 'react';
import {convertToFahrenheit, PageProps} from "../../utils";

export const FetchContext = createContext(fetch)

export const MainWeather = ({location, apiKey}: PageProps) => {
    const [condition, setCondition] = useState<string>("")
    const [temp, setTemp] = useState<number>();
    const [feelsLike, setFeelsLikeTemp] = useState<number>();
    const [windDirection, setWindDirection] = useState<number>();
    const [windSpeed, setWindSpeed] = useState<number>();
    const injectedFetch = useContext(FetchContext)

    useEffect(() => {
        populateWeather()
    }, [])

    const populateWeather = async () => {
        const result = await injectedFetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,
            {
                method: 'GET',
            }).then((result: { json: () => any; }) => {
            return result.json()
        })
        setCondition(result.weather.main);
        setTemp(result.main.temp);
        setFeelsLikeTemp(result.main.feels_like);
        setWindDirection(result.wind.deg);
        setWindSpeed(result.wind.speed);
    };

    return (
        <div className="container">
            <h1>{location}</h1>
            <h2>{condition}</h2>
            <h3>{convertToFahrenheit(temp)}&#xb0;</h3>
            <table>
                <tbody>
                <tr>
                    <td>Feels Like</td>
                    <td data-testid="feels-like">{convertToFahrenheit(feelsLike)}&#xb0;</td>
                </tr>
                <tr>
                    <td>Wind</td>
                    <td data-testid="current-wind">{windDirection}&#xb0; / {windSpeed}mph</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
