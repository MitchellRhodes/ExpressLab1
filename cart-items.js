const express = require('express');
const Joi = require("joi");
const pgp = require('pg-promise')();

const cartItems = express.Router();

cartItems.use(express.json());

const db = pgp({
    database: 'ExpressShopDB'
});



cartItems.get('/cart-items', async (req, res) => {
    let filtered = await db.many(`SELECT * FROM shopping_cart`);

    //figure out how to do all queries after you figure out prefix LIKE 

    if (req.query.maxPrice) {
        filtered = await db.many(`SELECT * FROM shopping_cart WHERE price <= $(maxPrice)`, {
            maxPrice: +req.query.maxPrice
        })
    }

    //ask how to handle % on the product since it is injected and what I tried didn't work
    if (req.query.prefix) {
        filtered = await db.many(`SELECT * FROM shopping_cart WHERE product LIKE $(product)`, {
            product: req.query.prefix
        })
    }

    if (req.query.pageSize) {
        filtered = await db.many(`SELECT * FROM shopping_cart LIMIT $(pageSize)`, {
            pageSize: req.query.pageSize
        })
    }


    res.status(200).json(filtered);
});




cartItems.get('/cart-items/:id', async (req, res) => {

    const item = await db.oneOrNone(`SELECT * FROM shopping_cart WHERE shopping_cart.id = $(id)`, {
        id: +req.params.id
    })


    if (!item) {
        return res.status(404).send('ID not found')
    };


    res.status(200).json(item);
});




cartItems.post('/cart-items', async (req, res) => {

    const validation = validateItems(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    };


    await db.none(`INSERT INTO shopping_cart (product,price,quantity) VALUES($(product),$(price), $(quantity))`, {
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    })

    const item = await db.one(`SELECT * FROM shopping_cart WHERE product = $(product)`, {
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    })


    res.status(201).json(item);
});


cartItems.put('/cart-items/:id', async (req, res) => {
    //look up item
    const item = await db.oneOrNone(`SELECT * FROM shopping_cart WHERE shopping_cart.id = $(id)`, {
        id: +req.params.id,
    })

    if (!item) {
        return res.status(404).send('ID not found')
    }

    const validation = validateItems(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    };

    const updateItem = await db.oneOrNone(`UPDATE shopping_cart SET product = $(product), price = $(price), quantity = $(quantity) WHERE id = $(id) `, {
        id: +req.params.id,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    })

    res.status(200).json(item);

});


cartItems.delete('/cart-items/:id', async (req, res) => {

    const item = await db.oneOrNone(`SELECT * FROM shopping_cart WHERE shopping_cart.id = $(id)`, {
        id: +req.params.id,
    })

    if (!item) {
        return res.status(404).send('ID not found')
    };

    const deleteItem = await db.none(`DELETE FROM shopping_cart WHERE shopping_cart.id = $(id)`, {
        id: +req.params.id,
    })

    // const index = items.indexOf(item);
    // items.splice(index, 1);

    res.status(204).json(deleteItem);
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