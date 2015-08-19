exports.loginRequired = function(req, res, next){
  if (req.session.user)  {
    // si tenemos session.user --> estamos logueados.
    // llamamos a la función que es el 3º parámetro.
    next();
  }else{
    // Si no está logueado, lo mandamos a hacer login
    res.redirect('/login');
  }
  
};

exports.new = function(req, res, next)
{
  var errors = req.session.errors || {};
  req.session.errors = {};
  
  res.render('session/new', {errors:errors});
};

exports.create = function(req, res, next)
{
  var login = req.body.login;
  var password = req.body.password;
  
  var userController = require('./user_controller');
  
  userController.autenticar(login, password, function(error, user){
     
     if (error){// si hubiera habido un errror
        req.session.errors = [{"message": 'Se ha producido un error'+error}];
        res.redirect('/login');
        return;
     }
     
     //Crear req.session.user y guardar campos id y username
     // La session se define por la existencia de: "req.session.user"
     req.session.user = {id: user.id, username:user.username};
     res.redirect(req.session.redir.toString());
     
  });
  
};

exports.destroy = function(req, res)
{
  delete req.session.user;
  res.redirect(req.session.redir.toString());
};

