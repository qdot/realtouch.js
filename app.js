$(document).ready(function() {

  var rt = RealTouch();
  rt.init(RealTouchMozTCPSocketConnector);

  document.getElementById('connect').addEventListener('click', function() {
    rt.connect();
  });

  document.getElementById('send').addEventListener('click', function() {
    rt.vectorMovement(100, rt.AxisEnum.TOP, rt.DirEnum.IN, 1000);
  });
});
