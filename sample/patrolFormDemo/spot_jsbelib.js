
  // ********************************************************************
  //
  // Spot Beacon Event Library for JavaScript (spot_jsbelib.js)
  //
  // KKlabs Inc.
  //
  // Author: Geoffrey Wang
  // v1.5.1215  (2015/12/15)
  // 
  // resivion:
  //
  //   v1.5.1215 Fix init beacon string uridecoder
  //   v1.4.1126 Add beacon string parsing error message
  //   v1.3.0529 Support Camera API
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
    var userPhotoRec=null;
    var custometToken="";
    var custometPhoto="";
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

    // [NEW v1.3] public API: set callback function on receive camera photo
    //
    // A photo data will pass back to callback function:
    //
    // callbackfunction( <string> )
    //
    //

    this.requestPhotoCamera = function (w,h,resultback)
    {
        var imageSizeWidth=0;
        var imageSizeHeight=0;

        if(resultback!=null)
          userPhotoRec = resultback;
        else
          userPhotoRec =null;

        if(!isNaN(w) && !isNaN(h))
        {
          imageSizeWidth = Math.round(Number(w));
          imageSizeHeight = Math.round(Number(h));
        }

        console.log("takePhoto?"+imageSizeWidth+","+imageSizeHeight);

        if( getURLParameter("simu")=="null" && ( navigator.userAgent.search('Android')!=-1 || navigator.userAgent.search('iPhone')!=-1 || navigator.userAgent.search('iPad')!=-1 ) )
        {
              location.href="viaduct://takePhoto?"+imageSizeWidth+","+imageSizeHeight;
        }


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
        processBeaconData(decodeURIComponent(location.hash.slice(1)));

        $(window).on('hashchange', processBeaconData , function(e){ 
            var that = e.data;
            var beaconString = decodeURIComponent(location.hash.slice(1));         
            that(beaconString);
        });
    };

    //public API: driectly update beacon (for testing purpose)
    this.updateBeaconData = function(beaconString)
    {
      processBeaconData(decodeURIComponent(beaconString));
    }

    // *************************************
    // *
    // * Private Functions
    // *
    // *************************************

    // get URL parameter

    function getURLParameter (name) 
      {
        return decodeURI(
                  (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
              );
      };


    // private: process the beacon event
    var processBeaconData = function (beaconString)
    {

      var receviedData={};
      var receviedCustometToken="";
      var receviedCustometPhoto="";

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

        if(receviedData.hasOwnProperty("pt"))
          receviedCustometPhoto = receviedData.pt;

        

        if(receviedCustometPhoto != custometPhoto)
        {
            
            custometPhoto = receviedCustometPhoto;

            if(userPhotoRec!=null)
            {
              
              if(custometPhoto!="0" && custometPhoto!="")
                 userPhotoRec("data:image/jpg;base64,"+custometPhoto);
               else
                 userPhotoRec("0");
            }
        }

      } catch (e) {
        console.log("beaconString parse error");
        beaconData = [];
      }

      if(userCallBeacon!=null)
        userCallBeacon(beaconData)
    }



  }


  