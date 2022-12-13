const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require("swagger-ui-express")

const app = express()
const port = 3000


// Middlewares
app.use(express.json());


//routes
const reportRoutes = require("./src/report/routes")


app.use('/report', reportRoutes)

// swagger
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Enyata Reports',
        version: '1.0.0',
      },
    },

    apis: ["./src/report/routes.js"], 

};

const swaggerDocs = swaggerJsdoc(options);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
})