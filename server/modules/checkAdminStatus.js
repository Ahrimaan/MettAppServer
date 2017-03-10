var user = require('./adminRole/adminRoleModel');

module.exports = function(req,res,next){
    var userId = req.user.id;

    if(!userId) {
        return res.sendStatus(403);
    }
    user.findOne({ "id": userId }).exec(function(err, user) {
        if(err){
           res.status(500); 
           return res.send(err);
        }           
        else{
            if(user !== null){
                return next();
            }
            return res.sendStatus(401);
        }
    });
}