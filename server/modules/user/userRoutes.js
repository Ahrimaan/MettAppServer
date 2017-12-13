var controller = require('./userController');
let tokenMiddleware = require('../checkTokenMiddleware');

const registerRoutes = (expressServer) => {
    expressServer.get('/user',tokenMiddleware.validateToken, controller.getUserInformation);
    expressServer.patch('/user',tokenMiddleware.validateToken, controller.changeMandate);
}

exports.registerRoutes = registerRoutes;