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

const cors = (req, res, next) => {
    const whiteList = [
        'http://localhost:8080'
    ]

    const origin = req.header.origin

    if (whiteList.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', '*')
    }

    res.setHeader('Acess-Control.Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
    res.setHeader('Acess-Control.Allow-Methods', 'token, Content-type, Authorization, x-access-token')
    next()
}

app.use(cors)

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