/* System constant */
const SCENE             = document.querySelector("a-scene");
const GLOBAL_CAMERA     = document.querySelector("a-camera");
const LEFT_CONTROLLER   = document.querySelector("#leftController");
const RIGHT_CONTROLLER  = document.querySelector("#rightController");

/* System variables */
var _constructionMode = false;
var _videoSelected    = false;

/* System core */
window.addEventListener("load", function(){

  //#####################//
  /** RIGHT CONTROLLER **/
  //###################//

  RIGHT_CONTROLLER.addEventListener('gripdown', function(evt) {
    toggleConstructionMode();
  });

  RIGHT_CONTROLLER.addEventListener("mousedown", function(evt) {
    if(evt.detail.intersectedEl === null || evt.detail.intersectedEl === undefined) return;
    
    if(evt.detail.intersectedEl.id != "video") return;
    _videoSelected    = evt.detail.intersectedEl;

    // Adjust position
    _adjustedPosition = { x: 0, y: 0, z: -5 }
    _videoSelected.setAttribute('rotation'  , "0 0 0")
    _videoSelected.setAttribute("position"  , AFRAME.utils.coordinates.stringify(_adjustedPosition)) 

    SCENE.removeChild(_videoSelected);
    RIGHT_CONTROLLER.appendChild(_videoSelected);
  })

  RIGHT_CONTROLLER.addEventListener("mouseup", function(evt) {
    if(evt.detail.intersectedEl === null || evt.detail.intersectedEl === undefined) return;

    if(!_videoSelected) return;

    RIGHT_CONTROLLER.removeChild(_videoSelected);
    SCENE.appendChild(_videoSelected);

    _videoSelected.setAttribute("position", evt.detail.intersection.point);
    _videoSelected.setAttribute("rotation", AFRAME.utils.coordinates.stringify(RIGHT_CONTROLLER.components.rotation.data));
    _videoSelected = false;
  });

  // We listen for 'click' event that comes when "construction mode" is active
  RIGHT_CONTROLLER.addEventListener("click", function(evt) {
    if(evt.detail.intersectedEl.id != "creationBox") return;

    // We create a video container
    var newScreenId = generateId(14);
    var newScreen = document.createElement("a-video");
    newScreen.setAttribute("src"      , "");
    newScreen.setAttribute("position" , evt.detail.intersection.point);
    newScreen.setAttribute("width"    , "6");
    newScreen.setAttribute("height"   , "3");
    newScreen.setAttribute("id"       , "video")
    newScreen.setAttribute("class"    , newScreenId)
    newScreen.setAttribute("rotation" , AFRAME.utils.coordinates.stringify(RIGHT_CONTROLLER.components.rotation.data));
    SCENE.appendChild(newScreen);

    toggleConstructionMode();

    window.postMessage({ name: 'webVrStartCasting', newScreenId: newScreenId }, '*')
  });

  //####################//
  /** LEFT CONTROLLER **/
  //##################//

  LEFT_CONTROLLER.addEventListener("Xdown", function(evt) {
    if(!_videoSelected) return;

    _videoSelected.setAttribute("height"  ,   Number(_videoSelected.getAttribute("height")) + 0.5);
    _videoSelected.setAttribute("width"   ,   Number(_videoSelected.getAttribute("width"))  + 0.5);
  })

  LEFT_CONTROLLER.addEventListener("Ydown", function(evt) {
    if(!_videoSelected) return;

    _videoSelected.setAttribute("height"  ,   Number(_videoSelected.getAttribute("height")) - 0.5);
    _videoSelected.setAttribute("width"   ,   Number(_videoSelected.getAttribute("width"))  - 0.5);
  })

  // FUNCTIONS
  function toggleConstructionMode() {
    if(_videoSelected) return; // If the user is moving a screen
    // If the player is not in "construction mode"
    if(!_constructionMode) {
      // We build the blue wireframe
      var wireframe = document.createElement("a-box");
      wireframe.setAttribute('position' , '0 0 -5');
      wireframe.setAttribute('wireframe', 'true');
      wireframe.setAttribute('scale'    , '6 3 0');
      wireframe.setAttribute('color'    , 'blue');
      wireframe.setAttribute('id'       , 'creationBox');
      RIGHT_CONTROLLER.appendChild(wireframe);
    } else { // If the player is already in "construction mode"
      // We remove the blue wireframe and the raycaster
      RIGHT_CONTROLLER.removeChild(document.querySelector("#creationBox"));
    }

    _constructionMode = !_constructionMode; // We toggle the construction mode
  }

  function generateId(length) {
    var chars   = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result  = 'a';
    for (var i  = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
});

// Talking with the Chrome Extension
window.addEventListener("message", function(event) {
  var _eventName = event.data.name;

  // We only accept messages from ourselves
  if (event.source != window) return;

  switch(_eventName) {
    case "webVrCasting":
      var constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: event.data.id,
            maxWidth: window.screen.width,
            maxHeight: window.screen.height
          }
        }
      }

      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.dir(event.data.newScreenId);
        document.querySelector("." + event.data.newScreenId).setAttribute("src", URL.createObjectURL(stream));
      }).catch(function(err) {
        console.log(err);
      });
      break;
    case "webVrExtensionDetected":
      // Initialize the first screen
      window.postMessage({ name: 'webVrStartCasting', newScreenId: "desktop" }, '*')
      break;
  }
});