let jwtValidate = require('jsonwebtoken');

exports.validateToken = (req,resp,next) => {
    let token = req.headers.token;
    if(!token){
        resp.status(400);
        return resp.send();
    }

    jwtValidate.verify(token,process.env.tokenSecret, (err,result) => {
        if(err){
            return resp.status(500).send(err);
        }
        return next();
    })
}