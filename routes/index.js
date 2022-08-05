var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _next) {
  res.status(200).send("Express Index page");
});

module.exports = router;
