/**
 * Created by User on 11.03.2017.
 */


window.onload = function() {
    let canvas = document.getElementById("cvImg");

    let ctx = canvas.getContext("2d");

    ctx.fillStyle = 'black';
//    ctx.strokeStyle = "red";


    for (let i=0; i < 7; i++) {
        //ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)
            + "," + Math.floor(Math.random() * 255) + ")";

        let qX = i * (canvas.width / 10);
        let qY = i * (canvas.height / 10);

        ctx.rect(Math.random() * qX, Math.random() * qY, Math.random() * (qX + 100), Math.random() * (qY + 100));
        ctx.fill();
    }

    let encrypter = new Encrypter();
    let isEncrypted = false;

    document.getElementById("encBtn").onclick = function() {
        let start = new Date();

        if (!isEncrypted) {
            encrypter.cryptoEncrypt(ctx, canvas.width, canvas.height);
        }
        else {
            encrypter.cryptoDecrypt(ctx, canvas.width, canvas.height);
        }
        let end = new Date();
        isEncrypted = !isEncrypted;

        document.getElementsByClassName('info')[0].innerText = end - start;
    };

};