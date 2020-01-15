const { Router } = require('express');

const SearchController = require('./controllers/SearchController');
const DevController = require('./controllers/DevController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recuso na alteração ou remoção)
// Body: request.body (Dadis oara criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;