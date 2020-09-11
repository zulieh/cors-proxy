const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiKey = '778d14d35550cecd2866a95a1240bfa0';
const openWeatherMapURL = 'https://api.openweathermap.org/data/2.5/weather';

const app = express();

// set cors
app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/api/weather', async (req, res) => {
    const { cityName } = req.body;

    const url = `${openWeatherMapURL}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const data = await axios.get(url);
        return res.status(200).json({ data : data.data })
    } catch (error) {
        return res.status(500).json({ error: 'Unable to perform this action at this time. Try again later.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));