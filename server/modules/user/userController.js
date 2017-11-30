const userModel = require('./userModel');
const mongoose = require('mongoose');


const getUserInformation = (req,res) => {
    let query = userModel.findOne({'userId': req.body.userId }).exec();
    query.then((result) => {
        if(result){
            return res.send(result);
        }
        else{
            createUser(req.body.userId, req.body.userName).then((user) => {
                return res.send(user);
            }).catch((err) => {
                res.status(500);
                console.error(err);
                return res.send(err);
            });
        }       
    }).catch((err) => {
        console.log(err);
        return res.send(500);
    })
} 

const addUserToMandate = (req,res) => {
    let {userId,mandateId} = req.body;
    let query = userModel.findOneAndUpdate({_id:userId},{mandateId:mandateId},{new:true}).exec(); 
    query.then((result) => {
        return res.send(result);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    })
}

exports.getUserInformation = getUserInformation;
exports.changeMandate = addUserToMandate;

const createUser = (userId,userName) => {
    return new Promise((resolve,reject) => {
        userModel.create({
            userId:userId,
            userName:userName
        },(err,model) => {
                if(err){
                     return reject(err);
                }
                return resolve(model);
            });
    });
    
}