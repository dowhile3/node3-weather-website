const request = require("request")

const weather = (coordinates, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=fd5b0e0d2123158734707f00d4638660&query="
                       + coordinates + '&units=m'
    

    setTimeout(() => {
        request({ url: weatherURL, json: true}, (error, response) => {
            if(error) {
                callback("Connection to Weather service failed!", undefined)
            } else if (response.body.success === false) {
                callback("Place not found!", undefined)
            } else {
                callback(undefined, {
                    description: response.body.current.weather_descriptions[0],
                    temperature: response.body.current.temperature,
                    feelslike: response.body.current.feelslike
                })
            }
        })
    }, 200)
}

module.exports = weather