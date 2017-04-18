var pendingRequestId = null

chrome.runtime.onMessage.addListener(function (msg, sender, cb) {
  if (!msg) return true

  switch (msg.action) {
    case 'startCasting':
      pendingRequestId = chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], sender.tab, function (id) {
        cb(id)
      })
      break
    case 'stopCasting':
      if (pendingRequestId != null) {
        chrome.desktopCapture.cancelChooseDesktopMedia(pendingRequestId)
        pendingRequestId = null
      }
      break
    }

  return true
})
