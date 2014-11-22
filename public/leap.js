var controller, flying, speed, faye, timeout, speedAdjuster, stopped, myo;

var droneCommandsHandler = function () {
  myo = Myo.create(0);

  myo.on('fingers_spread', function(){
    takeoff();
    console.log('takeoff');
  });

  myo.on('wave_in', function(){
    goLeft();
  })

  myo.on('wave_out', function(){
    goRight();
  })

  myo.on('fist', function(){
    console.log('land');
    land();
  })

  faye = new Faye.Client("/faye", {
    timeout: 60 // may need to adjust. If server doesn't send back any data for the given period of time, the client will assume the server has gone away and will attempt to reconnect. Timeout is given in seconds and should be larger than timeout on server side to give the server ample time to respond.
  });

  flying = false; // used to prevent action while drone is dormant
  timeout = 400;  // used for each server publish
  speedAdjuster = 2.5; // higher number decreases action speed.  DO NOT set to less than 1


  var takeoff = function () {
  	flying = true;
  	return faye.publish("/drone/drone", {
      action: 'takeoff'
    });
  };

  var land = function () {
  	flying = false;	// prevents faye from publishing actions when drone has landed
  	return faye.publish("/drone/drone", {
      action: 'land'
    });
  };

  var goLeft = function(){
    console.log('going left');
    stopped = false;
    $(".left").attr({id: 'highlight'})
    $(".right").attr({id: ''})
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'left'
        // speed: adjustXspeed
      })
    }, timeout);
  };

  var goRight = function(){
    console.log('going right');
    stopped = false;
    $(".right").attr({id: 'highlight'})
    $(".left").attr({id: ''})
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'right'
            // speed: adjustXspeed
      })
    }, timeout);
  };

  var goUp = function(){
    stopped = false;
    $(".up").attr({id: 'highlight'})
    $(".down").attr({id: ''})
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'up'
        // speed: adjustYspeed
      })
    }, timeout/2);
  };

  var goDown = function(){
    stopped = false;
    $(".down").attr({id: 'highlight'})
    $(".up").attr({id: ''})
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'down'
        // speed: adjustYspeed
      })
    }, timeout/2);
  };

  var goForward = function(){
    console.log('going forward');
    stopped = false;
    $(".front").attr({id: 'highlight'})
    $(".back").attr({id: ''})
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'front'
        // speed: adjustZspeed
      })
    }, timeout/3);
  };

  var goBackwards = function(){
    stopped = false;
    $(".back").attr({id: 'highlight'})
    $(".front").attr({id: ''})
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'back'
        // speed: adjustZspeed
      })
    }, timeout/3);
  };

  var stopDrone = function(){
    console.log('stooooooooop')
    stopped = true;
    setTimeout(function (){
      return faye.publish("/drone/drone", {
        action: 'stop'
      })
    }, timeout);
  };


  speed = 0.5; // used for rotation speed
  var counterClockwise = function () {
    $(".counterClockwise").attr({id: 'highlight'})
    $(".clockwise").attr({id: ''})
    faye.publish("/drone/move", {
      action: 'counterClockwise',
      speed: speed
    })
    setTimeout(function (){
      return faye.publish("/drone/drone", {
        action: 'stop'
      })
    }, timeout);
  };

  var clockwise = function () {
    $(".clockwise").attr({id: 'highlight'})
    $(".counterClockwise").attr({id: ''})
    faye.publish("/drone/move", {
      action: 'clockwise',
      speed: speed
    })
    setTimeout(function (){
      return faye.publish("/drone/drone", {
        action: 'stop'
      })
    }, timeout);
  };

};

droneCommandsHandler();