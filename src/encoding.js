function transformData(mode, algorythm, callback){
    var key = getKey(mode, algorythm);
    if (!key){
      return;
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = sheet.getDataRange().getValues();
  
    var newData = new Array();
    for(i in data){
      var row = data[i];
      for (var j=0; j<row.length; j++){
        if (row[j].length > 0){
		  try{
			row[j] = callback(row[j], key);
		  }
		  catch(e){
            if (e.message = "Error: Malformed UTF-8 data"){
              var ui = SpreadsheetApp.getUi().alert("Incorrect password or decrypt method");
              return;
            }
            else{
              throw e;
            }
		  }
        }
      }
  
      newData.push(row);
    }
    
    var range = sheet.getDataRange().getA1Notation();    
    sheet.getDataRange().clearContent();
    sheet.getRange(range).setValues(newData);
};


function encodeAES(cell, key){
  return CryptoJsLib.CryptoJS.AES.encrypt(cell, key).toString();
};

function encodeTripleDES(cell, key){
  return CryptoJsLib.CryptoJS.TripleDES.encrypt(cell, key).toString();
};

function decodeAES(cell, key){
    return CryptoJsLib.CryptoJS.AES.decrypt(cell, key).toString(CryptoJsLib.CryptoJS.enc.Utf8)
};

function decodeTripleDES(cell, key){
    return CryptoJsLib.CryptoJS.TripleDES.decrypt(cell, key).toString(CryptoJsLib.CryptoJS.enc.Utf8)
};