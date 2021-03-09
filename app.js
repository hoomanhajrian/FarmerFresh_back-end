const express = require("express");
const app = express();
const { cp } = require('./db/connection.js');
const promise_mysql = require('promise-mysql');



const farms = [
    {
        farmId: "1",
        farmName: "farm num 1",
        farmOwner: "Mr/Ms [Name]",
        farmLocation: { lat: 22.321512, lng: 52.42512 }
    }
    ,
    {
        farmId: "2",
        farmName: "farm num 2",
        farmOwner: "Mr/Ms [Name]",
        farmLocation: { lat: 12.321512, lng: 122.42512 }
    },
    {
        farmId: "3",
        farmName: "farm num 3",
        farmOwner: "Mr/Ms [Name]",
        farmLocation: { lat: 32.321512, lng: 72.42512 }
    },
    {
        farmId: "4",
        farmName: "farm num 4",
        farmOwner: "Mr/Ms [Name]",
        farmLocation: { lat: 31.32132512, lng: 102.4234512 }
    }]


const users = [{ userId: "1", userName: "Hooman", userFname: "HJ", email: "hh@gmail.com", password: "12345", active: true }]

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

let server = app.listen(8080, () => {
    console.log('Server is listening on port 8080')
});

app.get('/', (req, res) => {
    res.status(404).send("NO API EXIST HERE!")
});

app.get('/V1/info', (req, res) => {
    res.status(301).send("FarmerFresh API");
});


app.get('/V1/farms', (req, res) => {
    cp
        .then(pool => {
            pool.query(`SELECT * FROM farm;`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});

app.get('/V1/farms/:farmId', (req, res) => {
    cp
        .then(pool => {
            pool.query(`SELECT * FROM farm WHERE farm_id=${req.params.farmId}`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});


app.get('/V1/products', (req, res) => {
    cp
        .then(pool => {
            pool.query(`SELECT * FROM product`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});


app.get('/V1/products/:productId', (req, res) => {
    cp
        .then(pool => {
            pool.query(`SELECT * FROM product WHERE product_id=${req.params.productId}`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});

// http://localhost:8080/api/V1/user?email=abc@abc.com&pass=1235
app.get('/V1/user', (req, res) => {
    res.send(req.query);
    let email = req.query.email;
    let pass = req.query.pass;
    console.log("email:" + email + " pass:" + pass)
});


// app.post('/api/V1/user', (req, res) => {

// });

app.get('/*', () => {
    res.status(404).send("page does not exist!");
});