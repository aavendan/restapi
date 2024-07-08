require('dotenv').config()

const express = require('express');
// var cors = require('cors')
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

/* Referencia al módulo swagger-ui-express */
const swaggerUi = require('swagger-ui-express')

/* Referencia al archivo con la descripción */
const swaggerFile = require('./swagger_output.json')

// console.log(JSON.parse(process.env.FIREBASE_ADMIN_API)["private_key"])
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_API)
// const serviceAccount = require('./config/firebaseConfig.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

// app.use(cors())

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

/* Ruta Base -> Documentación */
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});