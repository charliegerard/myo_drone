Description
=======================

Control a Parrot AR Drone using a Myo armband and display video & control visualization in browser.

How to Fly
=======================

1. Clone this repo and run 'npm install' and then 'node server.js'
2. To takeoff, execute the 'fingers spread' gesture.
3. Wave your hand left or right to change the drone's direction.
4. To land, execute the 'fist' gesture.

Stack
=======================

Node.js for server
Express for web app deployment
Faye for publishing and subscribing between leap, server and drone
Myo.js for converting the Myo commands in Javascript
jQuery for browser displays

Learn More
=======================

Coming soon - blog post explaining how I did this.

Next steps
=======================

Improve the commands to have the 'stop' and 'rotate' command available.
