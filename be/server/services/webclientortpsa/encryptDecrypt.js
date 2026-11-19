const crypto = require('crypto');

class EncryptDecrypt {
    static BASEIV = '3d24f826ccc9a3d4b00d90cc6700fd63'; 
    static CIPHER = 'aes-128-ctr'; 
    static OPTIONS = 0; 

    static encrypt(payload, key) {
        const iv = Buffer.from(EncryptDecrypt.BASEIV, 'hex');
        const cipher = crypto.createCipheriv(EncryptDecrypt.CIPHER, Buffer.from(key, 'utf8'), iv);
        let encrypted = cipher.update(payload, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted + "::" + EncryptDecrypt.BASEIV;
    }

    static decrypt(payload, key) {
        const data = payload.split('::');
        const iv = Buffer.from(data[1], 'hex');
        const decipher = crypto.createDecipheriv(EncryptDecrypt.CIPHER, Buffer.from(key, 'utf8'), iv);
        let decrypted = decipher.update(data[0], 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

// Example usage
// const key = 'bd3d2296bebe911e';
// const payload = "This is a test message sfefefef";

// // Encrypt
// const encrypted = APIToORTPSA.encrypt(payload, key);
// console.log("Encrypted:", encrypted);

// // Decrypt
// const decrypted = APIToORTPSA.decrypt(encrypted, key);
// console.log("Decrypted:", decrypted);


module.exports = EncryptDecrypt;
