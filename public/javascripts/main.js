var ge;
var kml;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);
}

function base_setup(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);
  
  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

}

function initCallback(instance) {
  base_setup(instance);

  var data = document.getElementById('main_data');
  kml = ge.parseKml(data.value);
  ge.getFeatures().appendChild(kml);
  
  setEventListener();
}

function setEventListener(){
  //set a click listener that affects all placemarks
  google.earth.addEventListener(
    ge.getGlobe(), 'click', function(event) {
      var obj = event.getTarget();
      if (obj.getType() == 'KmlPlacemark'){
        event.preventDefault();
  
        var placemark = obj;
        var content = placemark.getDescription();
        var balloon = ge.createHtmlStringBalloon('');
        balloon.setFeature(placemark);
        balloon.setContentString(content);
        ge.setBalloon(balloon);
      }
    }
  );    
}

//一時的なイベント用
function buttonClick1(){
    move('test3');
}

function buttonClick3(){
    move('test1');
}

function move(id){
    var la = ge.createLookAt('lookat_' + String(id));
    var geo = kml.getElementById(id).getGeometry();
    la.set(geo.getLatitude(), geo.getLongitude(), geo.getAltitude(), ge.ALTITUDE_RELATIVE_TO_GROUND, 100, 45, 75);
    var beginTime = kml.getElementById(id).getTimePrimitive().getBegin().get();
    var time = ge.createTimeStamp('time_' + String(id));
    time.getWhen().set(beginTime);
    la.setTimePrimitive(time);
    ge.getView().setAbstractView(la);
}

function getTime(){
    return getTimePrimitive().getWhen().get();
}

function setTime(time){
    var timePrimitive = getTimePrimitive();
    timePrimitive.getWhen().set(time);
    setTimePrimitive(timePrimitive);
}

function getTimePrimitive(){
    return ge.getTime().getTimePrimitive();
}

function setTimePrimitive(time){
    ge.getTime().setTimePrimitive(time);
}

var dumpObj = function(o){
    var str = "";
    for(var i in o) {
        str = str + i + " : " + o[i] + "\n";
    }
    alert(str);
};

function addSampleButton(caption, clickHandler) {
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.value = caption;

    if (btn.attachEvent)
        btn.attachEvent('onclick', clickHandler);
    else
        btn.addEventListener('click', clickHandler, false);

    // add the button to the Sample UI
    document.getElementById('sample-ui').appendChild(btn);
}

function addSampleUIHtml(html) {
    document.getElementById('sample-ui').innerHTML += html;
}

function failureCallback(errorCode) {
}

