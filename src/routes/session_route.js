var express = require("express");
var user = require("../models/user").user;
var router = express.Router();

router.post("/", function(req, res){
	user.findOne( {email: req.body.email, password: req.body.password }, "_id", function(err, doc){
		if (err || doc == null) {
		  res.redirect("/home");
		} else {
		  req.session.user_id = doc._id;
	      res.redirect("/home");
		}
	} );
	//res.render("../views/home/home");
});

module.exports = router;