const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders')

//Adiciona Log das chamadas.
app.use(morgan('dev'));

//para conseguir receber JSON na requisição
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: "Hello World!"
    })
})


app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;