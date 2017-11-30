var controller = require('./mandateController');

const registerRoutes = (expressServer) => {
    expressServer.get('/mandate', controller.getMandates);
}

exports.registerRoutes = registerRoutes;