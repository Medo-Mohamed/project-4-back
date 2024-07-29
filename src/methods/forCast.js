const request = require("request");
// const callBack = require("./callBack.js");
function forCast(latitude, longtitude, callBack) {
    const url = "http://api.weatherapi.com/v1/current.json?key=13b591fc046a4e3f817150930241707&q=" + longtitude + ',' + latitude;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callBack(error, undefined);
        } else if (response.body.error) {
            callBack(response.body.error.message, undefined);
        } else {
            callBack(undefined, response.body.location.name + " it is " + response.body.current.condition.text + " temp is " + response.body.current.temp_c);
        }
    })
}
module.exports = forCast;