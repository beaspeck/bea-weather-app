import React from 'react'
import {act, render, screen} from '@testing-library/react'
import {WeatherList, FetchContext} from "./WeatherList"

const seattleResponse = {
    "list": [
        {
            "dt": 1613185200,
            "main": {
                "temp": 271.3,
            },
            "weather": [{"main": "Clouds"}],
            "dt_txt": "2021-02-13 03:00:00"
        },
        {
            "dt": 1613196000,
            "main": {
                "temp": 270.02,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-13 06:00:00"
        },
        {
            "dt": 1613206800,
            "main": {
                "temp": 268.63,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-13 09:00:00"
        },
        {
            "dt": 1613217600,
            "main": {
                "temp": 268.09,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-13 12:00:00"
        },
        {
            "dt": 1613228400,
            "main": {
                "temp": 268.37,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-13 15:00:00"
        },
        {
            "dt": 1613239200,
            "main": {
                "temp": 269.66,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-13 18:00:00"
        },
        {
            "dt": 1613250000,
            "main": {
                "temp": 271.52,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-13 21:00:00"
        },
        {
            "dt": 1613260800,
            "main": {
                "temp": 272.75,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-14 00:00:00"
        },
        {
            "dt": 1613271600,
            "main": {
                "temp": 270.8,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-14 03:00:00"
        },
        {
            "dt": 1613282400,
            "main": {
                "temp": 267.86,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-14 06:00:00"
        },
        {
            "dt": 1613293200,
            "main": {
                "temp": 266.77,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-14 09:00:00"
        },
        {
            "dt": 1613304000,
            "main": {
                "temp": 267.12,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-14 12:00:00"
        },
        {
            "dt": 1613314800,
            "main": {
                "temp": 267.54,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-14 15:00:00"
        },
        {
            "dt": 1613325600,
            "main": {
                "temp": 271.87,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-14 18:00:00"
        },
        {
            "dt": 1613336400,
            "main": {
                "temp": 273.38,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-14 21:00:00"
        },
        {
            "dt": 1613347200,
            "main": {
                "temp": 273.58,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-15 00:00:00"
        },
        {
            "dt": 1613358000,
            "main": {
                "temp": 273.35,
            },
            "weather": [
                {
                    "main": "Snow"
                }
            ],
            "dt_txt": "2021-02-15 03:00:00"
        },
        {
            "dt": 1613368800,
            "main": {
                "temp": 272.91,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-15 06:00:00"
        },
        {
            "dt": 1613379600,
            "main": {
                "temp": 272.2,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-15 09:00:00"
        },
        {
            "dt": 1613390400,
            "main": {
                "temp": 272.24,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-15 12:00:00"
        },
        {
            "dt": 1613401200,
            "main": {
                "temp": 272.16,
            },
            "weather": [
                {
                    "main": "Clouds"
                }
            ],
            "dt_txt": "2021-02-15 15:00:00"
        },
    ],
    "city": {
        "name": "Seattle",
        "timezone": -28800
    }
}

describe("WeatherList", () => {

    const fetchDouble = () => Promise.resolve({
        json: () => Promise.resolve(seattleResponse)
    })

    test("Queries open weather endpoint on component load and populates data", async () => {
        await act(async () => {
            render(<FetchContext.Provider value={fetchDouble}>
                <WeatherList location={"Seattle"} apiKey={"key"}/>
            </FetchContext.Provider>)
        })

        const rows = screen.getAllByRole('row')
        expect(rows.length).toEqual(6)
        expect(rows[0].textContent).toEqual("FridayPM29°Clouds")
        expect(rows[1].textContent).toEqual("SaturdayAM23°Snow")
        expect(rows[2].textContent).toEqual("SaturdayPM28°Clouds")
        expect(rows[3].textContent).toEqual("SundayAM22°Clouds")
        expect(rows[4].textContent).toEqual("SundayPM32°Snow")
        expect(rows[5].textContent).toEqual("MondayAM30°Clouds")
    });
});
