const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const loginServices = require('../../services/login/LoginServiceImpl');
const { logger } = require('./../../config/log-config');
const LOG = logger.getLogger('LoginController.js');

//validate method
const validator = (method) => {
    // LOG.debug("inside validator..");
    var arr;
    switch (method) {
        case 'login':
            {
                LOG.debug("initializing login validators..");
                arr = [
                    check('userName', 'invalid data.').exists(),
                    check('password', 'invalid data.').exists()
                ];
                break;
            }
        case 'createUser':
            {
                LOG.debug("initializing createUser validators..");
                arr = [
                    check('userName', 'userName doesn\'t exists').exists(),

                    check('email', 'Invalid email').exists().isEmail(),

                    check('displayName').exists(),

                    check('phone').exists().isInt(),

                ];
                break;
            }
        case 'forgetPassword':
            {
                LOG.debug("initializing forgetPassword validators..");
                arr = [
                    check('userName', 'userName doesn\'t exists').exists(),
                ];
                break;
            }
        case 'changePassword':
            {
                LOG.debug("initializing forgetPassword validators..");
                arr = [
                    check('userName', 'userName doesn\'t exists').exists(),

                    check('otp', 'invalid otp.').exists(),

                    check('password', 'password doesn\'t exists').exists(),
                ];
                break;
            }
    }
    return arr;
};

//login
const login = async(req, res) => {
    LOG.info('Inside login.');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }).send();
        return;
    };

    try {
        // const body = _.pick(req.body, ['userName', 'password']);
        let sessionData = req.session;
        console.log('Session ', sessionData);
        if (sessionData === null || (sessionData.JSESSIONID === undefined || sessionData.JSESSIONID === null)) {
            LOG.debug('Captcha Should not be blank.');
            res.status(400).send('Captcha Should not be blank');
        } else {
            req.body.captcha = sessionData.JSESSIONID;
            sessionData.destroy(function(err) {
                if (err) {
                    msg = 'Error destroying session';
                } else {
                    msg = 'Session destroy successfully';
                    console.log(msg)
                }
            });
            if (req.body.captcha !== req.body.captchaId) {
                LOG.debug('Captcha is not valid.');
                res.status(400).send('Captcha is not valid.');
            } else {
                const data = await loginServices.login(req);
                LOG.debug(data);
                res.header('x-auth', data.token).send(data);
            }
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

//logout
const logout = async(req, res) => {
    LOG.info('Inside logout.');
    LOG.debug('Logged in user id: ', req.user.id);
    try {
        await loginServices.logout(req);
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }
};

//createUser
const createUser = async(req, res) => {
    LOG.info('Inside User createUser');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };
    let sessionData = req.session;
    console.log('Session ', sessionData);
    if (sessionData === null || (sessionData.JSESSIONID === undefined || sessionData.JSESSIONID === null)) {
        LOG.debug('Captcha Should not be blank.');
        res.status(400).send('Captcha Should not be blank');
    } else {
        var captcha = sessionData.JSESSIONID;
        console.log('Session1 ', captcha);
        console.log('Session2 ', sessionData.JSESSIONID);
        console.log(req.body.captchaId);
        // req.body.captcha = captcha;
        sessionData.destroy(function(err) {
            if (err) {
                msg = 'Error destroying session';
            } else {
                msg = 'Session destroy successfully';
                console.log(msg)
            }
        });
        var data = null;
        if (captcha !== req.body.captchaId) {
            // if (req.body.captcha !== req.body.captchaId) {
            LOG.debug('Captcha is not valid.');
            res.status(400).send('Captcha is not valid.');
        } else {
            data = await loginServices.createUser(req.body);
            if (data.status === 'FAILURE') {
                res.status(500);
            } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
                res.status(400);
            } else {
                res.status(201); //as new user is created
            }
        }
        LOG.info(data);
        res.send(data);
    }
};

//generateOtp
const generateOtp = async(req, res) => {
    LOG.info('Inside generateOtp.');
    LOG.debug('Logged in user id: ', req.body.userName);
    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };
    var data = await loginServices.generateOtp(req.body);

    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400).send(data);
    } else {
        res.status(200).send(data); //as new user is created
    }
};

//resendOtp
const resendOtp = async(req, res) => {
    LOG.info('Inside resendOtp.');
    LOG.debug('Logged in user id: ', req.body.userName);
    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };
    var data = await loginServices.resendOtp(req.body.userName);

    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400).send(data);
    } else {
        res.status(200).send(data); //as new user is created
    }
};

//changePassword
const changePassword = async(req, res) => {
    LOG.info('Inside changePassword.');
    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };
    var data = await loginServices.changePassword(req);

    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400).send(data);
    } else {
        res.status(200).send(data); //as new user is created
    }
};

//getCaptcha
const getCaptcha = async(req, res) => {
    LOG.info('Inside getCaptcha.');
    return await loginServices.getCaptcha(req, res);
};

//get application status
const getApplicationStatus = async(req,res) => {
    console.log(req.body, 'srdfhgjhgfcghjgcfh',);
    console.log(req.session.JSESSIONID,"123456");
    if (req.body.capValue1 === req.session.JSESSIONID) {
        console.log('verified');
        var data = await loginServices.getApplicationStatus(req.body.appNum);
        console.log(data,'Appdata');
        res.status(200).send(data);
    }else{
        console.log('not verified');
        res.status(200).send({Status: false, msg: 'Captch Mismatch'}); 
    }
}

module.exports = {
    validator,
    login,
    logout,
    createUser,
    generateOtp,
    resendOtp,
    changePassword,
    getCaptcha,
    getApplicationStatus
}