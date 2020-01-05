
CREATE TABLE IF NOT EXISTS type_users(
    id_type serial PRIMARY KEY,
    name_type VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL UNIQUE PRIMARY KEY,
    id_type INTEGER ,
    name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    CONSTRAINT foreign_key FOREIGN KEY (id_type) REFERENCES type_users(id_type)

);

CREATE TABLE IF NOT EXISTS document (
    document_id SERIAL UNIQUE PRIMARY KEY,
    titulo TEXT NOT NULL,
    route text NOT NULL,
    create_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS sesion(
    sesion_id SERIAL UNIQUE PRIMARY KEY,
    id_user INTEGER,
    name VARCHAR(25) UNIQUE,
    password VARCHAR(25),
    token TEXT,
    CONSTRAINT foreign_key FOREIGN KEY (id_user) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS userDocuments (
    description_id SERIAL UNIQUE PRIMARY KEY,
    id_document INTEGER,
    id_user INTEGER,
    description TEXT NOT NULL,
    CONSTRAINT foreign_key_document FOREIGN KEY (id_document) REFERENCES document(document_id),
    CONSTRAINT foreign_key_users FOREIGN KEY (id_user) REFERENCES users(user_id)
);

