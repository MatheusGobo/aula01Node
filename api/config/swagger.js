const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: "Aula Node Pós Graduação", //Titulo da documentação
        version: "1.0.0",
        description: "Uma simples API para aula de pós graduação em Node.js"
    },
    host: "localhost:3000",
    basePat: "/",
    schemes: [
        "http"
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./api/docs/**/*.yaml'],
};

module.exports = swaggerJSDoc(options);