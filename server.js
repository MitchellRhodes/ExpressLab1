const express = require('express');

const app = express();

const port = 8888;

const cartItems = require('./cart-items');

app.use('/', cartItems);



app.listen(port, () =>
    console.log(`server is running on ${port}`));