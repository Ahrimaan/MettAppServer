var adminRoleController = require('./adminRoleController');
var checkAdminRole = require('../checkAdminStatus');
var checkAuth = require('./../checkAuthentication');

module.exports = function (server) {
    // User Routes
    server.get('/admin/:id',checkAuth,adminRoleController.getUser);
    server.post("/admin",checkAuth,checkAdminRole, adminRoleController.createUser);
    server.get("/admin",checkAuth,checkAdminRole, adminRoleController.getUsers);
    server.delete("/admin",checkAuth,checkAdminRole, adminRoleController.deleteUser);
}