function getKey(mode, algorythm){ 
  var password = getPassword();
  if (!password){
    return null;
  }
  
  if (mode == "ENCODE"){
    sendPasswordToMail(password, algorythm);
  }
  
  var key = password;
  key = CryptoJsLib.CryptoJS.MD5(key).toString();
  key +=  key.substring(1, 16);

  return key;
};

function getPassword(){
   var ui = SpreadsheetApp.getUi();
   var response = ui.prompt('Password', 'Enter the password', ui.ButtonSet.OK_CANCEL);
  
   if (response.getSelectedButton() == ui.Button.OK && response.getResponseText() != "") {
     return response.getResponseText();
   } 
   else{
     return null;
   }
};