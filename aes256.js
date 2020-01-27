const crypto = require("crypto");
const AES256 = {
    getAlgorithm: function(keyBase64) {

        var key = Buffer.from(keyBase64, 'base64');
        switch (key.length) {
            case 16:
                return 'aes-128-cbc';
            case 32:
                return 'aes-256-cbc';
            default:
                return null
        }

        throw new Error('Invalid key length: ' + key.length);
    },
    encrypt: function(plainText, keyBase64, ivBase64){
        var key = Buffer.from(keyBase64, 'base64');
        var iv = Buffer.from(ivBase64, 'base64');
        var cipher = crypto.createCipheriv(this.getAlgorithm(keyBase64), key, iv);
        // cipher.update(plainText, 'utf8', 'base64')
        let cip = cipher.update(plainText, 'utf8', 'base64')
        cip += cipher.final('base64');
        return cip;
        //return cipher.final('base64');
    }//,
    // decrypt: function(messagebase64, keyBase64, ivBase64){
    //     var key = Buffer.from(keyBase64, 'base64');
    //     var iv = Buffer.from(ivBase64, 'base64');
    //     var decipher = crypto.createDecipheriv(this.getAlgorithm(keyBase64), key, iv);
    //     // decipher.update(messagebase64, 'base64');
    //     // return decipher.final();
    //     let dec = decipher.update(messagebase64, 'base64');
    //     dec += decipher.final();
    //     return dec;
    // }
}

module.exports = AES256;