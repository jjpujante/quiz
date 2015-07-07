var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
  res.render('index', { texto: 'El portal donde podrá crear sus propios juegos!' });
});

// añado los controladores de url para las preguntas y respuestas
// a cada "carpeta" le relaciono un método/función del controlador
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
