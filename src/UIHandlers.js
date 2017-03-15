function onOpen() {
    var ui = SpreadsheetApp.getUi();

    ui.createAddonMenu()
        .addSubMenu(ui.createMenu('Encode')
            .addItem('DES', 'encodeTripleDESHandler')
            .addItem('AES', 'encodeAESHandler'))
        .addSeparator()
        .addSubMenu(ui.createMenu('Decode')
            .addItem('DES', 'decodeTripleDESHandler')
            .addItem('AES', 'decodeAESHandler'))
        .addToUi();   
  };
  
  
function encodeTripleDESHandler(){
  transformData("ENCODE", "TripleDES", encodeTripleDES);
};

function encodeAESHandler(){
  transformData("ENCODE", "AES", encodeAES);
}

function decodeTripleDESHandler(){
  transformData("DECODE", "TripleDES", decodeTripleDES);
}

function decodeAESHandler(){
  transformData("DECODE", "AES", decodeAES);
}