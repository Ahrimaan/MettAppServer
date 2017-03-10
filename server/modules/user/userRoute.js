/**
 * Created by Ahrimaan on 06.01.2017.
 */

var passport = require('passport');
var ctrl = require('./userController');
var checkAdminRole = require('../checkAdminStatus');
var checkAuth = require('./../checkAuthentication');
var checkIsCurrentUser = require('../isCurrentUser');

module.exports = function (server) {
    server.get('/user/:id',checkAuth, ctrl.getUser);
    server.delete('/user/:id', ctrl.logOut);
    server.post('/user', ctrl.CreateLocalUser);
    server.post('/user/login',ctrl.authLocal);
    server.post('/user/unlock/:id', ctrl.unlockUser)
}