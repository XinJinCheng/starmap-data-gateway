var express = require('express');
var router = express.Router();

const service = require('../app/service');
const logger = service.getLogger('api.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/enqueue', function(req, res, next) {
  let amqpService = new service.AMPQService();
  let key = req.body.key;
  let message = JSON.stringify(req.body.message);
  amqpService.emitMessage("newjincin.exchange", key, message).then(function(){
    res.sendStatus(200);
  }).catch(function(e){
    res.status(400);
    res.json(e);
  });
});


module.exports = router;
