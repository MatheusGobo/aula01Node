const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Test GET request /orders'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        product_id: req.body.productId,
        quantity: req.body.quantity
    }

    res.status(200).json({
        message: 'Test POST request /orders',
        order: order
    })
})


router.get('/:oderId', (req, res, next) => {
    const id = req.params.oderId;
    res.status(200).json({
        message: 'Test GET request /orders',
        id: id
    })
})

router.patch('/:oderId', (req, res, next) => {
    const id = req.params.oderId;

    res.status(200).json({
        message: 'Update order',
        id: id
    })
})

router.delete('/:oderId', (req, res, next) => {
    const id = req.params.oderId;

    res.status(200).json({
        message: 'Delete Order',
        id: id
    })
})


module.exports = router;