const request = require('request');

var getGeoCodeAddress = (address) => {
    "use strict";
    address = encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (body.status === "ZERO_RESULTS") {
                reject("Unable to find address");
            } else if (body.status === 'OK') {
                var data = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                };
                resolve(data);
            }
        });
    });
};

module.exports.getGeoCodeAddress = getGeoCodeAddress;