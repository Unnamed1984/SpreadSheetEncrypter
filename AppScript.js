function onOpen() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var subMenus = [{name: "Зашифровать", functionName: "encode"}, {name: "Расшифровать", functionName: "decode"}];
  
    sheet.addMenu("SpreadSheetEncoder", subMenus);
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