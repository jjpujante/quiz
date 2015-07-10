var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', 
                        texto: 'El portal donde podrá crear sus propios juegos!'
                       });
  //res.render('index', { texto: 'El portal donde podrá crear sus propios juegos!' });
  // dejo esta línea comentada como recordatorio de cómo pasar varios parámetros... ojo
});

// añado los controladores de url para las preguntas y respuestas
// a cada "carpeta" le relaciono un método/función del controlador
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

// Ejercicio Modulo6. Apartado 2)
// añadir acceso a la página de view/author en la ruta "/author"
router.get('/author', function(req, res) {
  res.render('creditos');// llamamos a renderizar creditos.ejs sin parámetros
});

module.exports = router;
