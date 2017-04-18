'use strict';

// We initialize the extension when Chrome start
initExtension()

// Functions
function initExtension() {
  // We send the message that the extension has been detected
  window.postMessage({name: 'webVrExtensionDetected'}, '*');

  // And we add a listener on any message
  window.addEventListener("message", function(message){
    switch (message.data.name) {
      case 'webVrDetectExtension':
        window.postMessage({ name: 'webVrExtensionDetected' }, '*')
      break;
      case 'webVrStartCasting':
        var newScreenId = event.data.newScreenId;
        chrome.runtime.sendMessage({ action: 'startCasting' }, function(id) {
          window.postMessage({ name: 'webVrCasting', id: id, newScreenId: newScreenId }, '*')
        })
      break;
      case 'webVrStopCasting':
        chrome.runtime.sendMessage({ action: 'stopCasting' })
      break;
    }
  }, false);
}