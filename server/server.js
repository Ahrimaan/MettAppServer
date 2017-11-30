var express = require('express');
var expressSession = require('express-session');
var dotenv = require('dotenv');
//Load local Config to env
dotenv.config();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var database = require('./database/mongoStartup');
var dateRoutes = require('./modules/date/dateRoutes');
var userRoutes = require('./modules/user/userRoutes');
var mandateRoutes = require('./modules/mandates/mandateRoutes');
var mongo = database.startMongoServer();

//Create API Server
var server = express();
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
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

server.get('/', (req, resp, next) => {
    resp.send('WORKS');
})
dateRoutes.registerRoutes(server);
userRoutes.registerRoutes(server);
mandateRoutes.registerRoutes(server);

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
