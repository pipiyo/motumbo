var express = require("express"),
	home_router = require("./routes/home_route"),
	session_router = require("./routes/session_route"),
	check_session = require("./middlewares/session"),
  	cookieSession = require("cookie-session"),
	bodyParser = require("body-parser");

var app = express();

app.set("view engine", "pug");
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
	name: "session",
	keys: ["llave-1", "llave-2"]
}));

app.get("/", function(req, res){
	res.redirect("/login");
});

app.get("/login", function(req, res){
	res.render("login");
});

app.use("/session", session_router);
app.use("/home", check_session);
app.use("/home", home_router);

app.listen("8080");