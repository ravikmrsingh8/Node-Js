const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./darksky/weatherinfo');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    }).help()
    .alias('help', 'h')
    .argv;

var geoCodeResults = null;
geocode.geoCodeAddress(argv.address, (errorMsg, results) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        console.log(JSON.stringify(results, undefined, 4));
        geoCodeResults = {
            latitude: results.latitude,
            longitude: results.longitude,
            address: results.address
        };
        weather.weatherInfo(geoCodeResults.latitude, geoCodeResults.longitude, (result, err) => {
            "use strict";
            console.log(JSON.stringify(result, undefined,4));
        });
    }
});



