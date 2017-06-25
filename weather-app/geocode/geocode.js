const request = require('request');

var geoCodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to google server', null);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address ' + address, null);
        } else if (body.status === 'OK') {
            var result = {address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            };
            callback(null, result);
        }
    });
};

module.exports = {
    geoCodeAddress: geoCodeAddress
}
