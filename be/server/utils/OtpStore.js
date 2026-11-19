const express = require('express');
const bcrypt = require('bcryptjs');
const {seqlize} = require('./../config/seqlize');
const {User} = require('./../models/uac/user');

function getOtp(length){
    var otp    = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        otp += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return otp;
}

const storeOtp = async (user) => {
    var today = new Date();
    var time = (today.getTime() + ((1000 * 60 * 60 * 1) / 12));
    var otp = getOtp(4);
    let salt, hash;
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(otp, salt);
    try{
        let result  = await User.update({
            otp_secret: hash,
            otp_validity: time,
          },{
              where: {
                  user_name: user.user_name
              }
        })
    }catch (err) {
        throw err;
     }
    return otp;
 }

 const getUserDuplicateOtp = async (user) => {
    var today = new Date();
    var time = (today.getTime() + ((1000 * 60 * 60 * 1) / 12));
    var otp = null;
    let salt, hash;
    try{
        if(user.otp_secret != null){
            otp = getOtp(4);
            salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(otp, salt);
            let result  = await User.update({
                otp_secret: hash,
                otp_validity: time,
              },{
                  where: {
                      user_name: user.user_name
                  }
            })
        }
    }catch (err) {
        throw err;
     }
    return otp;
 }

 const isValidUserOtp = async (user,otp) => {
    let flag = false;
    try{
        if(user.otp_secret != null){
           let result = await bcrypt.compareSync(otp.toString(),user.otp_secret);  
           flag = result;
        }
    }catch (err) {
        throw err;
     }
    return flag;
 }

 module.exports = {
    storeOtp,getUserDuplicateOtp,isValidUserOtp
 }