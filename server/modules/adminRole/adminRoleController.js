var user = require('./adminRoleModel');

exports.getUsers = (req, res, next) =>   {
    user.find(function (err, users) {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        res.json(users);
    });
};

exports.getUser = (req, res, next) =>  {
    var userId = req.params.id;
    user.find({id: userId},function (err, user) {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        if(user.length > 0){
            return res.json(user);
        }
        return res.sendStatus(403);
    });

};

exports.createUser = (req, res, next) =>  {
    var userId = req.headers.userid;
    createUser(res, req.body.newUserId);
};

exports.deleteUser = (req, res, next) => {
    var id = req.body.id;
    deleteUser(req, res, id);
};

function createUser(res, userId) {
    var newUser = new user();
    newUser.id = userId;
    newUser.save((err) => {
        if (err) {
            return res.send(err);
        }
        return res.send(200);
    });
}

function deleteUser(req, res, userId) {
    user.find({ _id: req.body.id }).remove().exec(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'User deleted' + user });
    });
}
