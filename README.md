spot-jsbelib
============

The purpose of the javascript library is providing the event driven beacon framework, trigged by beacons and thier distance around user's device.

www.spot.ms


Installation
------------

This library only depends on jQurey library. Developers would include the jQuery library and spot-jsbelib.js in the HTML header, like this:

<code>
<script	type="text/javascript" src="jquery.min.js"></script>	
<script type="text/javascript" src="spot_jsbelib.js"></script>
</code>

Usage
-----

Create the instance.
<code>
var beaconManager=new spotJsBEL();
</code>

Set the evnet handler.
<code>
var beaconHandler = function(beaconArray) { }; 
beaconManager.onBeaconChanged(beaconHandler);
</code>

Initialize the instance after dom ready.
<code>
$(window).ready(function() {
	beaconManager.init();
};
</code>

Beacon Array
------------

When beacon changed event callback function called, it passed a beacon array as parameter.

beacon array contains json objects to preset the deteced beacon data:
{id:<String>, name: <String>, px: <Number> }
* id and name: using by Spot cloud service, or your own defination.
* px: based on Apple's iBeacon specification, proximity values indicate:
	* 0 : Unknown (> 30 m )
    * 1 : Immediate (< 50 cm)
    * 2 : Near (< 2 m)
    * 3 : Far (< 30 m)

Notice: You may not get the px value 0, when beacon is far away and then no more exist in the array list.


Testing your Code
-----------------

You can use the function updateBeaconData in the browser's console to update the beacon array manually, if you don't have beacon hardware.
An [example code on jsfiddle](http://jsfiddle.net/kklabs/J6B2Z/), input the following javascript in browser's console (target to jsfiddle's iframe)
<code>
beaconManager.updateBeaconData('{"b":[{"id":"1-1-1", "name":"test", "px":2}],"d":true,"o":true}');
</code>


