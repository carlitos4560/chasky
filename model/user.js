const conection = require('../conection');

const getUsers = async() =>{
    return await conection.query("SELECT * FROM users");
}

module.exports = {
    getUsers
};