# WebScreenVR (Developer Version)

*WebScreenVR is still in Developer Version which means that installing and using it requires advanced knowledge and it may contains bugs.*

**It only works with Oculus Rift for the moment**

### What is WebScreenVR ?
[![IMAGE ALT TEXT](http://img.youtube.com/vi/qfFrcjQn-0A/0.jpg)](https://www.youtube.com/watch?v=qfFrcjQn-0A "WebScreenVR - Poc 2")
It is a replica of BigScreen but using web technologies. It allows you to have multiple screens where you can cast your desktop and applications in a 3D environment. 

### How to install it? 

#### 1. Chrome Extension 

WebScreenVR require a **Chrome extension** to allow screen casting. Go on Extensions and enable the developer mode then click on "`Load unpacked extension`" and selected the "`WebScreen-Extension`" folder. 

#### 2. Setting up local HTTPS environment

The **Chrome extension** require the usage of **HTTPS** even on localhost in order to allow access to the **desktopCapture API**, therefore setting up a local secured environment is necesary. One pre-made solution is delivered in this git using **NodeJS and Express** but if you want to use yours, feel free. 

Just open a terminal in the folder and type `npm install && node webserver.js` which will run the local web server on **HTTP** and **HTTPS** using the already existing SSL certificates. 

#### 3. Set up an hostname

Additionnally the **Chrome extension** doesn't take `localhost` or `127.0.0.1` as an authorized hostname so you open your `host.conf` file and add `127.0.0.1 webscreenvr.dev` 

#### 4. Launching it!

When you have finally set up the whole development environment, you can just access WebScreenVR by going on `https://webscreenvr.dev`!

### How to use it?

Once you've shared the initial screen and you're inside the VR view with your controller visible here are the commands: 

* **Grip**: Toggle "construction mode"
* **A**: 
    * Add screen (*in "construction mode*)
    * Target an existing screen and stay pressed on A to move it
* **X**: Enhance size of the selected screen
* **Y**: Reduce size of the selected screen
* **Thumbstick**: Teleport yourself

### How to contribute

Whatever you feel adding would be great. Feel free to help on the "*what is really next*" features as well. 
* Have an idea or take an idea in the list below
* Write code
* Send a PR
* Drink champagne

### What is really next?

* Change environment
* Debug the resizing functionality (dimensions are not good)
* Add curves? 
* Compatibility with Vive
* Multiplayer (using WebRTC)
* Other things as well


