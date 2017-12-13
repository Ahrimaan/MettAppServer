let controller = require('./mandateController');
let checkToken = require('../checkTokenMiddleware');

const registerRoutes = (expressServer) => {
    expressServer.get('/mandate',checkToken.validateToken, controller.getMandates);
}

exports.registerRoutes = registerRoutes;