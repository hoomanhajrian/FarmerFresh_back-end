const express = require("express");
const app = express();


app.listen(8080, () => {
    console.log("listening to port:")
});

app.get('/api/', (req, res) => {
    res.status(301).send("FarmerFresh API");
});

app.get('/api/1/farms/:farmName', (req, res) => {
    console.log(req.params);
    res.status(301).send("List of Farms");
});

app.get('/api/1/farms/farm', (req, res) => {

});


app.get('/*', () => {
    res.status(404).send("page does not exist!");
});