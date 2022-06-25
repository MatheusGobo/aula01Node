const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Teste GET request to /products'
    })
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(200).json({
        message: 'Teste POST request to /products',
        product: product
    })
});


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id > 0) {
        res.status(200).json({
            message: 'Product Id foi informado',
            id: id
        })
    } else {
        res.status(400).json({
            message: 'productId deve ser maior que zero'
        })
    }
})


router.patch('/:producId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Update products',
        id: id
    })
})

router.delete('/:producId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Delete products',
        id: id
    })
})

module.exports = router;