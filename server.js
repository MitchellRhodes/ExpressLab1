const express = require('express');
const cors = require('cors');
const app = express();

const port = 8888;

const cartItems = require('./cart-items');

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use('/', cartItems);



app.listen(port, () =>
    console.log(`server is running on ${port}`));