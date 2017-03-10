var mongoose = require('mongoose');
var conf = require('../configuration.js');

module.exports = {
    startMongoServer: () =>  {
        //TODO: Secure with Username and Password
        console.log('Starting Database connection to' + conf.databseUrl)
        mongoose.connect(conf.databseUrl); // connect to our databas
        console.log('Established Database connection to ' + conf.databseUrl)
        mongoose.connection.on('error', function (err) {
            console.log('MongoDB error: %s', err);
        });
    }
}