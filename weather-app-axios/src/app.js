const axios = require('axios');
const yargs = require('yargs');


const argv = yargs.options({
    address: {
        demand: true,
        alias: 'a',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

var geoCodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

axios.get(geoCodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address')
    }
    var address  = response.data.results[0].formatted_address;
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var apiKey = process.env.WEATHER_API_KEY;
    var weatherInfoUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    console.log(address);
    return axios.get(weatherInfoUrl);

}).then((response) => {
    console.log(response.data.currently);
    var temp = response.data.currently.apparentTemperature;
    var tempInCelsius = ((temp - 32)*5)/9;
    console.log("Temperature :",tempInCelsius,"Degree celsius");

}).catch((error) =>{
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API Servers');
    } else {
        console.log(error.message);
    }
});