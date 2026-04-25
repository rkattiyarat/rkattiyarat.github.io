import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());

const api_key = process.env.WEATHER_API_KEY;

// Weather endpoint
app.get("/weather", async (req, res) => {
    try {
        const city = req.query.city;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
        );

        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/cities", async (req, res) => {
    try {
        const query = req.query.q;

        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});