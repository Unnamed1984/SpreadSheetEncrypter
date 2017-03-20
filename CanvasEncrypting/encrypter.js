/**
 * Created by User on 11.03.2017.
 */

class Encrypter {

    constructor() {

        // var password = "test";
        //
        // var iterations = 1000;
        //
        // // sizes must be a multiple of 32
        // var keySize = 256;
        // var ivSize = 128;
        // var salt = CryptoJS.lib.WordArray.random(128/8);
        //
        // console.log('salt');
        // console.log(salt.toString(CryptoJS.enc.Base64));
        //
        // var output = CryptoJS.PBKDF2(password, salt, {
        //     keySize: (keySize+ivSize)/32,
        //     iterations: iterations
        // });
        //
        // // the underlying words arrays might have more content than was asked: remove insignificant words
        // output.clamp();
        //
        // // split key and IV
        // this.key = CryptoJS.lib.WordArray.create(output.words.slice(0, keySize/32));
        // this.iv = CryptoJS.lib.WordArray.create(output.words.slice(keySize/32));
        //
        // console.log('key');
        // console.log(this.key.toString(CryptoJS.enc.Base64));
        //
        // console.log('iv');
        // console.log(this.iv.toString(CryptoJS.enc.Base64));

        this.key = CryptoJS.MD5("password").toString();

        console.log("Key");
        console.log(this.key);

        this.encrypted = "";
    };

    cryptoEncrypt(ctx, width, height) {
        let imageData = ctx.getImageData(0, 0, width, height);
        let str = "";

        console.log('test encryption');

        let enc = CryptoJS.AES.encrypt("secret", this.key , { mode: CryptoJS.mode.CFB }).toString();
        console.log("'" + enc + "'");

        let dec = CryptoJS.AES.decrypt(enc, this.key , { mode: CryptoJS.mode.CFB }).toString(CryptoJS.enc.Utf8);
        console.log("'" + dec + "'");

        console.log(imageData.data.slice(0, 500));

        for( let i=0; i < imageData.data.length; i++ ) {
            str = str + String.fromCodePoint(imageData.data[i]);
        }
        console.log("Before encryption");
        console.log(str.substring(0, 100));

        let encrypted = CryptoJS.AES.encrypt(str, this.key , { mode: CryptoJS.mode.CFB }).toString();

        for( let i=0; i < imageData.data.length; i++ ) {
            imageData.data[i] = encrypted.codePointAt(i);

            if (encrypted.codePointAt(i) >= 256) {
                console.log(encrypted.codePointAt(i));
            }
        }

        this.encrypted = encrypted;

        console.log("After encryption");
        console.log(encrypted.substring(0, 100));

        ctx.putImageData(imageData, 0, 0);
    }

    cryptoDecrypt(ctx, width, height) {
        let imageData = ctx.getImageData(0, 0, width, height);
        let str = "";

        // for( let i=0; i < imageData.data.length; i++ ) {
        //     str = str + String.fromCodePoint(imageData.data[i]);
        // }


        str = CryptoJS.lib.WordArray.create(imageData.data).toString(CryptoJS.enc.Utf8)
            .split('').filter(function (val, index) { return (index + 1) % 4 == 0 }).join('');

        console.log("reading from canvas");
        console.log(str.substring(0, 100));

        console.log("Before decryption");
        console.log(this.encrypted.substring(0, 100));

        let decrypted = CryptoJS.AES.decrypt(str, this.key, { mode: CryptoJS.mode.CFB })
            .toString(CryptoJS.enc.Utf8);

        for( let i=0; i < imageData.data.length; i++ ) {
            imageData.data[i] = decrypted.codePointAt(i);
        }

        console.log("Decrypted");
        console.log(decrypted.substring(0, 100));

        ctx.putImageData(imageData, 0, 0);
    }

}

class Pixel {

    constructor(red, green, blue, alpha) {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
        this.Alpha = alpha;
    }

}












