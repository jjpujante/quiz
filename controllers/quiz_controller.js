var models = require("../models/models");

// Exportar la función load()
exports.load = 
    function(req, res, next, quizId)
    {
        models.Quiz.find(quizId).then(
            function(quiz) {
                if (quiz)   {
                    req.quiz = quiz;
                    next();
                }
                else{
                    next(new Error("No existe quizId= "+quizId));
                }
                
            }
            ).catch(function(error){next(error)});
    };
    
// GET quizes/new --muestra formulario para dar de alta pregunta
exports.new = 
    function(req, res){
        var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});
        res.render('quizes/new',{quiz: quiz, errors:[]});
    };

// GET quizes/create --realiza la inserción de la pregunta al venir de /new
exports.create = 
    function(req, res){
      // Compone objeto 'quiz' a partir del recibido
      var quiz = models.Quiz.build(req.body.quiz);
      // Lanzamos la función de validar los campos de objeto antes de guardar...
      console.log(quiz);
      quiz.validate().then(
          function(err){
              // Si da por salida errores,....
              if (err){
                  res.render('quizes/new', {quiz: quiz, errors:err.errors});
              }
              else
              { // Si no da errores la llamada a valirdar
                // Guardamos en bbdd la información del objeto, y entonces, vuelta al inicio
                quiz.save({fields:["pregunta", "respuesta"]}).then(function(){res.redirect("/quizes")});    
              }
          });
    };
    
// GET quizes/
exports.index = 
    function(req, res){
        var patron;
        if (req.query.search){
            patron = '%'+req.query.search.replace(' ', '%')+'%';
            console.log("buscando preguntas..."+req.query.search);
            console.log("buscando preguntas PATRON: "+patron);
            models.Quiz.findAll({where: ["pregunta like ?", patron]}).then(
                function (quizes){
                        res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
                    }).catch(function(error){next(error)});
        }
        else
        {
            console.log("No tengo SEARCH");
            models.Quiz.findAll().then(
                    function (quizes){
                        res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
                    }).catch(function(error){next(error)});
        }
    };
    


// GET quizes/show
exports.show = 
    function(req, res){
        res.render('quizes/show', {quiz: req.quiz, errors:[]});        
    };
    
// GET quizes/answer
exports.answer = 
    function(req, res){
        var resultado = "Incorrecto";
        if (req.query.respuesta === req.quiz.respuesta)
        {   
            resultado = "Correcto";
        }
        res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado, errors:[]});
    };

// GET quizes/edit 
exports.edit = 
    function(req, res){
      // Compone objeto 'quiz' a partir del recibido
      var quiz = req.quiz;
      res.render('quizes/edit', {quiz: quiz, errors:[]});
    };
    
// PUT quizes/:Id
exports.update = 
    function(req, res){
      // Sobreescribimos el contenido del objeto 'quiz' con los parámetros del cuerpo/body de la peticion
      req.quiz.pregunta = req.body.quiz.pregunta;
      req.quiz.repuesta = req.body.quiz.respuesta;
      
      req.quiz
      .validate()
      .then(
          function(err){
              if (err){
                res.render('quiz/edit', {quiz:req.quiz, errors:err.errors});
              }
              else{
                req.quiz.save({fields:["pregunta", "respuesta"]}).then(function(){res.redirect('/quizes')});
              }
          });
    };    