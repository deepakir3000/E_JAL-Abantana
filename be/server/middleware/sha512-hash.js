
//Loading the crypto module in node.js
var crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "6A80FD8D38D579D1090F6CDB62CA34CA";
const iv = "79b67e539e7fcadf";

const getHashedPassword = function(password) {
   //creating hash object 
    var hash = crypto.createHash('sha512');
    //passing the data to be hashed
    data = hash.update(password, 'utf-8');
    //Creating the hash in the required format
    gen_hash= data.digest('hex');
    //Printing the output on the console
    console.log("hash : " + gen_hash);
    return gen_hash;
 }

 const getSecureRandom = function() {
    //creating Secure Random Number
    var token = crypto.randomBytes(20).toString('hex');
     return token;
  }

 const compare = function(password,confirmPassword) {
    if(password === null || confirmPassword === null){
        return false;
    }else{
        if(password === confirmPassword){
            return true;
        }else{
            return false;
        }
    }
  }

  const encrypt = function(text){
    var cipher = crypto.createCipheriv(algorithm, key, iv)
    var crypted = cipher.update(text,'utf8','base64')
    crypted += cipher.final('base64');
    return crypted.toString();
}

const decrypt = function(text){
    var decipher = '';
    var dec = '';
    try{
        decipher = crypto.createDecipheriv(algorithm, key, iv)
        dec = decipher.update(text,'base64','utf8')
        dec += decipher.final('utf8');
    }catch(err){
        dec = null;
    }
    return dec;
}

 module.exports = {
    getHashedPassword,
    compare,
    getSecureRandom,
    encrypt,
    decrypt
 }