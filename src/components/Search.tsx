import { useState, type ChangeEvent } from "react";
import type { City } from "../types";

const Search = ({ onSelectItem }: { onSelectItem: (city: City) => void }) => {
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<City[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleClick = () => {
        fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
                import.meta.env.VITE_API_KEY
            }`
        )
            .then((r) => r.json())
            .then((cities: any) =>
                setSearchResults(
                    cities.map((city: any) => ({
                        name: city.name,
                        lat: city.lat,
                        lon: city.lon,
                        country: city.country,
                    }))
                )
            );
    };
    const onSelect = (city: City) => {
        onSelectItem(city);
        setSearchResults([]);
    };

    return (
        <div className="w-full">
            <div className="w-full mt-6 flex gap-x-4 mx-auto items-center">
                <input
                    type="text"
                    data-testid="search-input"
                    onChange={handleChange}
                    placeholder="Enter city name (e.g. Tambacounda, Senegal)"
                    className="flex-1 border-none shadow rounded-md bg-white px-4 py-1.5 text-base text-gray-600 focus:outline-none"
                />
                <button
                    data-testid="search-button"
                    onClick={handleClick}
                    className="flex-none border-none rounded-md px-4 py-1.5 text-base text-white  bg-blue-600"
                >
                    Search
                </button>
            </div>
            {searchResults.length > 0 && (
                <div data-testid="search-results" className="my-4 ">
                    {searchResults.map((city) => (
                        <div
                            key={`${city.lat}-${city.lon}`}
                            onClick={() => onSelect(city)}
                            className="flex gap-4 items-center justify-between py-1.5 cursor-pointer text-[0.875rem] hover:bg-gray-200 rounded"
                        >
                            {" "}
                            <span>{city.name}</span> <span>{city.country}</span>
                            <span className="ml-auto text-slate-400">
                                {city.lat} {city.lon}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { Search };
