var RealTouch = function() {
  var comms;

  var init = function(aComms) {
    comms = aComms;
  };

  var connect = function() {
    comms.connect('localhost', 4506, onOpen, onData);
  };

  var onOpen = function() {
    sendHello();
  };

  var onData = function(data) {
    console.log(data);
  };

  var sendHello = function() {
    comms.send('HELLO Realtouch.js');
  };

  var setHeat = function(mag) {
    var str = '@ H ' + mag.toString();
    comms.send(str);
  };

  var fireLube = function(mag, dur) {
    var str = '@ L ' + mag.toString() + ' ' + dur.toString();
    comms.send(str);
  };

  var stopMovement = function(axis) {
    var str = '@ S ' + axis;
    comms.send(str);
  };

  var vectorMovement = function(mag, axis, dir, dur, inMag,
                                inDur, outMag, outDur) {
    var str = '@ V ' +
          mag.toString() + ' ' +
          axis + ' ' +
          dir + ' ' +
          dur.toString();
    if (inMag && inDur && outMag && outDur) {
      str += ' ' + inMag.toString() + ' ' +
        inDur.toString() + ' ' +
        outMag.toString() + ' ' +
        outDur.toString();
    }
    comms.send(str);
  };

  var periodicMovement = function(period, mag, axis, dir, dur, inMag,
                                  inDur, outMag, outDur) {
    var str = '@ P ' +
          period.toString() + ' ' +
          mag.toString() + ' ' +
          axis + ' ' +
          dir + ' ' +
          dur.toString();
    if (inMag && inDur && outMag && outDur) {
      str += ' ' + inMag.toString() + ' ' +
        inDur.toString() + ' ' +
        outMag.toString() + ' ' +
        outDur.toString();
    }
    comms.send(str);
  };

  return {
    init: init,
    connect: connect,
    setHeat: setHeat,
    fireLube: fireLube,
    stopMovement: stopMovement,
    vectorMovement: vectorMovement,
    periodicMovement: periodicMovement,
    DirEnum: {
      IN: 'IN',
      OUT: 'OUT'
    },
    AxisEnum: {
      BOTH: 'U',
      TOP: 'T',
      BOTTOM: 'B',
      SQUEEZE: 'S'
    },
    StopEnum: {
      BOTH: 'U',
      TOP: 'T',
      BOTTOM: 'B',
      SQUEEZE: 'S',
      HEAT: 'H',
      LUBE: 'L',
      ALL: 'A'
    }
  };
};

var RealTouchMozTCPSocketConnector = (function() {
  var socket;
  var cb;

  var ondata = function(data) {
    if(cb) {
      cb(data.data);
    }
  };

  var connect = function(host, port, onopen, ondatacb) {
    socket = navigator.mozTCPSocket.open(host, port);
    socket.ondata = ondata;
    socket.onopen = onopen;
    cb = ondatacb;
  };

  var send = function(str) {
    console.log(str);
    socket.send(str);
    socket.send('\n');
  };

  return {
    connect: connect,
    send: send
  };
}());

var RealTouchWebSocketConnector = (function() {
  var socket;

  var connect = function(host, port, onopen, ondata) {
  };

  var send = function(str) {
  };

  return {
    connect: connect,
    send: send
  };
}());

