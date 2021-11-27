const request = require('postman-request');

const forcast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=3647087e5190290b3ee77873bf3e0c70&query=${ latitude },${longitude}&units=f`;

    request({ url, json: true }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to forcast ', undefined);
            return;
        }

        if (body.error) {
            callback('Code: ' + body.error.code + ' Message: ' + body.error.info, undefined);
            return;
        }

        callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature +
            '. It feels like ' + body.current.feelslike + ' outside. ');

    });
}

module.exports = forcast;