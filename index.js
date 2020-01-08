const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3000

// app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(express.urlencoded( { extended: true} ));
app.use(require('./route/index.js'));
// const conection = require('./conection.js');/
// const router = require('./route/index.js');
// app.use(require('./conection.js'));
// app.use(router);


app.listen(port,() => {
    console.log(`http://localhost/${port}`);
});