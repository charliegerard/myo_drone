var controller, flying, speed, faye, timeout, speedAdjuster, stopped, myo;

var droneCommandsHandler = function () {
  myo = Myo.create(0);

  myo.unlock();

  // myo.on('fingers_spread', function(){
  //   takeoff();
  //   console.log('takeoff');
  // });

  myo.on('wave_in', function(){
    // goLeft();
    takeoff();
  })

  myo.on('wave_out', function(){
    // goRight();
    land();
  })

  // myo.on('fist', function(){
  //   console.log('land');
  //   land();
  // })

  faye = new Faye.Client("/faye", {
    timeout: 60
  });

  flying = false;
  timeout = 400;
  speedAdjuster = 2.5;

  var takeoff = function () {
  	flying = true;
  	return faye.publish("/drone/drone", {
      action: 'takeoff'
    });
  };

  var land = function () {
  	flying = false;
  	return faye.publish("/drone/drone", {
      action: 'land'
    });
  };

  var goLeft = function(){
    console.log('going left');
    stopped = false;
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
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'right'
            // speed: adjustXspeed
      })
    }, timeout);
  };

  var goUp = function(){
    stopped = false;
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'up'
        // speed: adjustYspeed
      })
    }, timeout/2);
  };

  var goDown = function(){
    stopped = false;
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
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'front'
        // speed: adjustZspeed
      })
    }, timeout/3);
  };

  var goBackwards = function(){
    stopped = false;
    setTimeout(function (){
      return faye.publish("/drone/move", {
        action: 'back'
        // speed: adjustZspeed
      })
    }, timeout/3);
  };

  var stopDrone = function(){
    console.log('stop')
    stopped = true;
    setTimeout(function (){
      return faye.publish("/drone/drone", {
        action: 'stop'
      })
    }, timeout);
  };


  speed = 0.5; // used for rotation speed
  var counterClockwise = function () {
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
