const express = require('express');
const routes = express.Router();
const AlunoController = require('./controllers/AlunoController');
const CampiController = require('./controllers/CampiController');

routes.get('/alunos?', AlunoController.index);
routes.get('/alunos/:id', AlunoController.show);
routes.post('/alunos', AlunoController.store);
routes.put('/alunos/:id', AlunoController.update);
routes.delete('/alunos/:id', AlunoController.destroy);

routes.get('/campi', CampiController.index);
routes.get('/campi/:id', CampiController.show);
routes.post('/campi', CampiController.store);
routes.put('/campi/:id', CampiController.update);
routes.delete('/campi/:id', CampiController.destroy);


module.exports = routes;