var path = require("path");

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar el modelo ORM
var Sequelize = require("sequelize");

// usar BBDD SQLite
var sequelize = new Sequelize(
                        DB_name, 
                        user, 
                        pwd, 
                        {dialect: protocol, 
                         protocol: protocol,
                         port: port,
                         host: host,
                         storage: storage,
                         omitNull: true
                        });

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
                        Quiz.create({pregunta:'Capital de España', respuesta: 'Madrid'});
                    }
                    
                }); 
        });