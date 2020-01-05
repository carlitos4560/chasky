const { Pool } = require('pg')
const conection = new Pool({
  user: 'carlitos',
  host: 'localhost',
  database: 'document',
  password: 'roberto',
  port: '5432',
});

module.exports = conection;