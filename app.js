const express = require("express");
const app = express();
const { cp } = require('./db/connection.js');
const mysql = require('promise-mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
            pool.query(`SELECT * FROM product WHERE product_id IN ${req.params.productId}`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});

app.get('/V1/getfarmproducts?farmid=:farmId', (req, res) => {
    cp
        .then(pool => {
            pool.query(`select * from farmerfresh.product where farmerfresh.product.product_id in (select product_product_id from farmerfresh.farm_has_product where farmerfresh.farm_has_product.farm_farm_id = ${req.params.farmId});`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});
// https://farmerfresh.ca/api/V1/addtocart?user_id=1&farm_name=apple%20farm&product_name=apples&product_image=http:something&product_family_name=%22%22&product_price=%22%22&product_description=%22%22&quantity=%22%22
app.get('/V1/addtocart', (req, res) => {

    let userId = req.query.user_id;
    let farmName = req.query.farm_name;
    let pName = req.query.product_name;
    let pImg = req.query.product_image;
    let pFName = req.query.product_family_name;
    let pPrice = req.query.product_price;
    let pDescription = req.query.product_description;
    let quantity = req.query.quantity;

    cp
        .then(pool => {

            pool.query(`INSERT INTO cart (user_id, farm_name, product_name, product_img, product_Fname, product_price, product_description, quantity) VALUES (${mysql.escape(userId)}, ${mysql.escape(farmName)}, ${mysql.escape(pName)}, ${mysql.escape(pImg)}, ${mysql.escape(pFName)}, ${mysql.escape(pPrice)}, ${mysql.escape(pDescription)}, ${mysql.escape(quantity)});`)

                .then(res.status(200).send({ "status": "200", "message": "Added Successfully", "User_ID": userId, "Farm_Name": farmName, "Product_Name": pName, "Product_Image": pImg, "Product_Family_Name": pFName, "Product_Price": pPrice, "Product_Description": pDescription, "Quantity": quantity }))

                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});


app.get('/V1/showcart', (req, res) => {
    cp
        .then(pool => {
            pool.query(`SELECT * from cart`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});



app.get('/V1/showcart?userid=:userId', (req, res) => {
    cp
        .then(pool => {
            pool.query(`SELECT * from cart WHERE user_id = ${req.params.userId}`)
                .then(result => {
                    res.send(result);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
});


app.get('/V1/user/auth/reg', (req, res) => {
    let name = req.query.name;
    let email = req.query.email;
    let pass = req.query.pass;

    cp
        .then(pool => {
            pool.query(`INSERT INTO user (user_name, user_email, user_password) VALUES (${mysql.escape(name)}, ${mysql.escape(email)}, ${mysql.escape(pass)});`)
                .then(res.status(200).send("registered!"))
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));

});

app.get('/V1/user/auth/approval', (req, res) => {
    let email = req.query.email;
    let pass = req.query.pass;
    cp
        .then(pool => {
            pool.query(`SELECT * FROM user WHERE user_email="${email}" AND user_password="${pass}"`)
                .then(result => {
                    res.status(200).send(result[0].user_email);
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));

});

app.get('/*', (req, res) => {
    res.status(404).send("Error404! page does not exist!");
});
