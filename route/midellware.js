const jwt = require('jsonwebtoken');
const conection = require('../conection.js');

let verfifyToken = (req, res, next) => {
    let token = req.req.headers['authorization'];
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }
    next();
};

let createToken = (req, res, next) => {
    res.json({"message": "Hola Carlos como estas "});
};

module.exports = ({
    verfifyToken
});