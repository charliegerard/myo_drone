  var express, path, drone, server, app, faye, client, morgan, methodOverride, myo;

  express = require("express");
  morgan = require("morgan");
  bodyParser = require("body-parser");
  methodOverride = require('method-override');
  path = require("path");
  http = require('http');
  faye = require('faye');
  myo = require ('myo');
  drone = require("ar-drone").createClient();
  require("dronestream").listen(3001);
  app = express();

var env = process.env.NODE_ENV || 'development';
if('development' == env){
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(__dirname + '/public'));
  app.use("/node_modules", express.static(path.join(__dirname, 'node_modules')))
}

  server = require('http').createServer(app);

  var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 50
  });

  bayeux.attach(server);

  client = new faye.Client("http://localhost:" + (app.get("port")) + "/faye", {});

  client.subscribe("/drone/move", function (d) {
    console.log(d);
    console.log("drone move?")
    return drone[d.action](d.speed);
  });

  client.subscribe("/drone/drone", function (d) {
    console.log(d);
    console.log("drone stuff")
      return drone[d.action]();
  });

  server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get("port"));
  })
