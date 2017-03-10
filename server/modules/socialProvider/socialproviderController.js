let passport = require('passport');
let googleStrategy = require('passport-google-oauth').OAuth2Strategy;
let amazonStrategy = require('passport-amazon').Strategy;
let linkedInStrategy = require('passport-linkedin-oauth2').Strategy;

let cache = require('./../../cache');
let config = require('./../../configuration');

if (config.authentication.google.use) {
    passport.use(new googleStrategy({
        clientID: config.authentication.google.clientId,
        clientSecret: config.authentication.google.secret,
        callbackURL: config.authentication.google.callbackUrl
    }, oauthCallback));
}

if (config.authentication.amazon.use) {
    passport.use(new amazonStrategy({
        clientID: config.authentication.amazon.clientId,
        clientSecret: config.authentication.amazon.secret,
        callbackURL: config.authentication.amazon.callbackUrl
    }, oauthCallback));
}

if (config.authentication.linkedin.use) {
    passport.use(new linkedInStrategy({
        authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
        tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
        clientID: config.authentication.linkedin.clientId,
        clientSecret: config.authentication.linkedin.secret,
        callbackURL: config.authentication.linkedin.callbackUrl,
        scope: ['r_basicprofile', 'r_emailaddress'],
        passReqToCallback: false
    }, linkedInCallback));
}

function authGoogle(req, res, next) {
    passport.authenticate('google',
        {
            scope: ['https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email']
        }
    )(req, res, next); // Do it like this to pass in the server functionality to passport to get a correct redirect
};

function authAmazon(req, res, next) {
    passport.authenticate('amazon', { scope: ['profile'] })
        (req, res, next);
};

function authLinkedIn(req, res, next) {
    passport.authenticate('linkedin', { state: 'chaosMett' })(req, res, next);
};

function authProviderCallback(req, res, next) {
    return res.sendStatus(200);
};

function checkAuthenticationStatus(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('user', req.session.passport.user.id);
        return res.sendStatus(200);
    }
    return res.sendStatus(401);
};

//Special : this libary seems to need a 5th parameter for callback
function linkedInCallback(arg, refreshToken, token, profile, done) {
    cache.setCacheItem(profile.id, profile);
    return done(null, profile);
};

//Used by standard implementation of oauth strategies
function oauthCallback(accessToken, refreshToken, profile, done) {
    cache.setCacheItem(profile.id, profile);
    return done(null, profile);
};

var sclCtrl = {};
sclCtrl.authAmazon = authAmazon;
sclCtrl.authGoogle = authGoogle;
sclCtrl.authLinkedIn = authLinkedIn;
sclCtrl.authProviderCallback = authProviderCallback;
sclCtrl.checkAuthenticationStatus = checkAuthenticationStatus

module.exports = sclCtrl;