var models = require("../models/models");

//-----------------------------------------------------------------------------
exports.load = 
//-----------------------------------------------------------------------------
    function(req, res, next, commentId){
        models
        .Comment
        .find({where:{id:Number(commentId)}})
        .then(function(comment){
            if(comment){
                req.comment = comment;
                next();
            }else { next(new Error('No existe commentId=' + commentId))}
        }).catch(function(error){next(error)});
    };


//-----------------------------------------------------------------------------
exports.publish = 
//-----------------------------------------------------------------------------
    function(req, res, next){
        req.comment.publicado = true;
        req
        .comment
        .save({fields: ["publicado"]})
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)})
        .catch(function(error){next(error)});
    };

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
    
