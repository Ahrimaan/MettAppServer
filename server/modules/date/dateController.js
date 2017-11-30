'use strict';

var dateModel = require('./dateModel');

const postDate = (req,res) => {
    checkDateExist(req.body.date).then(() => {
        createDate.then((result) => {
            return res.send(result);
        }).catch(() => {
            return res.send(500);
        });
    }).catch((err) => {
        console.log(err);
        return res.send(304);
    })
}

const getDates = (req,res) => {
    let query = dateModel.find({ "date": { $gte: new Date() } }).sort({ date: 1 }).exec();
    query.then((result) => {
       return res.send(result);
    }).catch((err) => {
        console.log(err);
        return res.send(500);
    });
}

exports.getDates = getDates;
exports.postDate = postDate;

const checkDateExist = (date) => {
    const promise = new Promise((resolve,reject) => {
        const findPromise =  dateModel.find({ date: mettDate }).exec();
        findPromise.then(resolve()).catch(reject());
    });

    return promise;
}

const createDate = (date,createdBy) => {
    const promise = new Promise((resolve,reject) => {
        var model = new dateModel();
        model.date = date;
        model.createdBy = createdBy;
        model.save((err, newItem) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            model.id = newItem._id;
            return resolve(model);
        });
    });
}

// Get all Appointments
exports.getAll = function (req, res, next) {
    mettModel.find({ "date": { $gte: new Date() } }).sort({ date: 1 }).exec(
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send(500);
            }
            return res.send(result);
        }
    );
}

exports.getOne = (req, res, next) => {
    mettModel.findOne({ _id: req.params.id }).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (result) {
            res.send(result);
        }
    })
};

exports.participate = (req, res, next) => {
    var mettId = req.params.id;
    if (!mettId) {
        console.log('no mettId was given', req);
        return res.sendStatus(403);
    }

    mettModel.findOne({ _id: mettId }).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (result) {
            if (!canParticipate(result.date)) {
                return res.send(304);
            }
            if (!result.participants) {
                result.participants = []
            }
            result.participants.push(
                {
                    userID: req.body.userID,
                    value: req.body.value,
                    payed: req.body.payed,
                    specialNeeds: req.body.specialNeeds,
                    fullName: req.session.passport.user.fullName
                });
            result.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(result);
            })

        }
        else {
            return res.sendStatus(404);
        }
    })
};

exports.deleteAppointment = function (req, res, next) {
    deleteAppointment(res, req.params.id);
}

exports.unparticipate = (req, res, next) => {
    var appointmentId = req.params.id;
    var participantId = req.params.participant;
    if (!appointmentId || !participantId) {
        res.send(403);
    }
    mettModel.findOne({ _id: appointmentId }).exec((err, result) => {
        if (!canParticipate(result.date)) {
            return res.send(304);
        }
        if (err) {
            return res.send(500);
        }
        if (result) {
            result.participants.splice(result.participants.findIndex(x => x.userID === participantId), 1);
            result.save((err, result) => {
                if (err) {
                    return res.send(500);
                }
                return res.send(200);
            });
        }
        return res.status(401);
    });
}

function canParticipate(itemdate) {
    let now = new Date();
    now.setTime(now.getTime() + (2 * 60 * 60 * 1000));
    let result = new Date(itemdate) > now;
    return result;
}

function deleteAppointment(res, id) {
    mettModel.find({ _id: id }).remove().exec(function (err, code) {
        if (err) {
            res.send(err);
        }
        console.log('Appointment Id deleted: ' + id);
        return res.sendStatus(200);
    });
}

function checkMettAppointmentExist(mettDate, req, resp) {
    mettModel.find({ date: mettDate }).exec(function (err, mett) {
        if (err) {
            console.log(err);
            return resp.send(304);
        }
        else {
            var model = new mettModel();
            model.date = mettDate;
            model.createdBy = req.body.username;
            model.save((err, newItem) => {
                if (err) {
                    console.log(err);
                    resp.status(500);
                    return resp.send(err);
                }
                model.id = newItem._id;
                resp.status(200);
                return resp.send(model);
            });
        }


    });
}
