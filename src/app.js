const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const forcast = require("./methods/forCast.js");
const mapBox = require("./methods/mapBox.js");
const viewsDirectory = path.join(__dirname, "../temp/views");
const partialsDirectory = path.join(__dirname, "../temp/partials");
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);
app.use(express.static(path.join(__dirname, "../public")));

///////////////////////////////////////////////

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "plz enter the address name" });
    }
    mapBox(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forcast(data.latitude, data.longitude, (error, re, location) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                latitude: data.latitude,
                longitude: data.longitude,
                "weather info": re,
            })
        })
    })
})

app.get("/", (req, res) => {
    res.render("index", {
        title: "HOME",
        describe: "This page used for get weather conditions."
    })
})

///////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Browser listening to port : " + port)
})