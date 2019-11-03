const express = require('express');
const routes = express.Router();
const AlunoController = require('./controllers/AlunoController');
const CampiController = require('./controllers/CampiController');

routes.get('/alunos?', AlunoController.index);
routes.get('/alunos/:matricula', AlunoController.show);
routes.post('/alunos', AlunoController.store);
routes.put('/alunos/:matricula', AlunoController.update);
routes.delete('/alunos/:matricula', AlunoController.destroy);

routes.get('/campi', CampiController.index);
routes.get('/campi/:codigo', CampiController.show);
routes.post('/campi', CampiController.store);
routes.put('/campi/:codigo', CampiController.update);
routes.delete('/campi/:codigo', CampiController.destroy);


module.exports = routes;