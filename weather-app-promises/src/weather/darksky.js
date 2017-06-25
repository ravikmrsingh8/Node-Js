const request = require('request');

let getWeather = (lat, lng) => {
    "use strict";
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({current: body.currently});
            } else {
                reject("ERROR :Unable to fetch weather data");
            }
        });
    });
};

module.exports = {getWeather};