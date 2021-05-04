const express = require('express');
const Joi = require("joi");
const cartItems = express.Router();

cartItems.use(express.json());


const items = [
    {
        id: 1,
        product: 'milk',
        price: 2.99,
        quantity: 1
    },

    {
        id: 2,
        product: 'resident evil 8',
        price: 59.99,
        quantity: 1
    },

    {
        id: 3,
        product: '4k proscan Tv',
        price: 299.99,
        quantity: 1
    },

    {
        id: 4,
        product: '4k samsung Tv',
        price: 399.99,
        quantity: 1
    },
    {
        id: 5,
        product: '4k sony Tv',
        price: 599.99,
        quantity: 1
    },
    {
        id: 6,
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


    res.status(200).json(item);
});




cartItems.post('/cart-items', (req, res) => {

    const validation = validateItems(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    };


    const item = {
        id: items.length + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    items.push(item);
    res.status(201).json(item);
});


cartItems.put('/cart-items/:id', (req, res) => {
    //look up item
    const item = items.find(item => item.id === +req.params.id);

    if (!item) {
        res.status(404).send('ID not found')
    }

    const validation = validateItems(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    };

    item.product = req.body.product;
    item.price = req.body.price;
    item.quantity = req.body.quantity;

    res.status(200).json(item);

});


cartItems.delete('/cart-items/:id', (req, res) => {

    const item = items.find(item => item.id === +req.params.id)

    if (!item) {
        res.status(404).send('ID not found')
    };

    const index = items.indexOf(item);
    items.splice(index, 1);

    res.status(204).json(item);
});


function validateItems(item) {
    const schema = Joi.object({
        product: Joi.string().min(1).required(),
        price: Joi.number().positive().precision(2).required(),
        quantity: Joi.number().positive().precision(0).required()
    });

    return schema.validate(item, { convert: false });
};

module.exports = cartItems;