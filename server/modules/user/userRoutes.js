var controller = require('./userController');

const registerRoutes = (expressServer) => {
    expressServer.post('/user', controller.getUserInformation);
    expressServer.patch('/user',controller.changeMandate);
}

exports.registerRoutes = registerRoutes;