const request = require('request');

var weatherInfo = (lat,lng,callback) => {
    "use strict";
    var apiKey = process.env.WEATHER_API_KEY;
    //console.log(`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`);
    request({
        url:`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json:true
    },(error, response, body) => {
        "use strict";
        if(!error && response.statusCode === 200) {
            callback({
                timezone: body.timezone,
                currentWeather: body.currently
            }, null);
        } else {
            callback(null, 'Unable to fetch weather from forecast.io');
        }
    });
};

module.exports = {
    weatherInfo
}

//63a1b1ca914ab68a771f8e939b92e2a1
