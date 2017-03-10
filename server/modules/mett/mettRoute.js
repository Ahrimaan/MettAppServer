var controller = require('./mettController');
var checkAdminRole = require('../checkAdminStatus');
var checkAuth = require('./../checkAuthentication');
var checkIsCurrentUser = require('../isCurrentUser');

module.exports = function (server) {
    // User Routes
    server.get('/mett',checkAuth, controller.getAll);
    server.get('/mett/:id',checkAuth, controller.getOne);
    server.post('/mett',checkAuth, checkAdminRole, controller.createMett);
    server.post('/mett/:id/order/',checkAuth, controller.participate);
    server.delete("/mett/:id",checkAuth, checkAdminRole, controller.deleteAppointment);
    server.delete("/mett/:id/order/:participant",checkAuth,checkIsCurrentUser, controller.unparticipate);
}