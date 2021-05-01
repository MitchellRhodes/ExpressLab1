const express = require('express');

const cartItems = express.Router();

cartItems.use(express.json());


const items = [
    {
        id: 10,
        product: 'milk',
        price: 2.99,
        quantity: 1
    },

    {
        id: 1025,
        product: 'resident evil 8',
        price: 59.99,
        quantity: 1
    },

    {
        id: 451,
        product: '4k proscan Tv',
        price: 299.99,
        quantity: 1
    },

    {
        id: 452,
        product: '4k samsung Tv',
        price: 399.99,
        quantity: 1
    },
    {
        id: 453,
        product: '4k sony Tv',
        price: 599.99,
        quantity: 1
    },
    {
        id: 454,
        product: '4k LG Tv',
        price: 399.99,
        quantity: 1
    },
]


cartItems.get('/cart-items', (req, res) => {
    for (const key in req.query) {
        // console.log(key, req.query[key]); //key is maxPrice, req.query[key] is 60

        if (key === 'maxPrice') {

            res.status(200).json(items.filter(item => item.price <= req.query[key]));

        } else if (key === 'prefix') {
            res.status(200).json(items.filter(item => item.product.includes(req.query[key])));

        } else if (key === 'pageSize') {

            res.status(200).json(items.slice(0, req.query[key]));

        }
    };

    res.status(200).json(items);
});


cartItems.get('/cart-items/:id', (req, res) => {

    const item = items.find(item => item.id === +req.params.id);

    if (!item) {
        res.status(404).send('ID not found')
    };


    res.status(200).json(
        items.find(item => item.id === +req.params.id)
    );
});



cartItems.post('/cart-items', (req, res) => {
    if (!req.body.product) {

        res.status(400).send('Product name required');

    } else if (!req.body.price) {

        res.status(400).send('Product price required');

    } else if (!req.body.quantity) {

        res.status(400).send('Product quantity required');

    };

    const item = {
        id: items.length + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    items.push(item);
    res.status(201).send(item);
});


cartItems.put('/cart-items/:id', (req, res) => {
    //look up item
    const item = items.find(item => item.id === +req.params.id);

    //if it doesn't exist throw error
    if (!item) {
        res.status(404).send('ID not found')
    };

    if (!req.body.product) {

        res.status(400).send('Product name required');

    } else if (!req.body.price) {

        res.status(400).send('Product price required');

    } else if (!req.body.quantity) {

        res.status(400).send('Product quantity required');

    }

    item.product = req.body.product;
    item.price = req.body.price;
    item.quantity = req.body.quantity;

    res.status(200).send(item);

});


cartItems.delete('/cart-items/:id', (req, res) => {

    const item = items.find(item => item.id === +req.params.id)

    if (!item) {
        res.status(404).send('ID not found')
    };

    const index = items.indexOf(item);
    items.splice(index, 1);

    res.status(204).send(item);
});


module.exports = cartItems;