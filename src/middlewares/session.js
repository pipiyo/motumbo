var user = require("../models/user").user;

var session = function(req, res, next){
	if (!req.session.user_id) {
		res.redirect("/login");
	} else {
		user.findById( req.session.user_id, function(err, doc){
			if (err || doc == null) {
				res.redirect("/login");
			} else {
				res.locals.user = {user: doc};
				next();
			}
		});
	}
};

module.exports = session;