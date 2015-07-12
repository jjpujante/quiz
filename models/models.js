var path = require("path");

// Cargar el modelo ORM
var Sequelize = require("sequelize");

// usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.lite"});

// Importar la definición de la tabla Quiz que está en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
// La exportamos desde la "clase" models.js
exports.Quiz = Quiz;

// sequelize.sync crea e inicializa la tabla de preguntas en bbdd
sequelize.sync().success(
        function () {
            Quiz.count().success(
                function (count){
                    // Solo si está vacia, contador=0, se inicializa
                    if (count=== 0){
                        Quiz.create({pregunta:'Capital de Italia', respuesta: 'Roma'}).success(function(){console.log("BBDD inicializada");});
                    }
                    
                }); 
        });