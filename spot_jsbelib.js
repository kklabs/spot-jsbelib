
  // ********************************************************************
  //
  // Spot Beacon Event Library for JavaScript (spot_jsbelib.js)
  //
  // KKlabs Inc.
  //
  // Author: Geoffrey Wang
  // v1.2.0213  (2015/2/13)
  // 
  // resivion:
  //
  //   v1.2.0213 Support CustomUserId
  //   v1.1.0822 Fix uriencode issue 
  //   v1.0.0526 Initial Public Release
  //
  //  This library is under Apache License, Version 2.0 , 
  //    http://www.apache.org/licenses/LICENSE-2.0 
  //
  //  Please refer to http://www.spot.ms for detail.
  //
  // ********************************************************************


  function spotJsBEL()
  {

    var isBeaconSupport=0;
    var isBTurnOn=0;
    var userCallBeacon = null;
    var userUidRec=null;
    var custometToken="";
    var beaconData=[];

    this.ConstProximityUnknown=0;
    this.ConstProximityImmediate=1;
    this.ConstProximityNear=2;
    this.ConstProximityFar=3;

    // *************************************
    // *
    // * Public Functions
    // *
    // *************************************

    // public API: get Bluetooth 4.0 support status
    this.isBLESupport = function()
    {
      if(isBeaconSupport==1)
        return true;
      else
        return false;
    }

    // public API: get Bluetooth device status
    this.isBTurnOn = function()
    {
      if(isBTurnOn==1)
        return true;
      else
        return false;
    }

    // public API: set callback function on beacon changed event
    //
    // A beaconArray will pass back to callback function:
    //
    // callbackfunction( beaconArray )
    //
    //  beaconArray contains json objects for detected each beacon 
    //  {id:<String>, name: <String>, px: <Number> }
    //
    this.onBeaconChanged = function ( callbackfunction )
    {
      userCallBeacon=callbackfunction;
    }


    // [NEW v1.2] public API: set callback function on receive custom user id 
    //
    // A customUserId will pass back to callback function:
    //
    // callbackfunction( <string> )
    //
    //
    this.onCustomUserIdReceived = function ( callbackfunction )
    {
      userUidRec=callbackfunction;
    }

    // public API: get current beaconArray 
    //
    // same structure as onBeaconChanged callback function  
    //
    this.getBeaconArray = function()
    {
      return beaconData;
    }

    // public API: initialize the beacon service (via hashchange event)
    this.init = function ()
      {        
        processBeaconData(location.hash.slice(1));

        $(window).on('hashchange', processBeaconData , function(e){ 
            var that = e.data;
            var beaconString = decodeURIComponent(location.hash.slice(1));         
            that(beaconString);
        });
    };

    //public API: driectly update beacon (for testing purpose)
    this.updateBeaconData = function(beaconString)
    {
      processBeaconData(beaconString);
    }

    // *************************************
    // *
    // * Private Functions
    // *
    // *************************************


    // private: process the beacon event
    var processBeaconData = function (beaconString)
    {

      var receviedData={};
      var receviedCustometToken="";
      
      try {
        receviedData = JSON.parse(beaconString);
        beaconData = receviedData.b;
        isBeaconSupport = receviedData.d;
        isBTurnOn = receviedData.o;

        if(receviedData.hasOwnProperty("t"))
          receviedCustometToken = receviedData.t;

        if(receviedCustometToken != custometToken)
        {
            custometToken = receviedCustometToken;

            if(userUidRec!=null)
              userUidRec(custometToken);
        }

      } catch (e) {
        beaconData = [];
      }

      if(userCallBeacon!=null)
        userCallBeacon(beaconData)
    }



  }


  