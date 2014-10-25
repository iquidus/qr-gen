var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var settings = require('../lib/settings');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'QRGen', address: settings.address});
});

router.get('/:string', function(req, res) {
  if (req.param('string')) {
    var address = qr.image(req.param('string'), { 
    	type: settings.format, 
    	size: settings.size, 
    	margin: settings.margin, 
    	ec_level: settings.ec_level 
    });
    res.type(settings.format);
    address.pipe(res);
  }
});

module.exports = router;
