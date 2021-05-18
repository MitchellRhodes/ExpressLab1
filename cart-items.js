const express = require('express');
const Joi = require("joi");
const pgp = require('pg-promise')();

const cartItems = express.Router();

cartItems.use(express.json());

const db = pgp({
    database: 'ExpressShopDB'
});



cartItems.get('/cart-items', async (req, res) => {
    let filtered = res.json(await db.many(`SELECT * FROM shopping_cart`));

    // if (req.query.maxPrice) {
    //     filtered = filtered.filter(item => item.price <= +req.query.maxPrice);
    // }

    // if (req.query.prefix) {
    //     filtered = filtered.filter(item => item.product.includes(req.query.prefix));
    // }

    // if (req.query.pageSize) {
    //     filtered = filtered.slice(0, req.query.pageSize);
    // }


    res.status(200).json(filtered);
});




cartItems.get('/cart-items/:id', (req, res) => {

    const item = items.find(item => item.id === +req.params.id);

    if (!item) {
        return res.status(404).send('ID not found')
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
        return res.status(404).send('ID not found')
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
        return res.status(404).send('ID not found')
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