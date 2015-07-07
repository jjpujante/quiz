var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
  res.render('index', { texto: 'El portal donde podrá crear sus propios juegos!' });
});

module.exports = router;
