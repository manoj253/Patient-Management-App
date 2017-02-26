'use strict';

var mongoose = require('mongoose'),
  HttpService = require('../services/HttpService'),
  UserModel = require('../models/UsersModel');
var http = require('http');
var UserOperations = {
  index: function (req, res) {
  		return res.render('index.ejs');
  	},
addPatient: function (req, res) {
  var User = new UserModel({
    firstName:req.body.fname,
    lastName:req.body.lname,
    dob:req.body.dob,
    age:req.body.age,
    gender:req.body.gender,
    phoneNumber:req.body.phoneNumber,
    email:req.body.email,
    description:req.body.desc,
    dosage :req.body.dosage,
    });
    User.save(function (err, user) {
      if (err) {
        console.log(err.message);
        return HttpService.bad(res, err)
      }
      else {
        return HttpService.send(res, {Userdetail: user})
      }
    });
},
getPatients: function (req,res) {
  UserModel.find({},function (err, patients) {
    if (err) { return HttpService.bad(res, 'No Data found.') }
    else {
      return HttpService.send(res, {data: patients})
    }
})
}
}

module.exports = UserOperations;
