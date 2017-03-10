module.exports = function(req,res,next){
    if(req.params.participant !== req.user.id){
        return res.sendStatus(401);
    }
    return next();
}