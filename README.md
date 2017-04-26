# WebScreenVR (Developer Version)

*WebScreenVR is still in Developer Version which means that installing and using it requires some advanced knowledge and it may contains bugs.*

**It only works with Oculus Rift for the moment**

### What is WebScreenVR ?
[![IMAGE ALT TEXT](http://img.youtube.com/vi/qfFrcjQn-0A/0.jpg)](https://www.youtube.com/watch?v=qfFrcjQn-0A "WebScreenVR - Poc 2")

The goal of **WebScreenVR** is to enhance your workspace while in Virtual Reality, allowing you to cast your screen and different applications around you in a 3D environment.

### How to install it? 

#### 1. Share screen

* On Chrome: 

Sharing the screen on **Chrome** require an **extension** to allow screen casting. Go on Extensions and enable the developer mode then click on "`Load unpacked extension`" and select the "`WebScreen-Extension`" folder.

* On Firefox: 

Firefox natively allow screensharing but doesn't allow more than one stream (*two thanks to a little trick visible in **core.js** *).
 

#### 2. Setting up local HTTPS environment

The **Chrome extension** require the usage of **HTTPS** even on localhost in order to allow access to the **desktopCapture API**, therefore setting up a local secured environment is necesary. One pre-made solution is delivered in this git using **NodeJS** and **Express** but if you want to use yours, feel free. 

Just open a terminal in the folder and type `npm install && node webserver.js` which will install express and run the local web server on **HTTP** and **HTTPS** using the already existing SSL certificates. 

#### 3. Set up an hostname

Additionnally the **Chrome extension** does not take `localhost` or `127.0.0.1` as an authorized hostname so we will to create our own. Open your `host.conf` file and add `127.0.0.1 webscreenvr.dev`. 

#### 4. Launching it!

When you have finally set up the whole development environment, you can just access WebScreenVR by going on `https://webscreenvr.dev` (do not forget to start the web server)!

### How to use it?

Once you have shared the initial screen and you are inside the VR view with your controllers visible here are the commands: 

* **Grip**: Toggle "construction mode"
* **A**: 
    * Add screen (*in "construction mode*)
    * Target an existing screen and stay pressed on A to move it
* **X**: 
	* Enhance size of the selected screen
	* Go to next environment sphere
* **Y**: 
	* Reduce size of the selected screen
	* Go to previous environment sphere
* **Thumbstick**: Teleport yourself
* **Left trigger**: 
	* Show environments sphere on first press
	* Change environment on second press

### How to contribute

Whatever you feel adding would be great. Additionnally feel free to help on the "*what is really next*" features as well.

* Have an idea or take an idea in the list below
* Write code
* Send a PR
* Drink champagne

### What is really next?

* Debug the resizing functionality (dimensions are not good)
* Add curves?
* Compatibility with Vive
* Multiplayer (using WebRTC)
* Other things as well


