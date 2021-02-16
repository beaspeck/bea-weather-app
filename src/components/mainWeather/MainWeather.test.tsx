import React from 'react'
import {act, render, screen} from '@testing-library/react'
import { MainWeather, FetchContext } from "./MainWeather"

const response = {
    weather: [
        {
            main: 'Clouds',
        }
    ],
    main: {
        temp: 272.76,
        feels_like: 267.24,
    },
    wind: { speed: 3.6, deg: 150 },
    name: 'Seattle',
}

describe("MainWeather", () => {

    const fetchDouble = () => Promise.resolve({
        json: () => Promise.resolve(response)
    })

    test("Queries open weather endpoint on component load and populates data", async () => {
        await act(async () => {
            render(<FetchContext.Provider value={fetchDouble}>
                <MainWeather location={"Seattle"} apiKey={"key"}/>
            </FetchContext.Provider>)
        })
        expect(screen.getByText("Seattle")).toBeInTheDocument()
        expect(screen.getByText("31°")).toBeInTheDocument()
        expect(screen.getByTestId("current-wind").textContent).toBe("150° / 3.6mph")
        expect(screen.getByTestId("feels-like").textContent).toBe("21°")
    });

});
