import { createServer } from "miragejs";
import searchResults from "../mocks/search-result.json";
import weather from "../mocks/weather.json";
const createMockServer = () => {
    return createServer({
        routes() {
            this.urlPrefix = "https://api.openweathermap.org";
            this.get("/geo/1.0/direct", () => searchResults);
            this.get("/data/2.5/weather", () => weather);
        },
    });
};

export { createMockServer };
