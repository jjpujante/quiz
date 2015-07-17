var models = require("../models/models");

// GET quizes/
exports.index = 
    function(req, res){
        models.Quiz.findAll().then(
                function (quizes){
                    res.render('quizes/index.ejs', {quizes: quizes});
                });
    };
    


// GET quizes/show
exports.show = 
    function(req, res){
        models.Quiz.findAll().success(
            function(quiz){
                res.render('quizes/show', {quiz: quiz});        
            });
    };
    
// GET quizes/answer
exports.answer = 
    function(req, res){
        models.Quiz.find(req.params.quizId).then(
            function(quiz){
                if (req.query.respuesta === quiz.respuesta)
                {
                    res.render('quizes/answer', {quiz:quiz, respuesta: 'Correcto'});
                }
                else
                {
                    res.render('quizes/answer', {quiz:quiz, respuesta: 'Incorrecto'});
                }
            });
    };
    
/*
// Dejo comentado el código previo que creaba la pregunta de forma estática
// GET quizes/question
exports.question = 
    function(req, res){
        res.render('quizes/question', {pregunta: 'Capital de Italia'});
    };
    
// GET quizes/answer
exports.answer = 
    function(req, res){
        if (req.query.respuesta == 'Roma')
        {
            res.render('quizes/answer', {respuesta: 'Correcto'});
        }
        else
        {
            res.render('quizes/answer', {respuesta: 'Incorrecto'});
        }
    };
    
*/