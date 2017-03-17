var mongoose = require('mongoose');

module.exports = {
    startMongoServer: () =>  {
        //TODO: Secure with Username and Password
        console.log('Starting Database connection to' + process.env.MongoURL)
        mongoose.connect(process.env.MongoURL); // connect to our databas
        console.log('Established Database connection to ' + process.env.MongoURL)
        mongoose.connection.on('error', function (err) {
            console.log('MongoDB error: %s', err);
        });
        return mongoose;
    }
}