const request = require('request');

const geoCode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGFwaXBvcnJhIiwiYSI6ImNrbGlyZHNlNjFnMmsycG9pYmJ6NTFjNzcifQ.n006INtQvTLNwCfz2OYyzQ&limit=3&autocomplete=true`

    request({
        url,
        json: true
    }, (error, { body }) => {
        
        if(error) {
           cb('Unable to fetch server');
        } else if(body.features.length === 0) {
            cb('Location not Found')
        } else {
            const [data] = body.features;
            const placeName = data.place_name;
            const [longitude, latitude] = data.center;
            cb(null, {placeName, latitude, longitude})
        }

    });
}

module.exports = geoCode