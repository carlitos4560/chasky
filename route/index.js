const { Router } = require('express');
const routes = Router();
const conection = require('../conection.js');
const { getUsers } = require('../model/user.js');
const jwt = require('jsonwebtoken')
const { llave } = require('../config');

routes.get('/users', async(req, res) => { // obtener todos los usuarios 
  const all = await conection.query('SELECT  users.user_id, users.name, users.last_name FROM users');
  console.log(all.rows);
  res.status(200).json(all.rows); 
});

routes.post('/login', async(req, res) => { // incio de sesion comprobar si existe utilizandp midellware 
  let { name , password} = req.body;
  let sesion = await conection.query('SELECT sesion.id_user FROM sesion where sesion.name = $1 and sesion.password = $2',[name, password]);
  let aux = sesion.rows;
  if (aux.length === 0) {
    return res.status(200).json({
      message : "not found user",
      codigo:406
    });
  }
  let rol = await conection.query('SELECT users.id_type FROM users WHERE users.user_id = $1', [aux[0].id_user]);
  let token = jwt.sign( aux[0], llave); // crearcion de un token usando jwt
  let object = {token, user:aux[0].id_user, rol: rol.rows[0].id_type};
  return res.status(200).json(object);
})

routes.post('/createUser', async (req, res) => { // crear usuarios // comprobar si el usuario existe se puede implementar como un midelware
  let { type_user, name, last_name, email, fechaNacimiento, userName, password} = req.body;
  // console.log(type_user, name, last_name, email, fechaNacimiento);
  let sesion = await conection.query("SELECT sesion.name from sesion WHERE sesion.name =$1", [userName]);
  let aux = sesion.rows;
  if (aux.length !== 0){
    return res.status(406).json({
      message: "the username is in use",
      codigo: 406
    });
  } // todo este punto pasarlo a los midellware 
  let id = await conection.query("INSERT INTO users( id_type,name, last_name, email, fecha_nacimiento) values($1, $2, $3, $4,TO_DATE($5, 'DD/MM/YYYY')) RETURNING user_id", [type_user, name, last_name, email, fechaNacimiento]);
  let idUser = id.rows[0].user_id;
  await conection.query("INSERT INTO sesion (id_user, name, password) VALUES($1, $2, $3)",[idUser, userName, password]);
  return res.status(200).json({
    message: "create user sussesfull",
    id: id.rows
  });
});
 
routes.post('/createDocument', async(req, res) =>{ // crear documentos de usuario
  let {id_user, titulo, description, route} = req.body;
  let idDocument = await conection.query("INSERT INTO document (titulo, route) VALUES ($1, $2) RETURNING document_id",[titulo, route]);
  let aux = idDocument.rows;
  aux = aux[0].document_id;
  await conection.query("INSERT INTO userDocuments (id_user, id_document, description) VALUES ($1, $2, $3)",[id_user, aux, description]);
  return res.status(200).json({
    message: "create document sussesfuly",
    codigo:200
  });
});

function ensureToken (req, res, next) {
  console.log(req.headers);
  let token = req.headers['authorization'];
  if(typeof token === 'undefined'){
    return res.status(200).json({
      message: "you not be access",
      codido:401
    });
  }
  next();
};

// routes.get('/document/:id', async(req, res) => {
routes.get('/document/:id', ensureToken, async(req, res) => { // obtener documentos por id
  let idUser = req.params.id;
  let document = await conection.query('SELECT document.document_id, userdocuments.description, document.titulo, document.create_date FROM userdocuments, document WHERE userdocuments.id_document = document.document_id and userdocuments.id_user=$1',[idUser]);
  // console.log(document.rows);
  let aux = document.rows;
  if(aux.length === 0){
    return res.status(200).json({
      message: "not found documents"
    });
  }
  res.status(200).json(document.rows);
});

routes.get('/rol', async(req, res) => {
  let roles = await conection.query("SELECT name_type FROM type_users");  
  res.status(200).json(roles.rows);
});


routes.get('/documents', async(req, res) => { // acceder a todos los documentos 
  let documents = await conection.query("SELECT * FROM document");
  console.log(documents.rows);
  res.status(200).json(documents.rows);
});

routes.get('/allDocuments/:id', async(req, res) => {
  let user = req.params.id;
  let documents = await conection.query("SELECT d.document_id, d.titulo, d.route, d.create_date, userDocuments.description FROM document as d, userDocuments WHERE d.document_id = userDocuments.id_document and userDocuments.id_user = $1", [user]);
  console.log(documents.rows.length);
  if (documents.rows.length === 0) {
    return res.status(406).json({
      message: "the user not be document",
      codigo: 406
    });
  }
  return res.status(200).json(documents.rows);
});

module.exports = routes;