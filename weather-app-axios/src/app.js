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
    var apiKey = process.env.OPEN_WEATHER_KEY;

    //var weatherInfoUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    var weatherInfoUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${apiKey}`;
    console.log(address);
    return axios.get(weatherInfoUrl);

}).then((response) => {
    console.log('Weather:' + JSON.stringify(response.data.weather, undefined, 4));
    var temp = response.data.main.temp - 273.15;

    var sunrise = new Date(response.data.sys.sunrise * 1000).toTimeString();
    var sunset = new Date(response.data.sys.sunset * 1000).toTimeString();

    console.log("Temperature :",temp,"*C");
    console.log("Sun Rise :",sunrise);
    console.log("Sun Set :",sunset);

}).catch((error) =>{
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API Servers');
    } else {
        console.log(error.message);
    }
});