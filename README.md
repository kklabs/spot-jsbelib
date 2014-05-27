spot-jsbelib
============

The purpose of the javascript library is to provide developers the event driven framework.  "The beacon event" is trigged by distance changes between beacons and user’s mobile devices.  

www.spot.ms


Installation
------------

This library only depends on jQurey library. Developers would include the jQuery library and spot-jsbelib.js in the HTML header, like this:

	<script	type="text/javascript" src="jquery.min.js"></script>	
	<script type="text/javascript" src="spot_jsbelib.js"></script>

Usage
-----

Create the instance.

	var beaconManager=new spotJsBEL();

Set the event handler.

	var beaconHandler = function(beaconArray) {
		// Do-Something with beaocn array
	};
	beaconManager.onBeaconChanged(beaconHandler);


Initialize the instance after dom ready.

	$(window).ready(function() {
		beaconManager.init();
	};

Beacon Array
------------

When callback function of "the beacon event"  is called, a beacon array is passed as a parameter.

Beacon array contains json objects which comprises the detected beacon data:

	{id:<String>, name: <String>, px: <Number> }

* id and name: by your own definition or assigned by Spot Project Hub
* px: based on Apple's iBeacon specification, proximity values indicate:
	* 0 : Unknown (> 30 m )
    * 1 : Immediate (< 50 cm)
    * 2 : Near (< 2 m)
    * 3 : Far (< 30 m)

Notice: You may not get the px value 0 if the beacon is far away and json object is no longer in existence in the beacon array.


Testing your Code
-----------------

You can use the function updateBeaconData in the browser's console to update the beacon array manually, if you don't have beacon hardware.
Navigate [example code on jsfiddle](http://jsfiddle.net/kklabs/J6B2Z/), and input the following javascript in browser's console (target to jsfiddle's iframe)

	beaconManager.updateBeaconData('{"b":[{"id":"1-1-1", "name":"test", "px":2}],"d":true,"o":true}');



