
  // ********************************************************************
  //
  // Spot Beacon Event Library for JavaScript (spot_jsbelib.js)
  // KKlabs Inc.
  // Author: Geoffrey Wang
  // v0.4 (2014/5/19)
  //
  // resivion:
  //   v0.4:  change name to spot, isBTurnOn event updated
  //   v0.3:  Naming fix
  //   v0.2:  getBeaconArray function Added 
  //   v0.1:  initial 
  //
  //  This library is under Apache License, Version 2.0 , 
  //    http://www.apache.org/licenses/LICENSE-2.0 
  //
  // ********************************************************************


  function spotJsBEL()
  {

    var isBeaconSupport=0;
    var isBTurnOn=0;

    this.ConstProximityUnknown=0;
    this.ConstProximityImmediate=1;
    this.ConstProximityNear=2;
    this.ConstProximityFar=3;

    var userCallBeacon = null;
    var beaconData=[];

    // public API: isBLESupport()
    this.isBLESupport = function()
    {
      if(isBeaconSupport==1)
        return true;
      else
        return false;
    }

    // public API: isBTurnOn()
    this.isBTurnOn = function()
    {
      if(isBTurnOn==1)
        return true;
      else
        return false;
    }

    // public API: user can set beacon changed handler
    this.onBeaconChanged = function ( callbackfunction )
    {
      userCallBeacon=callbackfunction;
    }

    //public API: use by driect update beacon
    this.updateBeaconData = function(beaconString)
    {
      processBeaconData(beaconString);
    }

    // private API: simulate the beacon event
    var processBeaconData = function (beaconString)
    {
      //console.log("**recevied data:"+beaconString);

      var receviedData={};

      try {
        receviedData = JSON.parse(beaconString);
        beaconData = receviedData.b;
        isBeaconSupport = receviedData.d;
        isBTurnOn = receviedData.o;
      } catch (e) {
        beaconData = [];
      }

      if(userCallBeacon!=null)
        userCallBeacon(beaconData)
    }

    // public API: initizie the beacon service
    this.init = function ()
      {        
        processBeaconData(location.hash.slice(1));

        $(window).on('hashchange', processBeaconData , function(e){ 
            var that = e.data;
            var beaconString = location.hash.slice(1);          
            that(beaconString);
        });
    };

    this.getBeaconArray = function()
    {
      return beaconData;
    }

  }


  