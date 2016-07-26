var express = require('express');
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('index.html');
});

router.post('/', function(req, res, next) {
  var list = req.body.list;
  var graph = req.body.graph;
  // console.log(list);
  fs.writeFile("./public/ajax/mainlist.json", JSON.stringify(list), function(err) {
    if(err) {
        return console.log("Couldnt write to mainlist");
    }
});

fs.writeFile("./public/ajax/graphdata.json", JSON.stringify(graph), function(err) {
  if(err) {
      return console.log("Couldnt write to graph");
  }
});

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Write Successful');
    // console.log(res);

});

module.exports = router;
