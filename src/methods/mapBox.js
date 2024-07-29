const request = require("request");
// const callBack = require("./callBack.js");
// const forCast = require("./forCast.js")
function mapBox(countryName, callBack) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + countryName + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw";
    request({ url, json: true }, (error, response) => {
        if (error) {
            callBack("this is an low-level error", undefined);
        } else if (response.body.message) {
            callBack(response.body.message, undefined);
        }
        else if (response.body.features.length == 0) {
            callBack("Unable to find countery", undefined);
        } else {
            callBack(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
            });
        }
    })
}
module.exports = mapBox;