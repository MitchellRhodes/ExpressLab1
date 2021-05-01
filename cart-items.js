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

    res.json(
        items.find(item => item.id === +req.params.id)
    );
    // res.status(404).json(
    //     'ID not found'
    // );
});






module.exports = cartItems;