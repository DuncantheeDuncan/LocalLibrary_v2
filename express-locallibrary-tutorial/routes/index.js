var express = require('express');
var router = express.Router();

/* GET home page. that will be redirected to catalog*/
router.get('/', function(req, res) {
    res.redirect('/catalog');

});


module.exports = router;
