$.ajax({
    url : 'fetchdata2.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data2){
       var obj2 = jQuery.parseJSON(data2); 
  
      getLatestData(obj2);
    }
});
  
var getLatestData = function(obj2){

    // console.log('-----------data 2 from db-----------------');
    // console.log(obj2);
    
    var tempArr = [];
    var humArr = [];
    var soilTempArr = [];
    var soilMoisArr = [];
    var secArr = [];
    var sphArr = [];
    var snArr = [];
    var spArr = [];
    var skArr = [];
    var bArr = [];
    var siArr = [];
  
    for (let i = 0; i < 6; i++) {
  
      tempArr.push(parseFloat(obj2[i][0]));
      humArr.push(parseFloat(obj2[i][1]));
      soilTempArr.push(parseFloat(obj2[i][2]));
      soilMoisArr.push(parseFloat(obj2[i][3]));
      secArr.push(parseFloat(obj2[i][4]));
      sphArr.push(parseFloat(obj2[i][5]));
      snArr.push(parseFloat(obj2[i][6]))
      spArr.push(parseFloat(obj2[i][7]));
      skArr.push(parseFloat(obj2[i][8]));   
      bArr.push(parseFloat(obj2[i][10]));
      siArr.push(parseFloat(obj2[i][11]));   

    } 
    // console.log('-----------TempArr-----------------');
    // console.log(tempArr);

    validateData('Temprature',tempArr,40,30);
    validateData('Humidity',humArr,120,0);
    validateData('Soil Temprature',soilTempArr,120,0);
    validateData('Soil Moisture',soilMoisArr,60,0);
    validateData('Soil Electrical Conductivity',secArr,60,0);
    validateData('Soil PH',sphArr,9.5,0);
    validateData('Soil Nitrogen',snArr,9.5,0);
    validateData('Soil Phosphorus',spArr,9.5,0);
    validateData('Soil Potassium',skArr,9.5,0);
    validateData('B',bArr,9.5,0);
    validateData('SI',siArr,9.5,0);
};

var validateData = function(checkElement,checkArray, high, low){

  const isAboveThreshold = (currentValue) => currentValue > high;
  const isBelowThreshold = (currentValue) => currentValue < low;
  var aboveStatus = checkArray.every(isAboveThreshold);
  var belowStatus = checkArray.every(isBelowThreshold);

  var status = '';
  if(aboveStatus == true || belowStatus == true){
    if(aboveStatus == true){
      status = 'too high';
    }else if(belowStatus == true){
      status = 'too low';
    }
    // msg="Please check! " +checkElement+" is "+status+" for the palntation.";
    var msg="test123";

    // console.log(msg);
    
    var settings = {
      "url": "http://smeapps.mobitel.lk:8585/EnterpriseSMSV3/esmsproxyURL.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Basic ZXNtc3Vzcl90YWY6dXRZJCU5MXF0",
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "username": "esmsusr_taf",
        "password": "utY$%91qt",
        "from": "AgriAlert",
        //"to": "0710451452",
        "text": msg,
        "mesageType": 1
      }),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }
  aboveStatus =  false;
  belowStatus = false;
  status = '';
}     