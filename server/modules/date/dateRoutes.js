var controller = require('./dateController');
let tokenMiddleware = require('../checkTokenMiddleware');

const registerRoutes = (expressServer) => {
    expressServer.get('/mett',tokenMiddleware.validateToken, controller.getAll);
    expressServer.get('/mett/:id',tokenMiddleware.validateToken, controller.getOne);
    expressServer.post('/mett',tokenMiddleware.validateToken, controller.postDate);
    expressServer.post('/mett/:id/order/',tokenMiddleware.validateToken, controller.participate);
    expressServer.delete("/mett/:id",tokenMiddleware.validateToken, controller.deleteAppointment);
    expressServer.delete("/mett/:id/order/:participant",tokenMiddleware.validateToken, controller.unparticipate);
}

exports.registerRoutes = registerRoutes;