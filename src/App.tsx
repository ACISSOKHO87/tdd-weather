import { useState } from "react";

import { Search } from "./components/Search";
import { type City } from "./types";
import { WeatherCard } from "./components/WeatherCard";

function App() {
    const [selected, setSelected] = useState<City[]>([]);

    const selectCity = (city: City) => {
        setSelected([city, ...selected]);
    };

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
            <h1 className="text-2xl font-bold">Weather Application</h1>
            <Search onSelectItem={selectCity} />

            <div
                data-testid="my-weather-list"
                className="w-full mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
                {selected.map((city) => (
                    <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
                ))}
            </div>
        </div>
    );
}

export default App;
