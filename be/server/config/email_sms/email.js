var nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

var transporter = nodemailer.createTransport({
    //name: 'gov.in',
    
    host: 'relay.nic.in',
    port: 25,
    secure: false, //true,
    //secureConnection:false,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS, 
    }
    // , tls: {
    //     rejectUnauthorized: false
    //   }
    //   ,
    //   transportMethod: 'SMTP'
  });

const sendSimpleMail = function(to,sub,text) {
    var mailOptions = {
        from:process.env.EMAILUSER,
        to:to,
        subject: sub,
        text: text
     };

    //  transporter.verify(function(error, success) {
    //     if (error) {
    //       console.log('verify-----',error);
    //     } else {
    //       console.log("Server is ready to take our messages");
    //     }
    //   });

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log("MAIL Error-----",error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    }); 
}

const sendSimpleMailWithCC = function(to,withCc,sub,text) {
    var mailOptions = {
        to: to,
        subject: sub,
        text: text,
        cc: withCc
     };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendSimpleMail, sendSimpleMailWithCC
}
