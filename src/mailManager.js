function sendPasswordToMail(password, algorythm){
  var mail = Session.getActiveUser().getEmail();
  var id = SpreadsheetApp.getActiveSpreadsheet().getId();
  
  var subject = "Encoding Google Spreadsheet";
  var message = "Id of spreadsheet - " + id + "\nPassword - " + password +
                    "\nAlgorythm - " + algorythm;   
  MailApp.sendEmail(mail, subject, message);
};