function onOpen() {
    var ui = SpreadsheetApp.getUi();

    ui.createAddonMenu()
        .addSubMenu(ui.createMenu('Encode')
            .addItem('DES', 'desEncoding')
            .addItem('AES', 'aesEncoding'))
        .addSeparator()
        .addSubMenu(ui.createMenu('Decode')
            .addItem('DES', 'desDecoding')
            .addItem('AES', 'aesDecoding'))
        .addToUi();   
  };
  
function desEncoding(){
    var key = getKey();
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j].length > 0){
                  Logger.log(row[j]);
          Logger.log(j);
          row[j] = CryptoJsLib.CryptoJS.TripleDES.encrypt(row[j], key).toString();
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
          Logger.log(newData.join());
    sheet.getRange(range).setValues(newData);
};

function aesEncoding(){
    var key = getKey();
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j].length > 0){
                  Logger.log(row[j]);
          Logger.log(j);
          row[j] = CryptoJsLib.CryptoJS.AES.encrypt(row[j], key).toString();
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
          Logger.log(newData.join());
    sheet.getRange(range).setValues(newData);
};

function desDecoding(){
    var key = getKey();
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j].length > 0){
          row[j] = CryptoJsLib.CryptoJS.TripleDES.decrypt(row[j], key).toString(CryptoJsLib.CryptoJS.enc.Utf8);
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
          Logger.log(newData.join());
    sheet.getRange(range).setValues(newData);
};

function aesDecoding(){
  var key = getKey();
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j].length > 0){
          row[j] = CryptoJsLib.CryptoJS.AES.decrypt(row[j], key).toString(CryptoJsLib.CryptoJS.enc.Utf8);
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
          Logger.log(newData.join());
    sheet.getRange(range).setValues(newData);
   
};

function getKey(){ 
  var key = "test Password 1";
  key = CryptoJsLib.CryptoJS.MD5(key).toString();
  key +=  key.substring(1, 16);
  Logger.log(key);

  return key;
};

function encode(){
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
    var key = 18.39585316134316;
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j]){
          row[j] = transformData(row[j], key);
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
          Logger.log(newData.join());
    sheet.getRange(range).setValues(newData);
  };
  
  
  function decode(){
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
    var key = 18.39585316134316;
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j]){
          row[j] = transformData(row[j], key);
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
          Logger.log(newData.join());
    sheet.getRange(range).setValues(newData);
  };
  
  function transformData(data, key){
    var res = "";
    for(var i=0; i< data.length; i++) {
      res = res + String.fromCharCode(data.charCodeAt(i) ^ key);
    }
    return res;
  };