const yargs = require('yargs');
const weather = require('./weather/darksky');
const geocode = require('./geocode/geocode');
const argv = yargs
    .options({
        'address': {
            alias: 'a',
            demandOption: true,
            describe: 'Address to fetch weather for',
            type: 'string'
        }
    })
    .alias('help', 'h')
    .help()
    .argv;

//console.log(argv);

geocode.getGeoCodeAddress(argv.address).then((data) => {
    "use strict";
    console.log("Location Data: " + JSON.stringify(data, undefined, 4));
    return weather.getWeather(data.latitude, data.longitude);
}).then((data) => {
    "use strict";
    console.log("Weather data " + JSON.stringify(data, undefined, 4));
}).catch((reason) => {
    "use strict";
    console.log(reason)
});