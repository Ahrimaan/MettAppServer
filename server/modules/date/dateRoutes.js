var controller = require('./dateController');

const registerRoutes = (expressServer) => {
    expressServer.get('/mett', controller.getAll);
    expressServer.get('/mett/:id', controller.getOne);
    expressServer.post('/mett', controller.postDate);
    expressServer.post('/mett/:id/order/', controller.participate);
    expressServer.delete("/mett/:id", controller.deleteAppointment);
    expressServer.delete("/mett/:id/order/:participant", controller.unparticipate);
}

exports.registerRoutes = registerRoutes;