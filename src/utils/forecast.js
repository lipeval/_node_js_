const request = require('request');

const getWeather = (lat, long, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=b33958d42d670caaf4be66337665b342&query=${lat},${long}`
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            cb(`Error: ${error.code}`)
        } else if (body.error) {
            cb(`Error: ${body.error.info}`)
        } else {
            const data = body.current;
            console.log(data)
            cb(null, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees and it feels like ${data.feelslike} degrees, Observation time: ${data.observation_time}`)

        }

    });
}

module.exports = getWeather;