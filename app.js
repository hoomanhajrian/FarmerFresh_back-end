const express = require("express");
const app = express();
const { cp } = require('./db/connection.js');


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

// http://localhost:8080/V1/user/auth?name=hoomanhaj&email=hooman&pass=1234
app.get('/V1/user/auth/reg', (req, res) => {
    let name = req.query.name;
    let email = req.query.email;
    let pass = req.query.pass;
    console.log("email:" + email + " pass:" + pass + name);
    res.send(req.query);
    cp
        .then(pool => {
            pool.query(`INSERT INTO user (user_name, user_email, user_password) VALUES ("${name}", ${email}, ${pass});`)
                .then(result => {
                    console.log("successfully registerd!")
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));

});

app.get('/V1/user/auth/approval', (req, res) => {
    let email = req.query.email;
    let pass = req.query.pass;
    console.log("email:" + email + " pass:" + pass)
    res.send(req.query);
    // cp
    //     .then(pool => {
    //         pool.query(`SELECT * FROM product WHERE product_id=${req.params.productId}`)
    //             .then(result => {
    //                 res.send(result);
    //             })
    //             .catch(error => res.status(500).send(error));
    //     })
    //     .catch(error => res.status(500).send(error));

});

// app.post('/api/V1/user', (req, res) => {

// });

app.get('/*', (req, res) => {
    res.status(404).send("Error404! page does not exist!");
});