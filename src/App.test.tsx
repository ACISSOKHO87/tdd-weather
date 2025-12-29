import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Server } from "miragejs";
import App from "./App";
import { createMockServer } from "./mocks/createMockServer";

describe("Weather App main", () => {
    let server: Server;
    beforeEach(() => {
        vi.resetAllMocks();
        server = createMockServer();
    });
    afterEach(() => {
        server.shutdown();
    });

    it("Should renders weather application title", () => {
        render(<App />);
        const title = screen.getByText(/Weather Application/i);
        expect(title).toBeInTheDocument();
    });

    it("should shows search results", async () => {
        render(<App />);

        const user = userEvent.setup();

        const input = screen.getByTestId("search-input");
        await user.type(input, "Melbourne");

        const button = screen.getByTestId("search-button");
        await user.click(button);

        await waitFor(() =>
            expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
        );
    });

    it("should shows search details", async () => {
        render(<App />);

        const user = userEvent.setup();

        const input = screen.getByTestId("search-input");
        await user.type(input, "Melbourne");

        const button = screen.getByTestId("search-button");
        await user.click(button);

        await waitFor(() =>
            expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
        );

        expect(
            screen.getByText(/-37.8142454 144.9631732/i)
        ).toBeInTheDocument();
    });

    it("should add result to my weather list", async () => {
        render(<App />);

        const user = userEvent.setup();

        const input = screen.getByTestId("search-input");
        await user.type(input, "Melbourne");

        const button = screen.getByTestId("search-button");
        await user.click(button);

        await waitFor(() =>
            expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
        );

        const selected = screen.getAllByText(/Melbourne/i)[3];
        await user.click(selected);
        expect(
            within(screen.getByTestId("my-weather-list")).getByText(
                /Melbourne/i
            )
        ).toBeInTheDocument();
        expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
    });
});
