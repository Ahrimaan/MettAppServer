var express = require('express');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var database = require('./database/mongoStartup');
var adminRoleRoute = require('./modules/adminRole/adminRoleRoute');
var socialProviderRoute = require('./modules/socialProvider/socialProviderRoute');
var userRoute = require('./modules/user/userRoute');
var mettRoute = require('./modules/mett/mettRoute');
var dotenv = require('dotenv');
//Load local Config to env
dotenv.config();

//Create API Server
var server = express();
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({ secret: 'huzasdfas899332hufsd0ß2#324!', resave: true, saveUninitialized: false }));
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

server.use(function (req, res, next) {
        
    res.header("Access-Control-Allow-Origin", process.env.AllowedHost);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept,access-control-allow-headers," +
        "access-control-allow-origin, user, Access-Control-Expose-Headers, Access-Control-Allow-Methods");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Expose-Headers", "accept, authorization, content-type, x-requested-with, jwt, user");
    next();
});

server.get('/',(req,resp,next) => {
    resp.send('WORKS');
})

// Here comes all the routes
adminRoleRoute(server);
socialProviderRoute(server);
userRoute(server);
mettRoute(server);

database.startMongoServer();


server.listen(process.env.PORT || 3000, function (err) {
    if (err)
        console.error(err)
    else
        console.log('server listen to port : ' + process.env.PORT || 3000)
});

process.on('uncaughtException', function (err) {
    console.log(err);
    throw (err);
});
