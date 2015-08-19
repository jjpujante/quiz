var models = require("../models/models");

//-----------------------------------------------------------------------------
exports.new = 
//-----------------------------------------------------------------------------
    function(req, res){
        res.render('comments/new',{quizid: req.params.quizId, errors:[]});
    };

//-----------------------------------------------------------------------------
exports.create = 
//-----------------------------------------------------------------------------
    function(req, res, next){
      // Compone objeto 'comment' a partir del recibido
      var comment = models.Comment.build({texto: req.body.comment.texto, 
                                          QuizId:req.params.quizId});
                                          
      comment
      .validate()
      .then(
          function(err){
              // Si da por salida errores,....
              if (err){
                  res.render('comments/new', 
                             {comment: comment, quizId: req.params.quizId, errors:err.errors});
              }
              else
              { // Si no da errores la llamada a valirdar
                // Guardamos en bbdd la información del objeto, y entonces, vuelta al inicio
                comment
                .save()
                .then( function(){res.redirect('/quizes/'+req.params.quizId)});
              }
          }).catch(function(error){next(error)});
    };
    
