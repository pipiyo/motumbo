var express = require("express");
var user_model = require("../models/user").user;
var router = express.Router();

router.get("/", function(req, res){
	console.log(req.session.user_id);
	res.render('../views/home/home');
});

router.get("/singup", function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    res.render('../views/home/singup');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
}).post("/singup", function(req, res){ 

	var user = new user_model({user: req.body.user,
						 nombre: req.body.nombre,
						 apellido: req.body.apellido,
						 email: req.body.email,
						 rut: req.body.rut,
						 password: req.body.password,
						 confirm_password: req.body.confirm_password});    

    user.save().then(function(doc){
		res.redirect("/home");
	},function(err){
		console.log(String(err));
		res.send(String(err));
	});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

});

router.get("/logout", function(req, res){
	req.session = null;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    res.redirect('/login');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
});

router.get("/pong", function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    res.render('../views/home/pong');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
});

module.exports = router;