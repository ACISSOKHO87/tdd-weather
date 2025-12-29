import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { WeatherCard } from "./WeatherCard";
import { createMockServer } from "../mocks/createMockServer";
import type { Server } from "miragejs";

describe("Weather Card component", () => {
    let server: Server;
    beforeEach(() => {
        vi.resetAllMocks();
        server = createMockServer();
    });
    afterEach(() => {
        server.shutdown();
    });

    it("should renders city name", () => {
        const city = {
            name: "Melbourne",
            lat: 41.9430186,
            lon: -93.1030319,
            country: "US",
            state: "Iowa",
        };
        render(<WeatherCard city={city} />);
        expect(screen.getByText(city.name)).toBeInTheDocument();
    });

    it("Sould renders placeholder when temperature is not available", async () => {
        const city = {
            name: "Melbourne",
            lat: 41.9430186,
            lon: -93.1030319,
            country: "US",
            state: "Iowa",
        };
        render(<WeatherCard city={city} />);
        expect(screen.getByText("-/-")).toBeInTheDocument();
    });

    it("Sould renders temperature", async () => {
        const city = {
            name: "Melbourne",
            lat: 41.9430186,
            lon: -93.1030319,
            country: "US",
            state: "Iowa",
        };
        render(<WeatherCard city={city} />);
        await screen.findByText("5°");
    });

    it("Sould renders temperature", async () => {
        const city = {
            name: "Melbourne",
            lat: 41.9430186,
            lon: -93.1030319,
            country: "US",
            state: "Iowa",
        };
        render(<WeatherCard city={city} />);
        await screen.findByText("clear");
    });
});
