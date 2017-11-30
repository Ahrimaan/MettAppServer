var mongo = require('mongoose');

var Schema = mongo.Schema;

var participant = new Schema({
    fullName:String,
    userID:String,
    createDate:Date,
    value:Number,
    payed:Boolean,
    specialNeeds:String
})

var dateSchema = new Schema({
    id: String,
    date:Date,
    createdBy:String,
    created:Date,
    participants:[participant]
});

dateSchema.pre('save', function (next) {
   var date = this;
   date.created = new Date();
   next();
});

participant.pre('save',next => {
    var part = this;
    part.created = new Date();
    next();
})

module.exports = mongo.model('date', dateSchema);