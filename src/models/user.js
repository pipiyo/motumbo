var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/motumbo");

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Coloca un email valido"];

var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		if (!/^[0-9]+-[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
};

var rut_validador = {
	validator: function(rut){
		Fn.validaRut(rut);
	},
	message: "Rut no es valido"
};

var password_validation = {
	validator: function(p){
		return this.confirm_password == p;
	},
	message: "Las Contraceñas no son iguales"
};

var userJson = {
	user: {type: String, 
		   required: "Campo Obligatorio",
		   maxlength:[3,"No puede superar los 3 caracteres"] },
	nombre: {type: String, 
		   required: "Campo Obligatorio" },
	apellido: {type: String, 
		   required: "Campo Obligatorio" },
	email: {type: String, 
		   required: "Campo Obligatorio",
		   match: email_match },
	rut: {type: String,
		  validate: rut_validador},
	password: {type: String,
			   validate: password_validation
			   }
};

var userSchema= new Schema(userJson);

userSchema.virtual("confirm_password").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var user = mongoose.model("user", userSchema);

module.exports.user = user;