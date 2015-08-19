var express = require('express');
var router = express.Router();

var quizController = require   ('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', 
                        texto: 'El portal donde podrá crear sus propios juegos!', 
                        errors:[]
                       });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load); //autoload :commentId

// Rutas de LOGIN
router.get('/login',  sessionController.new); // formulario de login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // finalizar sesión

// añado los controladores de url para las preguntas y respuestas
// a cada "carpeta" le relaciono un método/función del controlador
router.get('/quizes', quizController.index); // 'pantalla' inicio
router.get('/quizes/:quizId(\\d+)', quizController.show); // Muestra la pregunta. antiguo question
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer); // comprueba la respuest

// Requerimos autenticación
router.get('/quizes/new', sessionController.loginRequired, quizController.new); // 'pantalla' nueva pregunta
router.post('/quizes/create', sessionController.loginRequired, quizController.create); // llamda al controlador para registrar la nueva pregunta
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit); // Editar la pregunta
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update); // comprueba la respuest
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy); // Eliminar la pregunta

/** Rutas para los comentarios */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new); // Para crear comentario
router.post('/quizes/:quizId(\\d+)/comments', commentController.create); //  Para registrar comentario
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
                                                sessionController.loginRequired,
                                                commentController.publish); // Para crear comentario

// Ejercicio Modulo6. Apartado 2)
// añadir acceso a la página de view/author en la ruta "/author"
router.get('/author', function(req, res) {
  res.render('creditos', {errors:[]});// llamamos a renderizar creditos.ejs sin parámetros
});

module.exports = router;
