var controller = require('./socialproviderController');
var passport = require('passport');

module.exports = function (server) {
    server.get('/auth/google', controller.authGoogle);
    server.get('/auth/google/callback', passport.authenticate('google'),controller.authProviderCallback);
    server.get('/auth/amazon', controller.authAmazon);
    server.get('/auth/amazon/callback', passport.authenticate('amazon'),controller.authProviderCallback);
  /*  server.get('/auth/linkedin', controller.authLinkedIn);
    server.get('/auth/linkedin/callback', passport.authenticate('linkedin'),controller.authProviderCallback); */
    server.get('/auth', controller.checkAuthenticationStatus);
}