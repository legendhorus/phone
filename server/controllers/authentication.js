let md5 = require('md5');
let jwt = require('jsonwebtoken');
let jsonResponse = require('../response');
let errorCode = require('../errorCode').CODES;
let User = require("../models/userModel");
let config = require('../config');

module.exports.register = function(req, res) {
    req.body.password = md5(req.body.password);
    User.create(req.body).then(function(result){
        let token = jwt.sign(req.body, config.secret);
        res.json({
            status: errorCode.SUCCESS,
            message: "Success",
            token: token
        });
    }).catch(function(){
        res.json({
            status: errorCode.ERROR_USER_EXISTED,
            message: "User existed"
        });
    })
}

module.exports.login = function(req, res) {
    req.body.password = md5(req.body.password);
    User.findOne({username: req.body.username})
        .then(function(user){
            if(!user) {
                res.json({
                    status: errorCode.ERROR_USER_NOT_EXISTS,
                    message: "User not exists"
                });
            } else {
                if(user.password !== req.body.password){
                    res.json({
                        status: errorCode.ERROR_WRONG_PASSWORD,
                        message: "wrong password"
                    });
                } else {
                    let responseUser = {
                        "username": req.body.username,
                        "password": req.body.password,
                        "updated_at": user.updated_at,
                    };
                    let token = jwt.sign(responseUser, config.secret);
                    res.json({
                        status: errorCode.SUCCESS,
                        message: "Success",
                        token: token,
                        user: responseUser
                    });
                }
            }
        })
}

function getUsers(res){
    User.find(function(err, users){

        if(err){
            res.status(500).json(err);
        }
        else{
            res.json(users);
        }

    });
}

module.exports.getUser = (req, res) => {
	getUsers(res);
}