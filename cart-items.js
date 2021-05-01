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
        product: '4k Tv',
        price: 299.99,
        quantity: 1
    },
]


cartItems.get('/cart-items', (req, res) => {
    res.status(200).json(items);
});


cartItems.get('/cart-items/:id', (req, res) => {

    const item = items.find(item => item.id === +req.params.id)

    if (!item) {
        res.status(404).send('ID not found')
    }


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
    }

    const item = {
        id: items.length + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    items.push(item);
    res.status(201).send(item);
});


cartItems.put('/cart-items', (req, res) => {

});


cartItems.delete('/cart-items', (req, res) => {

});


module.exports = cartItems;