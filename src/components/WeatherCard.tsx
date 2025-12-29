import { useEffect, useState } from "react";
import type { City } from "../types";
import { Weather } from "../Weather";

const defaultWeather = new Weather({
    main: { temp: 0 },
    weather: [{ main: "-/-" }],
});
export function WeatherCard({ city }: { city: City }) {
    const [weather, setWeather] = useState(defaultWeather);

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${
                city.name
            }&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        )
            .then((r) => r.json())
            .then((data) => setWeather(new Weather(data)));
    }, [city]);

    return (
        <div className="flex-1 min-w-32  my-2 border p-4 rounded-md shadow-[0_0_4px_-3px_rgba(0,0,0,0.3)] ">
            <h3 className="text-lg font-medium">{city.name}</h3>
            <div className="flex flex-col mt-2 gap-4 items-center">
                <p className="text-4xl italic">{weather.temperature}</p>
                <div className="flex flex-col items-center gap-1">
                    <span>{weather.main}</span>
                </div>
            </div>
        </div>
    );
}
