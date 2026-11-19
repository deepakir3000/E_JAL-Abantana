var http = require('http');
var request = require("request");
var https = require("https");
var msgResponse;
var async = require('async');
var fs = require('fs');
var crypto = require('crypto');
const { Request } = require('tedious');

// https.globalAgent.options.ca = "server/config/email_sms/smsgwsmsgovin-oct20.cer";

exports.sendSms = function (data, phoneNumber,msgType, callBack) {
  var phone10digits;
  if (phoneNumber == undefined) {
    console.log("Phone number is undefined");
    callBack("Phone number is undefined");
  } else 
  {
    //callBack(null, "sms< sending: :::commented as we< are testing");
    var phoneNumber = phoneNumber;
    if (phoneNumber.length >= 10) {
      phone10digits = '91' + phoneNumber.substr(phoneNumber.length - 10);
    } else {
      phone10digits = '91' + phoneNumber;
    }
    var smsMessage = data; //encodeURIComponent(data);
    // var url = 'http://smsapi.24x7sms.com/api_2.0/SendSMS.aspx?APIKEY=XOOBsun1hem&MobileNo=91' + phone10digits + '&SenderID=EAIAST&Message=' + smsMessage + '&ServiceName=TEMPLATE_BASED';
    
    var url="";
    var username = "";
    if(msgType == 'otp')
    {
        console.log("Msg TYPE---------------------", msgType);
        username = process.env.otpUsername;
        url = process.env.HOST + '?username=' + process.env.otpUsername + '&pin=' + process.env.smsPass + '&message=' + smsMessage + '&mnumber=' + phone10digits + '&signature=' + process.env.SenderID  ;
    }
    else{
         console.log("Msg TYPE---------------------", msgType);
         username = process.env.smsUsername;
         url = process.env.HOST + '?username=' + process.env.smsUsername + '&pin=' + process.env.smsPass + '&message=' + smsMessage + '&mnumber=' + phone10digits + '&signature=' + process.env.SenderID  ;
    }
    
    console.log('URL',url);
    
    var options = {
      method: "get",
      host: 'smsgw.sms.gov.in',
      port: 443,
      url:url,
      rejectUnauthorized: false
    };

    const https_options = {
      ca: [
            fs.readFileSync('server/config/email_sms/smsgwsmsgovin-oct20.cer','utf8')
          ],
      requestCert:true,
      rejectUnauthorized:false,
      //secureProtocol:'TLSv1_2_server_method'
      secureOptions: crypto.SSL_OP_NO_SSLv2 | crypto.SSL_OP_NO_SSLv3 | crypto.SSL_OP_NO_TLSv1 | crypto.SSL_OP_NO_TLSv1_1
    };    
   
    //   const req = https.request(options, (res) => {
    //   console.log('statusCode:', res.statusCode);
    //   console.log('headers:', res.headers);
    
    //   res.on('data', (d) => {
    //     process.stdout.write(d);
    //     console.log(d);
    //   });
    // });
    
    // req.on('error', (e) => {
    //   console.error('SendSMS Error ---',e);
    // });
    // req.end();
 


    request(url,https_options, function (error, response, body) {
      console.log('SMSBODY_________________'+body);
      console.log('SMSERROR_________________'+error);
      //console.log('SMSRESPONSE_________________'+JSON.stringify(response));
      if (!error && response.statusCode == 200) {
        console.log(body);
        callBack(response.statusCode);
      } else {
        console.log(body + "" + response + "" + error);
        callBack(error);
      }
    })
    
  }
};

/* exports.sendSmsForRiderMania = function (data, phoneNumber, callBack) {
  var phone10digits;
  if (phoneNumber == undefined) {
    console.log("Phone number is undefined");
    callBack("Phone number is undefined");
  } else {
	  //callBack(null, "sms< sending: :::commented as we< are testing");
    async.eachSeries(phoneNumber, function (mobileNumber, cb) {
      var mobileNumber = mobileNumber.trim();
      if (mobileNumber.length >= 10) {
        phone10digits = mobileNumber.substr(mobileNumber.length - 10);
      } else {
        phone10digits = mobileNumber;
      }
      var smsMessage = encodeURIComponent(data);
      var url = 'http://smsapi.24x7sms.com/api_2.0/SendSMS.aspx?APIKEY=XOOBsun1hem&MobileNo=91' + phone10digits + '&SenderID=EAIAST&Message=' + smsMessage + '&ServiceName=TEMPLATE_BASED';
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          msgResponse = body;
          async.setImmediate(cb);
        } else {
          console.log(body + "" + response + "" + error);
          async.setImmediate(cb);
        }
      });
    }, function (err) {
      if (err) {
        callBack(err);
      } else {
        callBack(null, msgResponse)
      }
    })

  }
} */
