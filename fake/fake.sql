INSERT INTO type_users(name_type) VALUES
('admin'), 
('user'), 
('subUser');

INSERT INTO users(id_type, name, last_name, email, fecha_nacimiento) VALUES
(1, 'roberto', 'escobar', 'car@gmail.com', TO_DATE('20-07-1992', 'DD/MM/YYYY')),
(2, 'carlos', 'escobar', 'car@gmail.com', TO_DATE('20/07/1992', 'DD/MM/YYYY')),
(1, 'ana', 'escobar', 'car@gmail.com', TO_DATE('20/07/1992','DD/MM/YYYY')),
(3, 'beto', 'escobar', 'car@gmail.com', TO_DATE('20/07/1992','DD/MM/YYYY')),
(2, 'rosimar', 'escobar', 'car@gmail.com', TO_DATE('20/07/1992','DD/MM/YYYY'));

INSERT INTO sesion(id_user, name, password, token) VALUES
(2, 'carlos', '123', 'adfafadfadf');

INSERT INTO document(titulo, route) VALUES 
('documento1','/dev/'),
('documento2','/dev/'),
('documento3','/dev/'),
('documento4','/dev/'),
('documento5','/dev/'),
('documento6','/dev/'),
('documento7','/dev/'),
('documento8','/dev/'),
('documento9','/dev/'),
('documento10','/dev/'),
('documento11','/dev/'),
('documento12','/dev/'),
('documento13','/dev/'),
('documento14','/dev/'),
('documento15','/dev/'),
('documento16','/dev/');

INSERT INTO userDocuments(id_user, id_document, description) VALUES 
(1,1, 'libro para niños'),
(1,2, 'libro para adolecentes'),
(2,2, 'libro para todos'),
(2,1, 'libro para pintar');


