function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ngx-spinner bdOpacity=0.5 bdColor=\"rgba(0,0,0,0.8)\" size=\"default\" color=\"#fff\" type=\"line-spin-clockwise-fade\" [fullScreen]=\"true\">\r\n    <p style=\"color: white;\"> Please wait... </p>\r\n</ngx-spinner>\r\n<div *ngIf=\"auth\">\r\n    <router-outlet></router-outlet>\r\n</div>\r\n<!-- <app-chatbot></app-chatbot> -->\r\n<div *ngIf=\"!auth\" class=\"text-center\">\r\n    <p class=\"text-danger\">Refused To Connect</p>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/change-password/change-password.component.html":
  /*!*****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/change-password/change-password.component.html ***!
    \*****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsChangePasswordChangePasswordComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"row top-bg\">\r\n    <div class=\"col-sm-4\">\r\n        <div class=\"row\">\r\n            <div class=\"col-3 od-logo\">\r\n                <img src=\"assets/icon/odisha_logo_blue.png\">\r\n            </div>\r\n            <div class=\"col-9 wtr-logo\">\r\n                <img src=\"assets/images/WaterLogin/Govt. of Odisha.png\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-sm-8\">\r\n        <div class=\"row mb-5 mr-3\">\r\n            <div class=\"col-12\">\r\n                <span class=\"back-button\" title=\"Go Back\" (click)=\"backButton()\">\r\n                    <i class=\"fa fa-reply \"></i>\r\n                    <span>Back</span>\r\n                </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"conatiner top-container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-4 field-container\">\r\n            <div class=\"row\">\r\n                <div class=\"col-12\">\r\n                    <img src=\"./../../../../../assets/images/management.svg\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-12\">\r\n                    <h4>Change Password</h4>\r\n                </div>\r\n            </div>\r\n            <form [formGroup]=\"changePassForm\" (ngSubmit)=\"checkPassword(changePassForm.value)\">\r\n                <div class=\"row mt-lg-5\">\r\n                    <div class=\"col-5\">\r\n                        <label>Current Password</label>\r\n                    </div>\r\n                    <div class=\"col-7\">\r\n                        <input type=\"password\" class=\"form-control\" formControlName=\"oldPassword\" autocomplete=\"off\">\r\n                    </div>\r\n                </div>\r\n                <small class=\"text-error ml-3\"\r\n                    *ngIf=\"changePassForm.controls.oldPassword.touched && changePassForm.controls.oldPassword.invalid\">\r\n                    <span class=\"text-danger\"\r\n                        *ngIf=\"changePassForm.controls.oldPassword.errors?.required\">Required</span>\r\n                </small>\r\n                <div class=\"row mt-lg-4\">\r\n                    <div class=\"col-5\">\r\n                        <label>New Password</label>\r\n                    </div>\r\n                    <div class=\"col-7\">\r\n                        <input type=\"password\" class=\"form-control\" formControlName=\"password\" autocomplete=\"off\">\r\n                    </div>\r\n                </div>\r\n                <small class=\"text-error ml-3\"\r\n                    *ngIf=\"changePassForm.controls.password.touched && changePassForm.controls.password.invalid\">\r\n                    <span class=\"text-danger\" *ngIf=\"changePassForm.controls.password.errors?.required\">Required</span>\r\n                    <span class=\"text-danger\" *ngIf=\"changePassForm.controls.password.errors?.pattern\">Password is\r\n                        weak</span>\r\n                    <span *ngIf=\"changePassForm.controls.password.errors?.pattern\"><i\r\n                            style=\"font-size: 20px; margin-left: 10px; cursor: pointer;\" class=\"fa fa-info-circle\"\r\n                            title=\"Password must contains one digit from 0-9, one lowercase characters, \r\n                        one uppercase characters, one special symbols from (@#$%) \r\n                        and the length should be at least 6 characters.\"></i></span>\r\n                </small>\r\n                <div class=\"row mt-lg-4\">\r\n                    <div class=\"col-5\">\r\n                        <label>Confirm Password</label>\r\n                    </div>\r\n                    <div class=\"col-7\">\r\n                        <input type=\"password\" class=\"form-control\" formControlName=\"confirmPass\" autocomplete=\"off\">\r\n                    </div>\r\n                </div>\r\n                <small class=\"text-error ml-3\"\r\n                    *ngIf=\"changePassForm.controls.password.touched && changePassForm.controls.password.invalid\">\r\n                    <span class=\"text-danger\" *ngIf=\"changePassForm.controls.password.errors?.required\">Required</span>\r\n                </small>\r\n                <!-- <div class=\"form-group row\">\r\n                    <div class=\"col-5 px-0\">\r\n                        <div class=\"\" #captcha></div>\r\n                    </div>\r\n                    <div class=\"col-1 px-0\">\r\n                        <i class=\"fa fa-refresh captch-style\" aria-hidden=\"true\" (click)=\"getCaptcha()\"></i>\r\n                    </div>\r\n                    <div class=\"col-6 px-0\">\r\n                        <input type=\"text\" style=\"margin-top: 15px; margin-left: -15px;\" class=\"form-control\" formControlName=\"captchaVal\" placeholder=\"Enter Captcha\">\r\n                    </div>\r\n                </div>\r\n                <small class=\"text-error ml-3\" *ngIf=\"changePassForm.controls.captchaVal.touched && changePassForm.controls.captchaVal.invalid\">\r\n                    <span class=\"text-danger\"\r\n                        *ngIf=\"changePassForm.controls.captchaVal.errors?.required\">Required</span>\r\n                </small> -->\r\n                <div class=\"row\">\r\n                    <div class=\"col-12\" style=\"text-align: center;\">\r\n                        <button type=\"submit\" [disabled]=\"changePassForm.invalid\" class=\"custom-btn\">Submit</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error401/error401.component.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error401/error401.component.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsErrorError401Error401ComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"row ml-0 mr-0 justify-content-center\">\r\n    <div class=\"col-xl-12 col-lg-12 col-md-12\">\r\n        <div class=\"row error-page\">\r\n            <div class=\"col-xl-6 error-img\">\r\n                <img src=\"assets/error/401.png\" class=\"image\">\r\n            </div>\r\n            <div class=\"col-xl-6 error-content\">\r\n                <div class=\"error-heading\">\r\n                    <div class=\"header1\">Error !</div>\r\n                </div>\r\n                <div class=\"error-code\">\r\n                    <div class=\"code\">4</div>\r\n                    <div class=\"code\">0</div>\r\n                    <div class=\"code\">1</div>\r\n                </div>\r\n                <div class=\"error-heading\">\r\n                    <div class=\"header2\">Access Denied</div>\r\n                </div>\r\n                <div class=\"error-desc\">\r\n                    <div class=\"desc1\">Sorry, You are not authorized!</div>\r\n                    <div class=\"desc2\">You don't have permission to access this page</div>\r\n                </div>\r\n                <div class=\"error-backBtn\">\r\n                    <button type=\"button\" class=\"btn btn-primary\" ><i class=\"fa fa-chevron-left\"></i>&nbsp;Go Back</button>\r\n                </div>\r\n            </div><!-- (click)=\"goToHome()\" -->\r\n        </div>\r\n    </div>\r\n</div>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error404/error404.component.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error404/error404.component.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsErrorError404Error404ComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"row ml-0 mr-0 justify-content-center\">\r\n    <div class=\"col-xl-12 col-lg-12 col-md-12\">\r\n        <div class=\"row error-page\">\r\n            <div class=\"col-xl-7 error-img\">\r\n                <img src=\"assets/error/404_error.gif\" class=\"image\">\r\n            </div>\r\n            <div class=\"col-xl-5 error-content\">\r\n                <div class=\"error-heading\">\r\n                    <div class=\"header1\">Error !</div>\r\n                </div>\r\n                <div class=\"error-code\">\r\n                    <div class=\"code\">4</div>\r\n                    <div class=\"code\">0</div>\r\n                    <div class=\"code\">4</div>\r\n                </div>\r\n                <div class=\"error-heading\">\r\n                    <div class=\"header2\">Page Not Found</div>\r\n                </div>\r\n                <div class=\"error-desc\">\r\n                    <div class=\"desc1\">Sorry, We can't find that page!</div>\r\n                    <div class=\"desc2\">Either something went wrong or page doesn't exist anymore</div>\r\n                </div>\r\n                <div class=\"error-backBtn\">\r\n                    <button type=\"button\" class=\"btn btn-primary\" ><i class=\"fa fa-home\"></i>&nbsp;Return Home</button>\r\n                </div><!-- (click)=\"goToHome()\" -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error500/error500.component.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error500/error500.component.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsErrorError500Error500ComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"row ml-0 mr-0 justify-content-center\">\r\n    <div class=\"col-xl-12 col-lg-12 col-md-12\">\r\n        <div class=\"row error-page\">\r\n            <div class=\"col-xl-6 error-img\">\r\n                <img src=\"assets/error/500.png\" class=\"image\">\r\n            </div>\r\n            <div class=\"col-xl-6 error-content\">\r\n                <div class=\"error-heading\">\r\n                    <div class=\"header1\">Error !</div>\r\n                </div>\r\n                <div class=\"error-code\">\r\n                    <div class=\"code\">5</div>\r\n                    <div class=\"code\">0</div>\r\n                    <div class=\"code\">0</div>\r\n                </div>\r\n                <div class=\"error-heading\">\r\n                    <div class=\"header2\">Internal Server Error</div>\r\n                </div>\r\n                <div class=\"error-desc\">\r\n                    <div class=\"desc1\">Sorry, We had some technical problem!</div>\r\n                    <div class=\"desc2\">Either something went wrong or some problem occured during last operation</div>\r\n                </div>\r\n                <div class=\"error-backBtn\">\r\n                    <button type=\"button\" class=\"btn btn-primary\" ><i class=\"fa fa-home fa-lg\"></i>&nbsp;Return Home</button>\r\n                </div>\r\n            </div><!-- (click)=\"goToHome()\" -->\r\n        </div>\r\n    </div>\r\n</div>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/forgot-password/forgot-password.component.html":
  /*!*****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/forgot-password/forgot-password.component.html ***!
    \*****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsForgotPasswordForgotPasswordComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"fp-outer-container\">\r\n    <div class=\"d-flex justify-content-center align-items-center w-100 h-100 fp-inner-container\">\r\n        <div class=\"col-xl-4 col-md-4 fp-login-container\">\r\n            <div class=\"fp-image-loc\">\r\n                <img class=\"fp-image\" src=\"assets/images/lock.png\" />\r\n            </div>\r\n            <div class=\"fp-titles\">\r\n                <div class=\"heading\">Forgot Password</div>\r\n                <div class=\"sub-heading\">Enter the following details to change it</div>\r\n            </div>\r\n            <div class=\"fp-form\">\r\n                <form [formGroup]=\"forgotPassForm\"  class=\"text-left\">\r\n                    <div class=\"form-group\">\r\n                        <label>User Name</label>\r\n                        <div class=\"row ml-0 mr-0\">\r\n                            <div class=\"col-10 pl-0 pr-0\">\r\n                                <input formControlName=\"userId\" type=\"text\" autocomplete=\"off\" aria-autocomplete=\"none\" class=\"form-control rounded-0\" placeholder=\"User Name.\" >\r\n                            </div>\r\n                            <div class=\"col-2 pl-0 pr-0\">\r\n                                <button type=\"button\" class=\"btn btn-primary rounded-0\" (click)=\"sendOtp(forgotPassForm.value)\" >SEND</button>\r\n                            </div>\r\n                        </div>\r\n                       \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label>Password</label>\r\n                        <input formControlName=\"password\" type=\"password\" autocomplete=\"off\" aria-autocomplete=\"none\" class=\"form-control rounded-0\" placeholder=\"New Password.\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label>Confirm Password</label>\r\n                        <input formControlName=\"cnfPass\" type=\"password\" autocomplete=\"off\" aria-autocomplete=\"none\" class=\"form-control rounded-0\" placeholder=\"Confirm Password.\">\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <label>OTP</label>\r\n                        <div class=\"input-group\">\r\n                            <input formControlName=\"otp\" type=\"password\" autocomplete=\"off\" aria-autocomplete=\"none\" class=\"form-control rounded-0\" placeholder=\"OTP\" maxlength=\"6\">\r\n                            <div class=\"input-group-addon btn btn-primary rounded-0\">\r\n                                <i class=\"fa fa-refresh\"> Resend</i>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row justify-content-center mt-3\">\r\n                        <button class=\"btn btn-danger\" type=\"submit\">Submit</button>\r\n                    </div>\r\n\r\n                    <div class=\"form-group row justify-content-center mt-3\">\r\n                      <a href=\"javascript:void();\" [routerLink]=\"['/login']\">Go to Login Page</a>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/login/login.component.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/login/login.component.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container-fluid login-container\">\r\n    <!-- <div class=\"text-center\">\r\n        <label class=\"top-label\">Online Water Allocation System</label>\r\n    </div> -->\r\n\r\n    <div class=\"inner-container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <div class=\"row form-container\">\r\n                    <div class=\"col-sm-5 login-left\">\r\n                        <div class=\"row e-jala\">\r\n                            <img src=\"assets/images/WaterLogin/E jala abantana.png\">\r\n                        </div>\r\n                        <div class=\"row odisha-logo\">\r\n                            <img src=\"assets/icon/odisha_logo_blue.png\">\r\n                        </div>\r\n                        <div class=\"row water-head mt-lg-2\">\r\n                            <div class=\"col-12\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-12\">\r\n                                        <label class=\"dept\">Department of</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-12\">\r\n                                        <label class=\"wtr\">Water Resources</label>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row text-center\">\r\n                            <label class=\"wh-ap\" (click)=\" openFeedBackModal(apModal)\">Who Can Apply?</label>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-7 login-right\" [hidden]=\"!isLogin\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"getLoginData(loginForm.value)\">\r\n                            <div class=\"row mt-6\">\r\n                                <div class=\"col-12\">\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-2 px-0\">\r\n                                            <i class=\"fa fa-user\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-10 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" autocomplete=\"off\"\r\n                                                formControlName=\"userName\" placeholder=\"Username\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-2 px-0\">\r\n                                            <i class=\"fa fa-lock\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-10 px-0\">\r\n                                            <input type=\"password\" onselectstart=\"return false\" onpaste=\"return false;\"\r\n                                                onCopy=\"return false\" onCut=\"return false\" onDrag=\"return false\"\r\n                                                onDrop=\"return false\" class=\"form-control\" autocomplete=\"off\"\r\n                                                formControlName=\"password\" placeholder=\"Password\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-6 px-0\">\r\n                                            <div class=\"\" #captcha></div>\r\n                                        </div>\r\n                                        <div class=\"col-1 px-0\">\r\n                                            <i class=\"fa fa-refresh captch-style\" aria-hidden=\"true\"\r\n                                                (click)=\"getCaptcha()\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-5 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" (keyup)=\"getCaptchaValue($event)\"\r\n                                                placeholder=\"Enter Captcha\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-3 pr-2\">\r\n                                    <i *ngIf=\"isChecked\" class=\"fa fa-check-square custom-check pull-right\"\r\n                                        (click)=\"tooggle()\"></i>\r\n                                    <i *ngIf=\"!isChecked\" class=\"fa fa-square custom-check pull-right\"\r\n                                        (click)=\"tooggle()\"></i>\r\n                                </div>\r\n                                <div class=\"col-9 pl-0\">\r\n                                    <label class=\"custom-label pull-left\">Remember me?</label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row mt-1\">\r\n                                <div class=\"col-12\">\r\n                                    <button type=\"submit\" class=\"custom-btn\">Log in</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"row mt-1\">\r\n                            <div class=\"col-12 pl-5 ml-5\">\r\n                                <label class=\"custom-label\"><a href=\"#\" (click)=\"openForgotPasswordForm()\">Forgot\r\n                                        Password</a></label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row mt-2\">\r\n                            <div class=\"col-12 pl-4 ml-2\">\r\n                                <label class=\"custom-label\">Don't have an account?<a href=\"#\"\r\n                                        (click)=\"openRegistrationForm()\">REGISTER</a></label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"footer\">\r\n                            <img src=\"assets/images/WaterLogin/Publication2.jpg\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-7 register-right\" [hidden]=\"!isRegister\">\r\n                        <form [formGroup]=\"registerForm\" (ngSubmit)=\"registerUser(registerForm.value)\">\r\n                            <div class=\"row mt-6\">\r\n                                <div class=\"col-12\">\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-2 px-0\">\r\n                                            <i class=\"fa fa-user-circle\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-10 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" autocomplete=\"off\"\r\n                                                formControlName=\"firstName\" placeholder=\"Firstname\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <small class=\"text-error ml-3\"\r\n                                        *ngIf=\"registerForm.controls.firstName.touched && registerForm.controls.firstName.invalid\">\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.firstName.errors?.required\">Required</span>\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.firstName.errors?.invalidField\">Invalid\r\n                                            Name</span>\r\n                                    </small>\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-2 px-0\">\r\n                                            <i class=\"fa fa-user\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-10 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" autocomplete=\"off\"\r\n                                                formControlName=\"lastName\" placeholder=\"Lastname\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <small class=\"text-error ml-3\"\r\n                                        *ngIf=\"registerForm.controls.lastName.touched && registerForm.controls.lastName.invalid\">\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.lastName.errors?.required\">Required</span>\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.lastName.errors?.invalidField\">Invalid Last\r\n                                            Name</span>\r\n                                    </small>\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-2 px-0\">\r\n                                            <i class=\"fa fa-at\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-10 px-0\">\r\n                                            <input type=\"email\" class=\"form-control\" formControlName=\"email\"\r\n                                                placeholder=\"Email\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <small class=\"text-error ml-3\"\r\n                                        *ngIf=\"registerForm.controls.email.touched && registerForm.controls.email.invalid\">\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.email.errors?.required\">Required</span>\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.email.errors?.invalidEmail\">Invalid\r\n                                            E-mail</span>\r\n                                    </small>\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-2 px-0\">\r\n                                            <i class=\"fa fa-phone-square\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-10 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" autocomplete=\"off\"\r\n                                                formControlName=\"phone\" placeholder=\"Phone No\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <small class=\"text-error ml-3\"\r\n                                        *ngIf=\"registerForm.controls.phone.touched && registerForm.controls.phone.invalid\">\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.phone.errors?.required\">Required</span>\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"registerForm.controls.phone.errors?.pattern\">Invalid\r\n                                            Phone Number</span>\r\n                                    </small>\r\n                                    <div class=\"form-group row\">\r\n                                        <div class=\"col-6 px-0\">\r\n                                            <div class=\"\" #regCaptcha></div>\r\n                                        </div>\r\n                                        <div class=\"col-1 px-0\">\r\n                                            <i class=\"fa fa-refresh captch-style\" aria-hidden=\"true\"\r\n                                                (click)=\"getCaptcha()\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-5 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" (keyup)=\"getCaptchaValue($event)\"\r\n                                                placeholder=\"Enter Captcha\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-3 pr-2\">\r\n                                    <i *ngIf=\"isChecked\" class=\"fa fa-check-square custom-check pull-right\"\r\n                                        (click)=\"tooggle()\"></i>\r\n                                    <i *ngIf=\"!isChecked\" class=\"fa fa-square custom-check pull-right\"\r\n                                        (click)=\"tooggle()\"></i>\r\n                                </div>\r\n                                <div class=\"col-9 pl-0\">\r\n                                    <label class=\"custom-label pull-left\">Remember me?</label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row mt-1\">\r\n                                <div class=\"col-12\">\r\n                                    <button type=\"submit\" class=\"custom-btn\">Register</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"row mt-4\">\r\n                            <div class=\"col-12 pl-4 ml-2\">\r\n                                <label class=\"custom-label\">Already have an account?<a href=\"#\"\r\n                                        (click)=\"openLoginForm()\">Login</a></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-7 register-right\" [hidden]=\"!isForgotPass\">\r\n                        <form [formGroup]=\"forgotPassForm\" (ngSubmit)=\"submitForgotPassForm(forgotPassForm.value)\">\r\n                            <div class=\"row mt-6\" >\r\n                                <div class=\"col-12\">\r\n                                    <div class=\"\" [hidden]=\"!bVerify\">\r\n                                        <div class=\"form-group row\">\r\n                                            <div class=\"col-2 px-0\">\r\n                                                <i class=\"fa fa-user-circle\"></i>\r\n                                            </div>\r\n                                            <div class=\"col-10 px-0\">\r\n                                                <input type=\"text\" class=\"form-control\" autocomplete=\"off\"\r\n                                                    formControlName=\"userName\" placeholder=\"User Name\"\r\n                                                    [ngClass]=\"{'readonly-1': disableSendReq}\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group row\">\r\n                                            <div class=\"col-2 px-0\">\r\n                                                <i class=\"fa fa-user-circle\"></i>\r\n                                            </div>\r\n                                            <div class=\"col-10 px-0\">\r\n                                                <input type=\"text\" class=\"form-control\" autocomplete=\"off\"\r\n                                                    formControlName=\"mobileNo\" placeholder=\"Mobile No\"\r\n                                                    [ngClass]=\"{'readonly-1': disableSendReq}\">\r\n                                            </div>\r\n                                        </div>\r\n                                        \r\n                                    </div>\r\n                                    \r\n                                    <!-- <small class=\"text-error ml-3\" *ngIf=\"forgotPassForm.controls.phone.touched && forgotPassForm.controls.phone.invalid\">\r\n                                        <span class=\"text-danger\"\r\n                                            *ngIf=\"forgotPassForm.controls.phone.errors?.required\">Required</span>\r\n                                        <span class=\"text-danger\" *ngIf=\"forgotPassForm.controls.phone.errors?.pattern\">Invalid\r\n                                            Phone Number</span>\r\n                                    </small> -->\r\n                                    <div class=\"\" [hidden]=\"!bVerify\">\r\n                                        <div class=\"form-group row\">\r\n                                            <div class=\"col-6 px-0\">\r\n                                                <div class=\"\" #otpCaptcha [innerHtml]=\"captchaSvg\"></div>\r\n                                            </div>\r\n                                            <div class=\"col-1 px-0\">\r\n                                                <i class=\"fa fa-refresh captch-style\" style=\"cursor: pointer;\" aria-hidden=\"true\"\r\n                                                    (click)=\"getCaptchaApp()\"></i>\r\n                                            </div>\r\n                                            <div class=\"col-5 px-0\">\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Captcha\" (keyup)=\"otpverifyCaptcha($event)\">\r\n                                            </div>\r\n                                            <!-- <div class=\"mt-3\">\r\n                                                <button type=\"button\" class=\"btn btn-outline-primary\"\r\n                                                    (click)=\"getApplicationStatus()\">Submit</button>\r\n                                            </div> -->\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-10 px-0 text-center\">\r\n                                            <button *ngIf=\"disableReSendReq\" type=\"button\"\r\n                                                class=\"btn btn-primary  pt-1 pb-1\"\r\n                                                [disabled]=\"disableSendReq? disableSendReq : forgotPassForm.controls.userName.invalid\"\r\n                                                (click)=\"sendOtp(forgotPassForm.value)\">Send otp</button>\r\n                                            <button *ngIf=\"!disableReSendReq\" type=\"button\"\r\n                                                class=\"btn btn-primary  pt-1 pb-1\"\r\n                                                [disabled]=\"disableReSendReq? disableReSendReq : forgotPassForm.controls.userName.invalid\"\r\n                                                (click)=\"reSendOtp(forgotPassForm.value)\">Resend otp</button>\r\n                                        </div>\r\n                                    </div>\r\n                                    <!-- <small class=\"text-error ml-3\" *ngIf=\"citizenForm.controls.firstName.touched && citizenForm.controls.firstName.invalid\">\r\n                                            <span class=\"text-danger\" *ngIf=\"citizenForm.controls.firstName.errors?.required\">Required</span>\r\n                                            <span class=\"text-danger\" *ngIf=\"citizenForm.controls.firstName.errors?.invalidField\">Invalid Name</span>\r\n                                        </small> -->\r\n                                        <div class=\"\" [hidden]=\"!isVerify\">\r\n                                            <div class=\"form-group row\">\r\n                                                <div class=\"col-2 px-0\">\r\n                                                    <i class=\"fa fa-key\"></i>\r\n                                                </div>\r\n                                                <div class=\"col-10 px-0 d-flex\">\r\n                                                    <input type=\"text\" class=\"form-control\" formControlName=\"otp\"\r\n                                                    placeholder=\"otp\" maxlength=\"4\" pattern=\"\\d*\">\r\n                                                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"verifyOtp()\"> Verify</button>\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"form-group row\">\r\n                                                <div class=\"col-2 px-0\">\r\n                                                    <i class=\"fa fa-lock\"></i>\r\n                                                </div>\r\n                                                <div class=\"col-10 px-0\">\r\n                                                    <input type=\"password\" class=\"form-control\" formControlName=\"password\"\r\n                                                        placeholder=\"Password\">\r\n                                                </div>\r\n                                            </div>\r\n                                            <small class=\"text-error ml-3\"\r\n                                                *ngIf=\"forgotPassForm.controls.password.touched && forgotPassForm.controls.password.invalid\">\r\n                                                <span class=\"text-danger\"\r\n                                                    *ngIf=\"forgotPassForm.controls.password.errors?.required\">Required</span>\r\n                                                <span class=\"text-danger\"\r\n                                                    *ngIf=\"forgotPassForm.controls.password.errors?.pattern\">Password is\r\n                                                    weak</span>\r\n                                                <span *ngIf=\"forgotPassForm.controls.password.errors?.pattern\"><i\r\n                                                        style=\"font-size: 20px; margin-left: 10px; cursor: pointer;\"\r\n                                                        class=\"fa fa-info-circle\" title=\"Password must contains one digit from 0-9, one lowercase characters, \r\n                                                    one uppercase characters, one special symbols from (@#$%) \r\n                                                    and the length should be at least 6 characters.\"></i></span>\r\n                                            </small>\r\n                                            <div class=\"form-group row\">\r\n                                                <div class=\"col-2 px-0\">\r\n                                                    <i class=\"fa fa-lock\"></i>\r\n                                                </div>\r\n                                                <div class=\"col-10 px-0\">\r\n                                                    <input type=\"password\" class=\"form-control\" formControlName=\"cnfPass\"\r\n                                                        placeholder=\"Confirm Password\">\r\n                                                    <small class=\"text-error\" *ngIf=\"forgotPassForm.controls.cnfPass.touched\">\r\n                                                        <span\r\n                                                            *ngIf=\"forgotPassForm.controls.cnfPass.errors?.required\">required</span>\r\n                                                    </small>\r\n                                                </div>\r\n                                                <!-- <small class=\"form-text text-danger text-muted\">Confirm Password should be same as Password.</small> -->\r\n                                            </div>\r\n                                        </div>\r\n                                    <!-- <div class=\"form-group row\">\r\n                                        <div class=\"col-6 px-0\">\r\n                                            <div class=\"\" #frgtCaptcha></div>\r\n                                        </div>\r\n                                        <div class=\"col-1 px-0\">\r\n                                            <i class=\"fa fa-refresh captch-style\" aria-hidden=\"true\" (click)=\"getCaptcha()\"></i>\r\n                                        </div>\r\n                                        <div class=\"col-5 px-0\">\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"captcha\" placeholder=\"Enter Captcha\">\r\n                                        </div>\r\n                                    </div> -->\r\n                                </div>\r\n                            </div>\r\n                            <!--         <div class=\"row\">\r\n                                    <div class=\"col-3 pr-2\">\r\n                                        <i *ngIf=\"isChecked\" class=\"fa fa-check-square custom-check pull-right\" (click)=\"tooggle()\"></i>\r\n                                        <i *ngIf=\"!isChecked\" class=\"fa fa-square custom-check pull-right\" (click)=\"tooggle()\"></i>\r\n                                    </div>\r\n                                    <div class=\"col-9 pl-0\">\r\n                                        <label class=\"custom-label pull-left\">Remember me?</label>\r\n                                    </div>\r\n                                </div> -->\r\n                            <div class=\"row\" [hidden]=\"!isVerify\">\r\n                                <div class=\"col-12\">\r\n                                    <button type=\"submit\" [disabled]=\"forgotPassForm.invalid\"\r\n                                        style=\"margin-top:10px !important;\" class=\"custom-btn\">Submit</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"row mt-4\">\r\n                            <div class=\"col-12 pl-4 ml-2\">\r\n                                <label class=\"custom-label\">Click for go to login Page<a href=\"#\"\r\n                                        (click)=\"openLoginForm()\">Login</a></label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <div class=\"\" style=\"background-color: beige;\">\r\n                    <div class=\"form-container user-apply mt-2 p-3\" style=\" color: black;\">\r\n                        <h2 style=\"color: black;\"> <u> User Know How </u></h2>\r\n                        <p>1. <a (click)=\" openFeedBackModal(apModal)\">WHO CAN APPLY?</a></p>\r\n                        <p>2. <a (click)=\" openFeedBackModal(informationModal)\">INFORMATION WIZARD</a></p>\r\n                        <p>3. <a (click)=\" openFeedBackModal(thirdPartyVerify)\">THIRD PARTY VERIFICATION</a></p>\r\n                        <p>4. <a (click)=\"openFeedBackModal(serviceDashboard)\"> SERVICE DASHBOARD</a></p>\r\n                        <p>5. <a href=\"#myModal\" class=\"text-uppercase text-decoration-none text-black\"\r\n                                data-toggle=\"modal\">Stage wise timeline</a></p>\r\n                        <!-- <p>5. <a (click)=\"openFeedBackModal(stageWise)\"> Stage wise timeline</a></p> -->\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"text-center quote\">\r\n            <marquee direction=\"left\" width=\"95%\" height=\"40px\">\r\n                \"Every drop of water is precious. Use optimally by adopting recycle, reuse and zero discharge\r\n                technology\".\r\n            </marquee>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ng-template #apModal>\r\n    <div class=\"modal-header custom_header\">\r\n        <h4 class=\"modal-title pull-left\">Who Can Apply For Connection?</h4>\r\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body \">\r\n        <div class=\"row\">\r\n            <ol>\r\n                <li>Diary Farm</li>\r\n                <li>Paultry Farm</li>\r\n                <li>Hatchery</li>\r\n                <li>Country Liquor</li>\r\n                <li>Construction Of Road</li>\r\n                <li>Construction Of Building</li>\r\n                <li>Fishery</li>\r\n                <li>Port</li>\r\n                <li>Railway</li>\r\n                <li>Airport</li>\r\n                <li>Hospital</li>\r\n                <li>Garage</li>\r\n                <li>Institutions (IIT, NIGER, Engineering College, University etc.)</li>\r\n                <li>Offices (Government, Private)</li>\r\n                <li>PHD</li>\r\n                <li>RWS&S</li>\r\n                <li>IDCO (SPV)</li>\r\n                <li>Marketing Mall</li>\r\n                <li>Show Room</li>\r\n            </ol>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #informationModal>\r\n    <div class=\"\">\r\n        <div class=\"modal-header custom_header\">\r\n            <h4 class=\"modal-title pull-left\"> INFORMATION WIZARD</h4>\r\n            <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n        </div>\r\n        <div class=\"modal-body \">\r\n            <div class=\"card container\" style=\"height: 80vh; overflow-y: scroll; \">\r\n                <div class=\"card-body\" style=\"font-size: 14px !important;\">\r\n                    <h5>General Instruction</h5>\r\n                    <p class=\"text-justify\">Applicants seeking to establish an industrial, commercial and other units\r\n                        and in possession/allotted at least 25% of the requisite land can apply for Obtaining Water\r\n                        Connection for construction/operation/ miscellaneous purposes from the Department of Water\r\n                        Resources,\r\n                        Govt. of Odisha. The Department shall, after examining the requirements and comparing it with\r\n                        available benchmarks, recommend for issuing the connection.</p>\r\n                    <p class=\"text-justify\">Prior to applying to this service, if the applicant has applied for PEAL,\r\n                        the first section of the Approval of plan and permission to construct/extend/or take into use\r\n                        any building as a factory under the Factories Act, 1948 will get auto-populated\r\n                        from the PEAL form. Applicant who did not fill the PEAL form, will have to fill all the fields.\r\n                    </p>\r\n                    <p class=\"text-justify\">Fields marked with ‘*’ are mandatory and should be filled in before\r\n                        submitting the form on the single window portal. Leaving fields blank in the Form is not\r\n                        allowed. In case applicants wish not to enter data in a field, they can put “NA” if it\r\n                        is a text/description field or a “0”, if it is a numeric field. In case of errors, the form will\r\n                        show an error message. The applicant may correct the data and save the form again.\r\n                    </p>\r\n                    <p class=\"text-justify\">Some of the fields can accept multiple values. If the applicant wishes to\r\n                        furnish more than one item, he may use the “+” button to add more rows. Similarly, if he wishes\r\n                        to remove a row, he may use “x” button.</p>\r\n                    <p class=\"text-justify\">Applicants can attach documents in digital format as documentary evidences\r\n                        which the department will use for verification. Clicking on the choose button will let them\r\n                        select the document to be uploaded. Before submitting the document, they needs\r\n                        to ensure that all the information furnished by them is satisfactory and correct to the best of\r\n                        their knowledge and understanding. After checking that the information furnished in all the\r\n                        fields are in order, they can submit the application\r\n                        by clicking on the ‘Submit’ button.</p>\r\n                    <p class=\"text-justify\">After the form is successfully submitted, applicants can pay the required\r\n                        fees either online or offline. The fees required to be paid is as follows:</p>\r\n                    <div class=\"d-flex justify-content-center\">\r\n                        <table class=\"table table-sm  table-bordered text-center w-50\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Sl.No.</th>\r\n                                    <th>Fee Details</th>\r\n                                    <th>Amount to be Paid</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <th>1</th>\r\n                                    <td>Security Money</td>\r\n                                    <td>INR 1,50,000/- per cusec</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>2</th>\r\n                                    <td>Processing Fees</td>\r\n                                    <td>INR 1,000/-</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <p class=\"text-justify\">If the applicant wishes to pay offline, he may choose the ‘Over the Counter’\r\n                        option on the Cyber Treasury payment gateway. A challan with the account details of the\r\n                        department will then be generated. The applicant will take the hard copy of the\r\n                        challan to the nearest branch of the bank selected and deposit the amount either by Cash, or by\r\n                        means of Demand Draft. Once the fee is processed by the bank, the bank will send a transaction\r\n                        ID via SMS, which then will have to be entered on\r\n                        the Cyber Treasury portal to complete the application process.</p>\r\n                    <p class=\"text-justify\">Upon payment the applicant will receive an SMS & Email notification with the\r\n                        application number from the single window portal.</p>\r\n                    <h5>Checklist of Documents</h5>\r\n                    <p class=\"text-justify\">The applicant will need to attach the following documents with the\r\n                        application:</p>\r\n                    <ol class=\"ml-4\">\r\n                        <li class=\"mb-1\">Detailed Map/Drawing of Intake Location</li>\r\n                        <li class=\"mb-1\">Detailed Map/Drawing of Industry Location</li>\r\n                        <li class=\"mb-1\">Proof of MOU map-signed with the Government / Single window approval</li>\r\n                        <li class=\"mb-1\">Recommendation Letter from the Govt./Single Window Committee</li>\r\n                        <li class=\"mb-1\">Certificate from Competent Authority/Concerned Department of Govt. for\r\n                            Requisition of Water</li>\r\n                        <li class=\"mb-1\">Note on calculation of quantity of water required from Competent\r\n                            Authority/Concerned Department of Govt.</li>\r\n                        <li class=\"mb-1\">Layout of water drawal mechanism</li>\r\n                        <li class=\"mb-1\">Details of proposed water recycling systems (if applicable)</li>\r\n                        <li class=\"mb-1\">Details of waste water generated at site (if applicable)</li>\r\n                        <li class=\"mb-1\">Details about Quantity of effluent/method of disposal (if applicable)</li>\r\n                        <li class=\"mb-1\">Scheme of drawal of water</li>\r\n                        <li class=\"mb-1\">Lean period Water Management plan</li>\r\n                        <li>NOC from Central Ground Water Authority (CGWA)</li>\r\n                    </ol>\r\n                    <h5>Timeline</h5>\r\n                    <p class=\"text-justify\">Water Connection application is processed and disposed within <b>90 working\r\n                            days for Operational Water and 30 working days for Constructional Water</b> from the date of\r\n                        receipt of application. The department can however, raise queries on the application within 7\r\n                        working days of receipt of application. <a class=\"pdf-c\" href=\"../../../assets/pdf/24144_17082024_Inclusion_of_3_new_services_of_WaterResources.pdf\" target=\"_blank\">ORTPS Notification of the service.</a></p>\r\n                    <h5>Field Instructions</h5>\r\n                    <div class=\"d-flex justify-content-center\">\r\n                        <table class=\"table table-sm table-bordered text-center w-75\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Sl.No.</th>\r\n                                    <th>Field Name</th>\r\n                                    <th>Instruction</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <th>1</th>\r\n                                    <td class=\"text-nowrap\">Type</td>\r\n                                    <td class=\"text-left\">Select if water is required from IDCO supply or Department of\r\n                                        Water Resources.</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>2</th>\r\n                                    <td class=\"text-nowrap\">Name of the Applicant</td>\r\n                                    <td class=\"text-left\">Enter the name of the Applicant. The connection, if approved,\r\n                                        will be issued in the name of the Applicant.</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>3</th>\r\n                                    <td class=\"text-nowrap\">Purpose</td>\r\n                                    <td class=\"text-left\">Select the purpose of which the water will be used for from\r\n                                        the available options: Industrial/Commercial/Domestic/ Others. In case of\r\n                                        Others, specify the purpose.</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>4</th>\r\n                                    <td class=\"text-nowrap\">Capacity</td>\r\n                                    <td class=\"text-left\">Enter the present and proposed production capacity.</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>5</th>\r\n                                    <td class=\"text-nowrap\">Industry Details</td>\r\n                                    <td class=\"text-left\">All fields will get auto-filled from the PEAL form.</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>6</th>\r\n                                    <td class=\"text-nowrap\">Source of water for Operation</td>\r\n                                    <td class=\"text-left\">Select the source of water to be used for Operating the\r\n                                        industrial unit.<br /><br /> Please note, Ground water will only be provided for\r\n                                        operation if recommended by the Govt. of Odisha/Central Ground Water Authority\r\n                                        (CGWA).\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>7</th>\r\n                                    <td class=\"text-nowrap\">Phase wise requirement of water</td>\r\n                                    <td class=\"text-left\">Enter the details of water required during the\r\n                                        Pre-establishment, Construction, Operation, etc. phases.</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #thirdPartyVerify>\r\n    <div class=\"modal-header custom_header\">\r\n        <h4 class=\"modal-title pull-left\"> Third Party Verification</h4>\r\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body \">\r\n        <div class=\"mb-3\">\r\n            <label class=\"form-label\" for=\"\"> Application Number: </label>\r\n            <input class=\"form-control\" type=\"text\" name=\"\" id=\"\" placeholder=\"Enter Application Number\"\r\n                [(ngModel)]=\"appNum\">\r\n        </div>\r\n        <div class=\"\">\r\n            <div class=\"form-group row\">\r\n                <div class=\"col-6 px-0\">\r\n                    <div class=\"\" #phCaptcha [innerHtml]=\"captchaSvg\"></div>\r\n                </div>\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"fa fa-refresh captch-style\" style=\"cursor: pointer;\" aria-hidden=\"true\"\r\n                        (click)=\"getCaptchaApp()\"></i>\r\n                </div>\r\n                <div class=\"col-5 px-0\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Enter Captcha\" (keyup)=\"verifyCaptcha($event)\">\r\n                </div>\r\n                <div class=\"mt-3\">\r\n                    <button type=\"button\" class=\"btn btn-outline-primary\"\r\n                        (click)=\"getApplicationStatus()\">Submit</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"\">\r\n            <p>Status of the Application: <span>{{appStatus}}</span></p>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #serviceDashboard>\r\n    <div class=\"modal-header custom_header\">\r\n        <h4 class=\"modal-title pull-left\">Service Dashboard</h4>\r\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"\">\r\n            <p><b>Department -</b>Department of Water Resources</p>\r\n            <div class=\"row d-flex\" style=\"margin-bottom: 12px;\">\r\n                <div class=\"col-md-3 d-flex pl-0\">\r\n                    <label class=\"form-label\" for=\"\"> Start Date: </label>\r\n                    <input class=\"form-control\" type=\"date\" name=\"\" id=\"\" [(ngModel)]=\"startDate\"\r\n                        style=\"flex: 1;border-radius: 5px !important;\">\r\n                </div>\r\n                <div class=\"col-md-3 d-flex pl-0\">\r\n                    <label class=\"form-label\" for=\"\"> End Date: </label>\r\n                    <input class=\"form-control\" type=\"date\" name=\"\" id=\"\" [(ngModel)]=\"endDate\"\r\n                        style=\"flex: 1;border-radius: 5px !important;\">\r\n                </div>\r\n                <div class=\"col-md-3 d-flex pl-0\">\r\n                    <label class=\"form-label\" for=\"\"> Type of Investment: </label>\r\n                    <select class=\"form-select form-control  form-select-sm\" [(ngModel)]=\"investmentType\">\r\n                        <option value=\"\" selected>Select Investment Type</option>\r\n                        <option value=\"Domestic\">Domestic</option>\r\n                        <option value=\"Foreign\" disabled>Foreign</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-md-3 d-flex pl-0\">\r\n                    <label class=\"form-label\" for=\"\"> District: </label>\r\n                    <select class=\"form-select form-control form-select-sm\" [(ngModel)]=\"district\">\r\n                        <option value=\"\" disabled selected=\"selected\">Select District</option>\r\n                        <option *ngFor=\"let item of districtList\" [ngValue]=\"item\">{{ item.district_name }}</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-md-3 d-flex pl-0\">\r\n                    <label class=\"form-label\" for=\"\"> Risk Category: </label>\r\n                    <select class=\"form-select form-control form-select-sm\" [(ngModel)]=\"riskCategory\">\r\n                        <!-- <option selected>Open this</option> -->\r\n                        <option value=\"\" selected>No Risk Category Defined</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-md-3 d-flex pl-0\">\r\n                    <label class=\"form-label\" for=\"\"> Size of Firm : </label>\r\n                    <select class=\"form-select form-control form-select-sm\" [(ngModel)]=\"riskCategory\">\r\n                        <!-- <option selected>Open this</option> -->\r\n                        <option value=\"\" selected>No category defined</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                    <button type=\"submit\" class=\"btn btn-outline-primary\" (click)=\"submitDetails()\"\r\n                        style=\"padding: 0.3rem 0.75rem;\">Submit</button>\r\n                </div>\r\n            </div>\r\n            <!-- <p><b>From Date -</b>01-Mar-2023</p>\r\n             <p><b>To Date -</b>{{ currentDate | date: 'dd-MM-yyyy' }}</p> -->\r\n        </div>\r\n        <div class=\"row\" *ngIf=\"showDetails\">\r\n            <div class=\"col-md-3\"><b>From:</b> {{this.startDate | date: 'dd-MM-yyyy'}}</div>\r\n            <div class=\"col-md-3\"><b>To:</b> {{this.endDate | date: 'dd-MM-yyyy'}}</div>\r\n            <div class=\"col-md-3\"><b>Type of Investment:</b> {{this.investmentType}}</div>\r\n            <div class=\"col-md-3\"><b>District:</b> {{district?.district_name}}</div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n            <table class=\"table table-bordered table-stripped fs-14\">\r\n                <thead style=\"background-color: #dee2e6;\">\r\n                    <tr>\r\n                        <th>Sl No.</th>\r\n                        <th>Service</th>\r\n                        <th>Total Application Recieved</th>\r\n                        <th>Approved</th>\r\n                        <th>Rejected</th>\r\n                        <th>Total Application Pending</th>\r\n                        <th>Application Exceeds ORTPSA Timeline</th>\r\n                        <th>Mean</th>\r\n                        <th>Median</th>\r\n                        <th>ORTPSA Timeline</th>\r\n                        <th>Minimum Days Taken for Approval</th>\r\n                        <th>Maximum Days Taken for Approval</th>\r\n                        <th>Processing Fee (Average)</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let data of dashBoardData ; let i = index\">\r\n                        <td>{{i+1}}</td>\r\n                        <td>Permission to draw water</td>\r\n                        <td>{{ (data.TotalApplication - data.Draft) || 0 }}</td>\r\n                        <td (click)=\"openNewTab()\" style=\"cursor: pointer;\">{{ data.Completed || 0 }}</td>\r\n                        <td>{{ data.Rejected || 0 }}</td>\r\n                        <td>{{ data.Pending || 0 }}</td>\r\n                        <td>{{ data.count_gr_180 || 0 }}</td>\r\n                        <td>{{ data.mean || 0 }}</td>\r\n                        <td>{{ data.median || 0 }}</td>\r\n                        <td>180</td>\r\n                        <td>{{ data.min_duration || 0 }}</td>\r\n                        <td>{{ data.max_duration || 0 }}</td>\r\n                        <td>1000</td>\r\n                    </tr>\r\n                    <tr *ngFor=\"let data of dashBoardData\">\r\n                        <td></td>\r\n                        <td><b>Total</b></td>\r\n                        <td>{{ (data.TotalApplication - data.Draft) || 0 }}</td>\r\n                        <td (click)=\"openNewTab()\" style=\"cursor: pointer;\">{{ data.Completed || 0 }}</td>\r\n                        <td>{{ data.Rejected || 0 }}</td>\r\n                        <td>{{ data.Pending || 0 }}</td>\r\n                        <td>{{ data.count_gr_180 || 0 }}</td>\r\n                        <td>{{ data.mean || 0 }}</td>\r\n                        <td>{{ data.median || 0 }}</td>\r\n                        <td>180</td>\r\n                        <td>{{ data.min_duration || 0 }}</td>\r\n                        <td>{{ data.max_duration || 0 }}</td>\r\n                        <td>{{ ((data.TotalApplication || 0) - (data.Draft || 0)) * 1000 }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #stageWise>\r\n    <div class=\"modal-header custom_header\">\r\n        <h4 class=\"modal-title pull-left\">Flow Chart</h4>\r\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"\">\r\n            <p><a href=\"../../../assets/pdf/Flowchart-Process-OW.pdf\">Flow Chart of Operational Water</a></p>\r\n            <p><a href=\"../../../assets/pdf/Flowchart-Process-CW.pdf\">Flow Chart of Constructional Water</a></p>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" style=\"width: 50vw !important;margin-right: auto; margin-left: 25%;\">\r\n        <div class=\"modal-content\" style=\"width: 50vw !important;\">\r\n            <div class=\"modal-header custom_header\">\r\n                <h4 class=\"modal-title\">Flow Charts</h4>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">x</button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p><a href=\"../../../assets/pdf/Flowchart-Process-OW.pdf\" target=\"_blank\">Flow Chart of Operational Water</a></p>\r\n                <p><a href=\"../../../assets/pdf/Flowchart-Process-CW.pdf\" target=\"_blank\">Flow Chart of Constructional Water</a></p>\r\n            </div>\r\n            <!-- <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\r\n      </div> -->\r\n        </div><!-- /.modal-content -->\r\n    </div><!-- /.modal-dialog -->\r\n</div><!-- /.modal -->\r\n<div class=\"date\">\r\n    <label for=\"\">Last updated on: {{ currentDate | date: 'dd/MM/yyyy' }}</label>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/payment-response/payment-response/payment-response.component.html":
  /*!************************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/payment-response/payment-response/payment-response.component.html ***!
    \************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsPaymentResponsePaymentResponsePaymentResponseComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container-fluid main-box\">\r\n    <div class=\"dots\">\r\n        <h2><span>.</span><span>.</span><span>.</span></h2>\r\n    </div>\r\n\r\n    <div class=\"message\">\r\n        Please wait for a moment while we<br> process your payment.\r\n    </div>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/products/products.component.html":
  /*!***************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/products/products.component.html ***!
    \***************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsProductsProductsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"pl-0 pr-0\">\r\n\t<div class=\"row mt-0 ml-0 mr-0\">\r\n\t\t<div class=\"button-container\">\r\n\t\t\t<button type=\"button\" (click)=\"goBack()\" class=\"btn btn-primary go-back\">\r\n\t\t\t\t<i class=\"fa fa-chevron-left\"></i>\r\n\t\t\t\t<span class=\"back-text\">Go Back</span>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t\t<div class=\"col-sm-12 px-0 midContainer\">\r\n\t\t\t<div *ngIf=\"slideNo === 1\" [ngClass]=\"{'slide-right': isRight, 'slide-left': isLeft}\" class=\"row\">\r\n\t\t\t\t<div class=\"texture\">\r\n\t\t\t\t\t<div class=\"product-header\">Agriculture & Horticulture Products</div>\r\n\t\t\t\t\t<hr />\r\n\t\t\t\t\t<div class=\"row product-container\">\r\n\t\t\t\t\t\t<div class=\"col-5 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">GROUND NUT\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/ground_nuts.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc text-right\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tTermed commonly as 'Peanuts'. It\r\n\t\t\t\t\t\t\t\t\t\t\tis the favourite munchies of Man\r\n\t\t\t\t\t\t\t\t\t\t\tand Ape alike.\r\n\t\t\t\t\t\t\t\t\t\t\tGrown\r\n\t\t\t\t\t\t\t\t\t\t\tplentily\r\n\t\t\t\t\t\t\t\t\t\t\tin\r\n\t\t\t\t\t\t\t\t\t\t\teastern and western part of\r\n\t\t\t\t\t\t\t\t\t\t\tOdisha. It is a nut with\r\n\t\t\t\t\t\t\t\t\t\t\tmultiple applications which\r\n\t\t\t\t\t\t\t\t\t\t\tenable it\r\n\t\t\t\t\t\t\t\t\t\t\tto be\r\n\t\t\t\t\t\t\t\t\t\t\teaten raw, cooked, as flour, as\r\n\t\t\t\t\t\t\t\t\t\t\tbutter, as oil, and many more.\r\n\t\t\t\t\t\t\t\t\t\t\tDistricts where the product\r\n\t\t\t\t\t\t\t\t\t\t\tis\r\n\t\t\t\t\t\t\t\t\t\t\tcultivate are Bolangir, Cuttack,\r\n\t\t\t\t\t\t\t\t\t\t\tJajpur, Dhenkanal, Kendrapada,\r\n\t\t\t\t\t\t\t\t\t\t\tMayurbhanj, Puri, Kalahandi,\r\n\t\t\t\t\t\t\t\t\t\t\tSunderagrh etc.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">PHULA BADI\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/badi.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"120px\" width=\"120px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p class=\"pr-4\">\r\n\t\t\t\t\t\t\t\t\t\t\tThe flower shaped crunchy\r\n\t\t\t\t\t\t\t\t\t\t\tdelicacy is an essential element\r\n\t\t\t\t\t\t\t\t\t\t\tof Odia curries\r\n\t\t\t\t\t\t\t\t\t\t\tand has high demand in Odisha\r\n\t\t\t\t\t\t\t\t\t\t\tmarket. The soft and crispy item\r\n\t\t\t\t\t\t\t\t\t\t\tthat is\r\n\t\t\t\t\t\t\t\t\t\t\tspecially packaged to avoid\r\n\t\t\t\t\t\t\t\t\t\t\tdamage is produced by over 200\r\n\t\t\t\t\t\t\t\t\t\t\twomen groups in\r\n\t\t\t\t\t\t\t\t\t\t\tKeonjhar District of Odisha.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-1 px-0 text-center\">\r\n\t\t\t\t\t\t\t<hr />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-6 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">KALAJEERA RICE\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/kalajeera.jpg\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"100px\" width=\"80px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p class=\"pr-4\">\r\n\t\t\t\t\t\t\t\t\t\t\tKalajeera is Ethinic and\r\n\t\t\t\t\t\t\t\t\t\t\ttraditional variety of ancient\r\n\t\t\t\t\t\t\t\t\t\t\tlong grain white rice on\r\n\t\t\t\t\t\t\t\t\t\t\taminiature\r\n\t\t\t\t\t\t\t\t\t\t\tscale - like baby Basmati, a\r\n\t\t\t\t\t\t\t\t\t\t\tblack coloured small and oval\r\n\t\t\t\t\t\t\t\t\t\t\tgrain variety. It is cultivated\r\n\t\t\t\t\t\t\t\t\t\t\tin the lowlands by the tribal\r\n\t\t\t\t\t\t\t\t\t\t\tfarmers of koraput district.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">SPICES</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/turmeric.png\"\r\n\t\t\t\t\t\t\t\t\t\t\theight=\"160px\" width=\"180px\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\t<b>Turmeric</b> is one of the\r\n\t\t\t\t\t\t\t\t\t\t\tspices which gives a great\r\n\t\t\t\t\t\t\t\t\t\t\tcolour and texture\r\n\t\t\t\t\t\t\t\t\t\t\tto any kind of\r\n\t\t\t\t\t\t\t\t\t\t\tIndian Cuisine and works as a\r\n\t\t\t\t\t\t\t\t\t\t\tskincare. It is cultivated in an\r\n\t\t\t\t\t\t\t\t\t\t\torganic\r\n\t\t\t\t\t\t\t\t\t\t\tmanner in\r\n\t\t\t\t\t\t\t\t\t\t\tthe southern parts of Odisha\r\n\t\t\t\t\t\t\t\t\t\t\tcalled Haldi.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/ginger.png\"\r\n\t\t\t\t\t\t\t\t\t\t\theight=\"160px\" width=\"140px\">\r\n\t\t\t\t\t\t\t\t\t\t<p class=\"text-right\">\r\n\t\t\t\t\t\t\t\t\t\t\t<b>Ginger</b> is an organic\r\n\t\t\t\t\t\t\t\t\t\t\tproduct cultivated in an organic\r\n\t\t\t\t\t\t\t\t\t\t\tenvironment\r\n\t\t\t\t\t\t\t\t\t\t\twhich not only acts as an\r\n\t\t\t\t\t\t\t\t\t\t\telement iconic Indian Masala but\r\n\t\t\t\t\t\t\t\t\t\t\talso has its\r\n\t\t\t\t\t\t\t\t\t\t\tshare in medicinal elements too.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t\t<p><i>Both Ginger and Turmeric provide a\r\n\t\t\t\t\t\t\t\t\t\t\t\tsustainable income to\r\n\t\t\t\t\t\t\t\t\t\t\t\tthe tribal\r\n\t\t\t\t\t\t\t\t\t\t\t\tfarmers.</i></p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div *ngIf=\"slideNo === 2\" [ngClass]=\"{'slide-right': isRight, 'slide-left': isLeft}\" class=\"row\">\r\n\t\t\t\t<div class=\"texture\">\r\n\t\t\t\t\t<div class=\"product-header\">Non Timber Forest Products</div>\r\n\t\t\t\t\t<hr />\r\n\t\t\t\t\t<div class=\"row product-container\">\r\n\t\t\t\t\t\t<div class=\"col-5 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">ROCK BEE HONEY\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/honey.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc text-right\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tAs its name suggests the honey\r\n\t\t\t\t\t\t\t\t\t\t\tis derived from the wild rock\r\n\t\t\t\t\t\t\t\t\t\t\tbees that\r\n\t\t\t\t\t\t\t\t\t\t\tcreate colonies under\r\n\t\t\t\t\t\t\t\t\t\t\tinaccessible rock cliffs and\r\n\t\t\t\t\t\t\t\t\t\t\thuge tree trunks. ORMAS\r\n\t\t\t\t\t\t\t\t\t\t\thas trained the primary honey\r\n\t\t\t\t\t\t\t\t\t\t\tcollectors in the forest areas:\r\n\t\t\t\t\t\t\t\t\t\t\ton collection\r\n\t\t\t\t\t\t\t\t\t\t\tof honey and processing of same\r\n\t\t\t\t\t\t\t\t\t\t\tusing low cost and simple\r\n\t\t\t\t\t\t\t\t\t\t\ttechniques to\r\n\t\t\t\t\t\t\t\t\t\t\tretain its natural and medical\r\n\t\t\t\t\t\t\t\t\t\t\tvalues. It is found in the\r\n\t\t\t\t\t\t\t\t\t\t\tforest and hills\r\n\t\t\t\t\t\t\t\t\t\t\tof Mayurbhanj, Nuapada and other\r\n\t\t\t\t\t\t\t\t\t\t\tforest based districts of\r\n\t\t\t\t\t\t\t\t\t\t\tOdisha.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">LEAF CUP\r\n\t\t\t\t\t\t\t\t\tPLATES</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/leafplates.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p class=\"pr-4\">\r\n\t\t\t\t\t\t\t\t\t\t\tNature's true gift in the shape\r\n\t\t\t\t\t\t\t\t\t\t\tof Siali leaves which gives us a\r\n\t\t\t\t\t\t\t\t\t\t\ttruly\r\n\t\t\t\t\t\t\t\t\t\t\teco-friendly disposable plate is\r\n\t\t\t\t\t\t\t\t\t\t\tfound in the forest belts of\r\n\t\t\t\t\t\t\t\t\t\t\tOdisha. They\r\n\t\t\t\t\t\t\t\t\t\t\tare collected, stiched and dried\r\n\t\t\t\t\t\t\t\t\t\t\tunder the sun, machine pressed\r\n\t\t\t\t\t\t\t\t\t\t\twith\r\n\t\t\t\t\t\t\t\t\t\t\tcardboard and lminated and are\r\n\t\t\t\t\t\t\t\t\t\t\tready for sale. ORMAS has\r\n\t\t\t\t\t\t\t\t\t\t\tpioneered this\r\n\t\t\t\t\t\t\t\t\t\t\tproduct nationwise over the past\r\n\t\t\t\t\t\t\t\t\t\t\t15 years.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-1 px-0 text-center\">\r\n\t\t\t\t\t\t\t<hr />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-6 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">BROOM</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/hill_broom.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"180px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\t<b>Hill Broom</b> grass grows on\r\n\t\t\t\t\t\t\t\t\t\t\thilly forest slopes of parts of\r\n\t\t\t\t\t\t\t\t\t\t\tSouthern\r\n\t\t\t\t\t\t\t\t\t\t\tOdisha. It also serves as a\r\n\t\t\t\t\t\t\t\t\t\t\tmajor source of livelihood to\r\n\t\t\t\t\t\t\t\t\t\t\tthe tribal poor of\r\n\t\t\t\t\t\t\t\t\t\t\tthis region. The raw grass is\r\n\t\t\t\t\t\t\t\t\t\t\tproperly harvested, collected,\r\n\t\t\t\t\t\t\t\t\t\t\tdried and\r\n\t\t\t\t\t\t\t\t\t\t\tstored. Trained by ORMAS, the\r\n\t\t\t\t\t\t\t\t\t\t\ttribals bind it in proper length\r\n\t\t\t\t\t\t\t\t\t\t\tand size and\r\n\t\t\t\t\t\t\t\t\t\t\tcap it with a user friendly\r\n\t\t\t\t\t\t\t\t\t\t\tplastic handle to make it\r\n\t\t\t\t\t\t\t\t\t\t\tacceptable in urban\r\n\t\t\t\t\t\t\t\t\t\t\tmarket, as a qualitative\r\n\t\t\t\t\t\t\t\t\t\t\tproduct.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container pt-4\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\t<b>Thorn Broom</b> is used\r\n\t\t\t\t\t\t\t\t\t\t\twidely in outdoor cleaning\r\n\t\t\t\t\t\t\t\t\t\t\tpurposes. This variant\r\n\t\t\t\t\t\t\t\t\t\t\tof broom is derived out of raw\r\n\t\t\t\t\t\t\t\t\t\t\tmaterials grown in western part\r\n\t\t\t\t\t\t\t\t\t\t\tof Odisha.\r\n\t\t\t\t\t\t\t\t\t\t\tThe combination and stiffness of\r\n\t\t\t\t\t\t\t\t\t\t\tthis broom makes it highly\r\n\t\t\t\t\t\t\t\t\t\t\teffective on\r\n\t\t\t\t\t\t\t\t\t\t\trough surfaces.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container pt-4\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/stick_broom.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"180px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p class=\"text-right\">\r\n\t\t\t\t\t\t\t\t\t\t\t<b>Coco Broom(Stick Broom)</b>\r\n\t\t\t\t\t\t\t\t\t\t\tis the most raw and unfinished\r\n\t\t\t\t\t\t\t\t\t\t\tform of broom.\r\n\t\t\t\t\t\t\t\t\t\t\tIt is made up of coconut tree\r\n\t\t\t\t\t\t\t\t\t\t\tleaves and raw coconut sticks,\r\n\t\t\t\t\t\t\t\t\t\t\tspecifically\r\n\t\t\t\t\t\t\t\t\t\t\tdesigned to clean rough surfaces\r\n\t\t\t\t\t\t\t\t\t\t\tlike roads and spaces between\r\n\t\t\t\t\t\t\t\t\t\t\tstones. The\r\n\t\t\t\t\t\t\t\t\t\t\tsturdiness of the brooms helps\r\n\t\t\t\t\t\t\t\t\t\t\tit find usage in the industrial\r\n\t\t\t\t\t\t\t\t\t\t\tsector as\r\n\t\t\t\t\t\t\t\t\t\t\twell as household usage.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div *ngIf=\"slideNo === 3\" [ngClass]=\"{'slide-right': isRight, 'slide-left': isLeft}\" class=\"row\">\r\n\t\t\t\t<div class=\"texture\">\r\n\t\t\t\t\t<div class=\"product-header\">Handicrafts</div>\r\n\t\t\t\t\t<hr />\r\n\t\t\t\t\t<div class=\"row product-container\">\r\n\t\t\t\t\t\t<div class=\"col-5 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">SABAI CRAFTS\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/sabai.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc text-right\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tSabai also known as Natural\r\n\t\t\t\t\t\t\t\t\t\t\tPlastics is a weaving wonder\r\n\t\t\t\t\t\t\t\t\t\t\tstrainght from the\r\n\t\t\t\t\t\t\t\t\t\t\theart of rural Odisha, is indeed\r\n\t\t\t\t\t\t\t\t\t\t\tjust a form of dried grass which\r\n\t\t\t\t\t\t\t\t\t\t\tis boiled\r\n\t\t\t\t\t\t\t\t\t\t\tand sun dried until it turns\r\n\t\t\t\t\t\t\t\t\t\t\tochre, following which the\r\n\t\t\t\t\t\t\t\t\t\t\tcraftsmen plait and\r\n\t\t\t\t\t\t\t\t\t\t\tweave the strands to create\r\n\t\t\t\t\t\t\t\t\t\t\tmaster pieces. Women bags, table\r\n\t\t\t\t\t\t\t\t\t\t\tmats, floor\r\n\t\t\t\t\t\t\t\t\t\t\tmats and many other decorative\r\n\t\t\t\t\t\t\t\t\t\t\tand utility items are made and\r\n\t\t\t\t\t\t\t\t\t\t\tmarketed.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">TRIBAL\r\n\t\t\t\t\t\t\t\t\tJEWELLERY</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/tribal-1.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc text-right\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tCrafted from anything like Clay,\r\n\t\t\t\t\t\t\t\t\t\t\tWood, Metal, Beads, Bones, Shell\r\n\t\t\t\t\t\t\t\t\t\t\tand Stones in tribal abods od\r\n\t\t\t\t\t\t\t\t\t\t\tOdisha\r\n\t\t\t\t\t\t\t\t\t\t\t,each item captures the rawness\r\n\t\t\t\t\t\t\t\t\t\t\tof tribal\r\n\t\t\t\t\t\t\t\t\t\t\tforms ans the unpretentious\r\n\t\t\t\t\t\t\t\t\t\t\trustic elegance\r\n\t\t\t\t\t\t\t\t\t\t\tof thier tribes. Each of the\r\n\t\t\t\t\t\t\t\t\t\t\tjewellery has a\r\n\t\t\t\t\t\t\t\t\t\t\tstory to tell and each piece\r\n\t\t\t\t\t\t\t\t\t\t\tpul-state the\r\n\t\t\t\t\t\t\t\t\t\t\tenergy of that story.\r\n\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-1 px-0 text-center\">\r\n\t\t\t\t\t\t\t<hr />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-6 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">APPLIQUE</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/applique.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"250px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tIt is indeed one the most\r\n\t\t\t\t\t\t\t\t\t\t\toldest and finest of the crafts\r\n\t\t\t\t\t\t\t\t\t\t\tof the state which uses\r\n\t\t\t\t\t\t\t\t\t\t\tdifferent patches of fabric.\r\n\t\t\t\t\t\t\t\t\t\t\tBeautiful and forms of floral\r\n\t\t\t\t\t\t\t\t\t\t\tand animal deisgn to prepare\r\n\t\t\t\t\t\t\t\t\t\t\twall hangings, Mordern\r\n\t\t\t\t\t\t\t\t\t\t\thosusehold products ans apperals\r\n\t\t\t\t\t\t\t\t\t\t\tby peicing cloth together\r\n\t\t\t\t\t\t\t\t\t\t\tdifferent patterns are made\r\n\t\t\t\t\t\t\t\t\t\t\tby applying different colors.\r\n\t\t\t\t\t\t\t\t\t\t\tColorful ans vivid shapes and\r\n\t\t\t\t\t\t\t\t\t\t\tforms of fabric patched together\r\n\t\t\t\t\t\t\t\t\t\t\tor on another surfaces create\r\n\t\t\t\t\t\t\t\t\t\t\tthe most attractive and vibrant\r\n\t\t\t\t\t\t\t\t\t\t\ttextile products. its a\r\n\t\t\t\t\t\t\t\t\t\t\ttradition\r\n\t\t\t\t\t\t\t\t\t\t\tin ancient town to Pipili\r\n\t\t\t\t\t\t\t\t\t\t\todisha.\r\n\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">HORN CRAFT</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/horncraft.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"200px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tYet another wonder from rural Odisha, carved out of dead animal horns, this\r\n\t\t\t\t\t\t\t\t\t\t\tart ages back to centuries with transition in products now reaching out to\r\n\t\t\t\t\t\t\t\t\t\t\tpen-stands, combs, ornaments, flower vases and others. The products are\r\n\t\t\t\t\t\t\t\t\t\t\tcarved out of the solid part of horns after soaking it in water and then\r\n\t\t\t\t\t\t\t\t\t\t\theating it to a specific temperature; it is smoothened with a sharp steel\r\n\t\t\t\t\t\t\t\t\t\t\tblade and further pulished with charcoal ass and smeared with oil to give it\r\n\t\t\t\t\t\t\t\t\t\t\tsheen.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div *ngIf=\"slideNo === 4\" [ngClass]=\"{'slide-right': isRight, 'slide-left': isLeft}\" class=\"row\">\r\n\t\t\t\t<div class=\"texture\">\r\n\t\t\t\t\t<div class=\"product-header\">Handlooms</div>\r\n\t\t\t\t\t<hr />\r\n\t\t\t\t\t<div class=\"row product-container\">\r\n\t\t\t\t\t\t<div class=\"col-5 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">MANIABANDHA</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/maniabandhi.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc text-right\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tMade by the members of a migratory Buddhist\r\n\t\t\t\t\t\t\t\t\t\t\tCommunity, these sarees have become a partsof Odisha's\r\n\t\t\t\t\t\t\t\t\t\t\tculture since time immemmorial at maniabandh, the dwelling\r\n\t\t\t\t\t\t\t\t\t\t\tplace of this community weaving is an age old tradition,\r\n\t\t\t\t\t\t\t\t\t\t\tpassed on by one generation to another ehile finding a respectable\r\n\t\t\t\t\t\t\t\t\t\t\tposition in the national as well as overseas market.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"float-right product-sub-head\">KOTPAD SAREES</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-left\" src=\"assets/images/products/kotpad.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"150px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc text-right\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tKotpad a small town in odisha is the\r\n\t\t\t\t\t\t\t\t\t\t\thome to an age old unique innovation\r\n\t\t\t\t\t\t\t\t\t\t\thammesingh natural resources, like the roots\r\n\t\t\t\t\t\t\t\t\t\t\tand the bark of forest tree aul into eco friendly\r\n\t\t\t\t\t\t\t\t\t\t\tand skin loving handlooms. The tree parts are used\r\n\t\t\t\t\t\t\t\t\t\t\t2-3 times in a seriese to dye the fabric as per necessary\r\n\t\t\t\t\t\t\t\t\t\t\tcolor depth and then woven into Saree, Dupatta and stoles.\r\n\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-1 px-0 text-center\">\r\n\t\t\t\t\t\t\t<hr />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-6 px-0\">\r\n\t\t\t\t\t\t\t<div class=\"individual-product\">\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">BOMKAI</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/bomkai.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"180px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tProduced in Subarnapur District of Odisha\r\n\t\t\t\t\t\t\t\t\t\t\tthis is the ace handloom product of Odisha.\r\n\t\t\t\t\t\t\t\t\t\t\tit is the sheer contrast element of \"Tie&Dye\"\r\n\t\t\t\t\t\t\t\t\t\t\tand attractive colors that make these sarees a\r\n\t\t\t\t\t\t\t\t\t\t\thot moving commodity in india and beyond, Introduction\r\n\t\t\t\t\t\t\t\t\t\t\tof the jaquard technology with CAD(Computer aded design)\r\n\t\t\t\t\t\t\t\t\t\t\twith ORMAS support has helped weaver to produce market\r\n\t\t\t\t\t\t\t\t\t\t\toriented designs in less time. This variety of handloom is\r\n\t\t\t\t\t\t\t\t\t\t\tnot only known for its heritage and traditon of excellent\r\n\t\t\t\t\t\t\t\t\t\t\tcraftsmanship but alos provides livelihood to millions of\r\n\t\t\t\t\t\t\t\t\t\t\tweavers\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"float-left product-sub-head\">KANTHA STITCH SAREE</div>\r\n\t\t\t\t\t\t\t\t<div class=\"inner-container\">\r\n\t\t\t\t\t\t\t\t\t<img class=\"prduct-image float-right\" src=\"assets/images/products/kanthastitch.png\"\r\n\t\t\t\t\t\t\t\t\t\theight=\"180px\" width=\"200px\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"product-desc\">\r\n\t\t\t\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\t\t\t\tA wornder product made by randomly stitching\r\n\t\t\t\t\t\t\t\t\t\t\tone piece of clothe on another to create eclusite\r\n\t\t\t\t\t\t\t\t\t\t\tmotifs of animals, birds, flowers and other themes from\r\n\t\t\t\t\t\t\t\t\t\t\teveryday life creatin a wavy rumpled and used effect is what\r\n\t\t\t\t\t\t\t\t\t\t\tgive the craft it product value.\r\n\t\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t\t<div class=\"row slider-button-container\">\r\n\t\t\t<div class=\"col-12 px-0\">\r\n\t\t\t\t<div class=\"sliderButton-1\">\r\n\t\t\t\t\t<button class=\"btn btn-defaul btn-lg\" (click)=\"prevSlide()\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-chevron-left\"></i></button>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"sliderButton-2\">\r\n\t\t\t\t\t<button class=\"btn btn-default btn-lg\" (click)=\"nextSlide()\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-chevron-right\"></i></button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/redirect-data/redirect-data.component.html":
  /*!*************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/redirect-data/redirect-data.component.html ***!
    \*************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsRedirectDataRedirectDataComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\r\n<div class=\"container-fluid main-container px-0 mb-3\" style=\"border-bottom: 5px solid blue;\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n      <div class=\"row\">\r\n        <div class=\"col-3 od-logo\"><img src=\"assets/icon/odisha_logo_blue.png\"></div>\r\n        <div class=\"col-9 wtr-logo\"><img src=\"assets/images/WaterLogin/Govt. of Odisha.png\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-7 offset-sm-1 right-menu ng-star-inserted\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-12 px-0\">\r\n          <div class=\"row welcom-menu\">\r\n            <div class=\"col-2\"><img class=\"profile-img\" src=\"assets/images/profile.svg\"></div>\r\n            <div class=\"col-10\" style=\"text-align: center;\">\r\n              <div class=\"row mt-4\"> Welcome To </div>\r\n              <div class=\"row mt-0 text-capitalize\"> Online Water Allocation System </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        \r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container\">\r\n  <input type=\"number\" class=\"form-control\" placeholder=\"Search by Application ID\" [(ngModel)]=\"searchText\" />\r\n  <h2>List of Approved Applications </h2>\r\n  <div class=\"\" style=\"height: 50vh; overflow-y: scroll;\">\r\n    <table class=\"table table-sm table-striped table-bordered table-hover custom-th\">\r\n      <thead >\r\n        <th>S.no</th>\r\n        <th>Application ID</th>\r\n        <th>Start Date</th>\r\n        <th>End Date</th>\r\n        <th>Fee (in INR)</th>\r\n      </thead>\r\n      <tr class=\"text-center\" *ngFor=\"let tableData of tableData | searchText:searchText ;  let i = index\" >\r\n        <td>{{ i + 1 }}</td>\r\n        <td>{{ tableData.id | maskId }}</td>\r\n        <td>{{ tableData.start_date | date: 'dd-MM-yyyy' }}</td>\r\n        <td>{{ tableData.end_date | date: 'dd-MM-yyyy' }}</td>\r\n        <td>1000</td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/user-profile/user-profile.component.html":
  /*!***********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/user-profile/user-profile.component.html ***!
    \***********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsUserProfileUserProfileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"profile-outer-container\">\r\n\t<header>\r\n\t\t<div class=\"title\">\r\n\t\t\t<span class=\"img-fluid\">\r\n\t\t\t\t<img class=\"logo\" src=\"assets/icon/odisha_logo.png\" alt=\"Logo\" />\r\n\t\t\t</span>\r\n\t\t\t<span class=\"lg-title\">User Profile</span>\r\n\t\t\t<span class=\"back-button\" title=\"Go Back\" (click)=\"goBackToPage()\">\r\n\t\t\t\t<i class=\"fa fa-reply \"></i>\r\n\t\t\t\t<span>Back</span>\r\n\t\t\t</span>\r\n\t\t</div>\r\n\t</header>\r\n\t<div class=\"profile-card\">\r\n\t\t<div class=\"text-center\" *ngIf=\"isEdit\">\r\n\t\t\t<div class=\"float-right\">\r\n\t\t\t\t<button class=\"btn btn-primary\" (click)=\"toggleEdit()\"><i\r\n\t\t\t\t\t\tclass=\"fa fa-edit\"></i></button>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"image-container text-center\">\r\n\t\t\t\t<img src=\"assets/images/image_placeholder.png\"\r\n\t\t\t\t\tclass=\"img-fluid rounded-circle profile-image\">\r\n\t\t\t</div>\r\n\t\t\t<div class=\"title\">\r\n\t\t\t\t<span class=\"name\">{{userProfileDetails.userName}}</span> <br />\r\n\t\t\t\t<span class=\"role\">{{userProfileDetails.roleName}}</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"details\">\r\n\t\t\t\t<span>{{userProfileDetails.mobileNo}}</span><br />\r\n\t\t\t\t<span>{{userProfileDetails.emailId}}</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"org-title\">\r\n\t\t\t\t{{userProfileDetails.orgName}}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div *ngIf=\"!isEdit\">\r\n\t\t\t<form [formGroup]=\"userProfileForm\" (ngSubmit)=\"submitUserDetails(userProfileForm.value)\">\r\n\t\t\t\t<div class=\"float-right\">\r\n\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"toggleEdit()\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-eye\"></i></button>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"image-container text-center\">\r\n\t\t\t\t\t<img src=\"assets/images/image_placeholder.png\"\r\n\t\t\t\t\t\tclass=\"img-fluid rounded-circle profile-image\">\r\n\t\t\t\t\t<div class=\"image-edit-container\">\r\n\t\t\t\t\t\t<i class=\"fa fa-edit\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"input-group row px-4 pt-1\">\r\n\t\t\t\t\t<div class=\"input-group-prepend icon-box\">\r\n\t\t\t\t\t\t<i class=\"input-group-text pt-2 fa fa-user customized-icon\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<input type=\"text\" placeholder=\"User Name\" autocomplete=\"off\"\r\n\t\t\t\t\t\tclass=\"col-12 form-control\" formControlName=\"userName\" id=\"userName\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"input-group row px-4 pt-1\">\r\n\t\t\t\t\t<div class=\"input-group-prepend icon-box\">\r\n\t\t\t\t\t\t<i class=\"input-group-text pt-2 fa fa-phone customized-icon\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<input type=\"text\" placeholder=\"Mobile Number\" autocomplete=\"off\"\r\n\t\t\t\t\t\tclass=\"col-12 form-control\" formControlName=\"mobileNo\" id=\"mobileNo\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"input-group row px-4 pt-1\">\r\n\t\t\t\t\t<div class=\"input-group-prepend icon-box\">\r\n\t\t\t\t\t\t<i class=\"input-group-text pt-2 fa fa-envelope customized-icon\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<input type=\"text\" placeholder=\"Email ID\" autocomplete=\"off\"\r\n\t\t\t\t\t\tclass=\"col-12 form-control\" formControlName=\"emailId\" id=\"emailId\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"text-center px-4 pt-1\">\r\n\t\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\"> Save</button>\r\n\t\t\t\t</div>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\t</div>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/modules/chatbot/chatbot.component.html":
  /*!****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/modules/chatbot/chatbot.component.html ***!
    \****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesModulesChatbotChatbotComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"icon\" (click)=\"open()\">\r\n    <i class=\"fa fa-comments\" style=\"font-size: 35px;\"></i>\r\n    <!-- <p>chatbot works!</p> -->\r\n</div>\r\n<div class=\"chatbot\" [(hidden)]=\"!flag\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\">\r\n            Chat with us.\r\n            <div class=\"icon_close\" (click)=\"close()\">\r\n                <a> <i class=\"fa fa-close\"></i></a>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <ul class=\"messages\" id=\"messages\" >\r\n                <li [ngClass]=\"x.class\" *ngFor=\"let x of data\">{{x.text}}</li>\r\n                <!-- <li class=\"self\">Welcome..</li> -->\r\n                <!-- <li class=\"other\">{{fake}}</li> -->\r\n            </ul>\r\n            <!-- <h5 class=\"card-title\">Special title treatment</h5>\r\n          <p class=\"card-text\">With supporting text below as a natural lead-in to additional content.</p> -->\r\n            <!-- <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a> -->\r\n        </div>\r\n        <div class=\"card-footer \">\r\n            <div class=\"Input Input-blank\">\r\n                <input class=\"Input_field\" placeholder=\"Send a message...\" value=\"\" [(ngModel)]=\"fake\" id=\"field\">\r\n                <button class=\"Input_button Input_button-send\" (click)=\"submit()\">\r\n                  <div class=\"Icon\" style=\"width: 18px; height: 18px;\">\r\n                    <svg width=\"57px\" height=\"54px\" viewBox=\"1496 193 57 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"width: 18px; height: 18px;\">\r\n                      <g id=\"Group-9-Copy-3\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)\">\r\n                        <path d=\"M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C50.8414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z\" id=\"sendicon\" fill=\"#96AAB4\" fill-rule=\"nonzero\"></path>\r\n                      </g>\r\n                    </svg>\r\n                  </div>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
    /***/
  },

  /***/
  "./node_modules/tslib/tslib.es6.js":
  /*!*****************************************!*\
    !*** ./node_modules/tslib/tslib.es6.js ***!
    \*****************************************/

  /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */

  /***/
  function node_modulesTslibTslibEs6Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__extends", function () {
      return __extends;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__assign", function () {
      return _assign;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__rest", function () {
      return __rest;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__decorate", function () {
      return __decorate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__param", function () {
      return __param;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__metadata", function () {
      return __metadata;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__awaiter", function () {
      return __awaiter;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__generator", function () {
      return __generator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__createBinding", function () {
      return __createBinding;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__exportStar", function () {
      return __exportStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__values", function () {
      return __values;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__read", function () {
      return __read;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spread", function () {
      return __spread;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () {
      return __spreadArrays;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__await", function () {
      return __await;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () {
      return __asyncGenerator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () {
      return __asyncDelegator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncValues", function () {
      return __asyncValues;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () {
      return __makeTemplateObject;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importStar", function () {
      return __importStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importDefault", function () {
      return __importDefault;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function () {
      return __classPrivateFieldGet;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function () {
      return __classPrivateFieldSet;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
    
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */


    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return _assign.apply(this, arguments);
    };

    function __rest(s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }

    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    }

    function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }

    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    function __createBinding(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    }

    function __exportStar(m, exports) {
      for (var p in m) {
        if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
      }
    }

    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function next() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
          ar.push(r.value);
        }
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }

    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
      }

      return ar;
    }

    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
        s += arguments[i].length;
      }

      for (var r = Array(s), k = 0, i = 0; i < il; i++) {
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
          r[k] = a[j];
        }
      }

      return r;
    }

    ;

    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i;

      function verb(n) {
        if (g[n]) i[n] = function (v) {
          return new Promise(function (a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }

      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }

      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }

      function fulfill(value) {
        resume("next", value);
      }

      function reject(value) {
        resume("throw", value);
      }

      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }

    function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
      }), verb("return"), i[Symbol.iterator] = function () {
        return this;
      }, i;

      function verb(n, f) {
        i[n] = o[n] ? function (v) {
          return (p = !p) ? {
            value: __await(o[n](v)),
            done: n === "return"
          } : f ? f(v) : v;
        } : f;
      }
    }

    function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator],
          i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i);

      function verb(n) {
        i[n] = o[n] && function (v) {
          return new Promise(function (resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }

      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
          resolve({
            value: v,
            done: d
          });
        }, reject);
      }
    }

    function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
          value: raw
        });
      } else {
        cooked.raw = raw;
      }

      return cooked;
    }

    ;

    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    }

    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
      }

      return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
      }

      privateMap.set(receiver, value);
      return value;
    }
    /***/

  },

  /***/
  "./src/$$_lazy_route_resource lazy recursive":
  /*!**********************************************************!*\
    !*** ./src/$$_lazy_route_resource lazy namespace object ***!
    \**********************************************************/

  /*! no static exports found */

  /***/
  function src$$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var AppComponent =
    /* @HostListener('window:beforeunload', [ '$event' ])
    beforeUnloadHandler(event) {
      localStorage.clear();
    } */
    function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.title = 'Water Resource';
      this.auth = false;

      if (window.location !== window.parent.location) {
        this.auth = false;
      } else {
        this.auth = true;
      }
    };

    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.constants.ts":
  /*!**********************************!*\
    !*** ./src/app/app.constants.ts ***!
    \**********************************/

  /*! exports provided: AppConstants */

  /***/
  function srcAppAppConstantsTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppConstants", function () {
      return AppConstants;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! environments/environment */
    "./src/environments/environment.ts");

    var AppConstants = /*#__PURE__*/function () {
      function AppConstants() {
        _classCallCheck(this, AppConstants);
      }

      _createClass(AppConstants, null, [{
        key: "BASE_API_URL",
        // BASE URL FOR THE HTTP SERVICES
        get: function get() {
          if (environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production && environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].name !== 'DEVSTAG') {
            // PRODUCTION SERVER PATH
            var SERVER_LOC = window.location.href.split('#')[0].split('/')[2]; // JSON.parse(sessionStorage.getItem('apiServerLocationDtls'));
            // return 'http://' + SERVER_LOC + '/dowr/';
            // return 'https://10.242.78.182/dowr/';
            // return 'https://waterallocationod.nic.in/dowr/';

            return 'http://localhost:443/dowr/'; // return 'https://waterallocation.odisha.gov.in/dowr/';
          } else {
            // DEVELOPMENT SERVER PATH
            // return 'http://192.168.0.162:3002/dowr/';
            //return 'https://164.100.140.147/dowr/';
            return 'http://localhost:443/dowr/'; // return 'https://waterallocation.odisha.gov.in/dowr/';
            // return 'https://waterallocationod.nic.in/dowr/';
            // return 'https://10.242.78.182/dowr/';
          }
        } // AUTHORIZATION HEADER FOR GETTTING ACCESS TOKEN //

      }, {
        key: "LOGIN_AUTHORIZATION_HEADER",
        get: function get() {
          return 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0';
        }
      }, {
        key: "AUTHORIZATION_HEADER",
        get: function get() {
          return sessionStorage.getItem('access_token');
        } // USED TO GET MENU TYPE //

      }, {
        key: "MENU_TYPE",
        get: function get() {
          return {
            VMENU: 101,
            HMENU: 102,
            CMENU: 103
          };
        }
      }]);

      return AppConstants;
    }(); // For Financial year limit


    AppConstants.VIEW_FIN_YR_LIMIT = 3;
    AppConstants.SET_FIN_YR_LIMIT = 2; // STORE ACESS TOKEN COMPLETE DETAILS

    AppConstants.ACCESS_DETAILS = {}; // DASHBOARD VALUE

    AppConstants.DASHBOARD_DRIVE = 'ALL'; // SESSION TIMOUT VALUE IN SECONDS

    AppConstants.SESSION_CHECKER = 10;
    AppConstants.SESSION_PRE_CHECK = 300;
    AppConstants.ITEM_ENCODE_ITERATOR = 1;
    AppConstants.DECODE_ITERATOR = 1;
    AppConstants.DECODE_KEY = '0eef9a9d9ccb8ea0fbb21e03ad2c6609e1b98de53c0bcd084c23c0ca8376f6c7'; // 'MY SESSION STORAGE ENCODING TEST';
    // PASSWORD ENCODING TIME

    AppConstants.PASSWORD_ENCODING_TIMES = 2; // RELOAD MESSAGE

    AppConstants.RELOAD_MESS = 'You are using an older version of project. So, click on okay to get new version of it'; // LOOKUP MENU

    AppConstants.LOOKUP_MENU_MAX_LENGTH = 5;
    AppConstants = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], AppConstants);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-bootstrap */
    "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _app_routing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./app.routing */
    "./src/app/app.routing.ts");
    /* harmony import */


    var _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./components/change-password/change-password.component */
    "./src/app/components/change-password/change-password.component.ts");
    /* harmony import */


    var _components_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ./components/forgot-password/forgot-password.component */
    "./src/app/components/forgot-password/forgot-password.component.ts");
    /* harmony import */


    var _components_error_error401_error401_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ./components/error/error401/error401.component */
    "./src/app/components/error/error401/error401.component.ts");
    /* harmony import */


    var _components_error_error404_error404_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./components/error/error404/error404.component */
    "./src/app/components/error/error404/error404.component.ts");
    /* harmony import */


    var _components_error_error500_error500_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./components/error/error500/error500.component */
    "./src/app/components/error/error500/error500.component.ts");
    /* harmony import */


    var _components_login_login_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./components/login/login.component */
    "./src/app/components/login/login.component.ts");
    /* harmony import */


    var _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./components/user-profile/user-profile.component */
    "./src/app/components/user-profile/user-profile.component.ts");
    /* harmony import */


    var _components_products_products_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./components/products/products.component */
    "./src/app/components/products/products.component.ts");
    /* harmony import */


    var _services_ErrorHandler_client_error_handler_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./services/ErrorHandler/client-error-handler.service */
    "./src/app/services/ErrorHandler/client-error-handler.service.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _components_change_password_change_password_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ./components/change-password/change-password.service */
    "./src/app/components/change-password/change-password.service.ts");
    /* harmony import */


    var _components_payment_response_payment_response_payment_response_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! ./components/payment-response/payment-response/payment-response.component */
    "./src/app/components/payment-response/payment-response/payment-response.component.ts");
    /* harmony import */


    var _pages_modules_chatbot_chatbot_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./pages/modules/chatbot/chatbot.component */
    "./src/app/pages/modules/chatbot/chatbot.component.ts");
    /* harmony import */


    var _components_redirect_data_redirect_data_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! ./components/redirect-data/redirect-data.component */
    "./src/app/components/redirect-data/redirect-data.component.ts");
    /* harmony import */


    var _pipes_maskid_pipe__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! ./pipes/maskid.pipe */
    "./src/app/pipes/maskid.pipe.ts");
    /* harmony import */


    var _pipes_search_pipe__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! ./pipes/search.pipe */
    "./src/app/pipes/search.pipe.ts");
    /* harmony import */


    var _pipes_date_now_pipe__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
    /*! ./pipes/date-now.pipe */
    "./src/app/pipes/date-now.pipe.ts");
    /* harmony import */


    var _services_httpClient_res_header_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
    /*! ./services/httpClient/res-header.service */
    "./src/app/services/httpClient/res-header.service.ts"); // import { InlineSVGModule } from 'ng-inline-svg';
    // import { CommonService } from './services/common/common.service';


    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"], _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_11__["ChangePasswordComponent"], _components_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_12__["ForgotPasswordComponent"], _components_error_error401_error401_component__WEBPACK_IMPORTED_MODULE_13__["Error401Component"], _components_error_error404_error404_component__WEBPACK_IMPORTED_MODULE_14__["Error404Component"], _components_error_error500_error500_component__WEBPACK_IMPORTED_MODULE_15__["Error500Component"], _components_login_login_component__WEBPACK_IMPORTED_MODULE_16__["LoginComponent"], _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_17__["UserProfileComponent"], _components_products_products_component__WEBPACK_IMPORTED_MODULE_18__["ProductsComponent"], _components_payment_response_payment_response_payment_response_component__WEBPACK_IMPORTED_MODULE_22__["PaymentResponseComponent"], _pages_modules_chatbot_chatbot_component__WEBPACK_IMPORTED_MODULE_23__["ChatbotComponent"], _components_redirect_data_redirect_data_component__WEBPACK_IMPORTED_MODULE_24__["RedirectDataComponent"], _pipes_maskid_pipe__WEBPACK_IMPORTED_MODULE_25__["MaskIdPipe"], _pipes_search_pipe__WEBPACK_IMPORTED_MODULE_26__["SearchPipe"], _pipes_date_now_pipe__WEBPACK_IMPORTED_MODULE_27__["DateFormatPipe"] // PaymentStatusComponent,
      ],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsDatepickerModule"].forRoot(), ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["TooltipModule"].forRoot(), ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["ModalModule"].forRoot(), ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["PopoverModule"].forRoot(), ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrModule"].forRoot(), _app_routing__WEBPACK_IMPORTED_MODULE_10__["AppModuleRouting"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]],
      providers: [{
        provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"],
        useClass: _services_ErrorHandler_client_error_handler_service__WEBPACK_IMPORTED_MODULE_19__["ClientErrorHandlerService"]
      }, {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"],
        useClass: _services_httpClient_res_header_service__WEBPACK_IMPORTED_MODULE_28__["ResponseHeaderInterceptor"],
        multi: true
      }, _angular_common__WEBPACK_IMPORTED_MODULE_20__["DatePipe"], _components_change_password_change_password_service__WEBPACK_IMPORTED_MODULE_21__["ChangePasswordService"]],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
    })], AppModule);
    /***/
  },

  /***/
  "./src/app/app.routing.ts":
  /*!********************************!*\
    !*** ./src/app/app.routing.ts ***!
    \********************************/

  /*! exports provided: AppRoutes, AppModuleRouting */

  /***/
  function srcAppAppRoutingTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutes", function () {
      return AppRoutes;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModuleRouting", function () {
      return AppModuleRouting;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./components/login/login.component */
    "./src/app/components/login/login.component.ts");
    /* harmony import */


    var _components_error_error401_error401_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/error/error401/error401.component */
    "./src/app/components/error/error401/error401.component.ts");
    /* harmony import */


    var _components_error_error404_error404_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/error/error404/error404.component */
    "./src/app/components/error/error404/error404.component.ts");
    /* harmony import */


    var _components_error_error500_error500_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./components/error/error500/error500.component */
    "./src/app/components/error/error500/error500.component.ts");
    /* harmony import */


    var _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./components/change-password/change-password.component */
    "./src/app/components/change-password/change-password.component.ts");
    /* harmony import */


    var _guard_auth_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./guard/auth.guard */
    "./src/app/guard/auth.guard.ts");
    /* harmony import */


    var _components_payment_response_payment_response_payment_response_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./components/payment-response/payment-response/payment-response.component */
    "./src/app/components/payment-response/payment-response/payment-response.component.ts");
    /* harmony import */


    var _components_redirect_data_redirect_data_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./components/redirect-data/redirect-data.component */
    "./src/app/components/redirect-data/redirect-data.component.ts");

    var AppRoutes = [{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }, {
      path: 'login',
      component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    }, {
      path: 'table-data',
      component: _components_redirect_data_redirect_data_component__WEBPACK_IMPORTED_MODULE_9__["RedirectDataComponent"]
    }, {
      path: 'error',
      children: [{
        path: '401',
        component: _components_error_error401_error401_component__WEBPACK_IMPORTED_MODULE_3__["Error401Component"]
      }, {
        path: '404',
        component: _components_error_error404_error404_component__WEBPACK_IMPORTED_MODULE_4__["Error404Component"]
      }, {
        path: '500',
        component: _components_error_error500_error500_component__WEBPACK_IMPORTED_MODULE_5__["Error500Component"]
      }]
    }, // {
    //     path: 'password',
    //     children: [
    //         { path: 'change/:uid/:tn', component: ForgotPasswordComponent },
    //         { path: 'forgot', component: ForgotPasswordComponent }
    //     ]
    // },
    {
      path: '',
      canActivateChild: [_guard_auth_guard__WEBPACK_IMPORTED_MODULE_7__["AuthGuard"]],
      children: [{
        path: 'pages',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-pages-module */
          "pages-pages-module").then(__webpack_require__.bind(null,
          /*! ./pages/pages.module */
          "./src/app/pages/pages.module.ts")).then(function (m) {
            return m.PagesModule;
          });
        }
      }, {
        path: 'changepassword',
        component: _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_6__["ChangePasswordComponent"]
      }, {
        path: 'payment-status',
        component: _components_payment_response_payment_response_payment_response_component__WEBPACK_IMPORTED_MODULE_8__["PaymentResponseComponent"]
      }, // { path: 'products', component: ProductsComponent },
      {
        path: '** ',
        component: _components_error_error404_error404_component__WEBPACK_IMPORTED_MODULE_4__["Error404Component"]
      }]
    }];

    var AppModuleRouting = _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(AppRoutes, {
      preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_1__["PreloadAllModules"],
      useHash: true
    });
    /***/

  },

  /***/
  "./src/app/app.setting.ts":
  /*!********************************!*\
    !*** ./src/app/app.setting.ts ***!
    \********************************/

  /*! exports provided: AppSetting */

  /***/
  function srcAppAppSettingTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppSetting", function () {
      return AppSetting;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_settings_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app.settings.model */
    "./src/app/app.settings.model.ts");

    var AppSetting = function AppSetting() {
      _classCallCheck(this, AppSetting);

      this.setting = new _app_settings_model__WEBPACK_IMPORTED_MODULE_2__["Settings"]({
        name: 'xya',
        emailId: 'xyz@gmail.com',
        mobNo: '7878787878'
      }, 0, 'ormas', 'Copyright @ 2019 ORMAS, Odisha', 'VMENU', false, true, true, false, false);
    };

    AppSetting = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], AppSetting);
    /***/
  },

  /***/
  "./src/app/app.settings.model.ts":
  /*!***************************************!*\
    !*** ./src/app/app.settings.model.ts ***!
    \***************************************/

  /*! exports provided: Settings */

  /***/
  function srcAppAppSettingsModelTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Settings", function () {
      return Settings;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var Settings = function Settings(userDetails, pageWidth, name, footer, menuType, isMiniMenuReq, showMiniMenu, showMenu, openRoleModule, showRole) {
      _classCallCheck(this, Settings);

      this.userDetails = userDetails;
      this.pageWidth = pageWidth;
      this.name = name;
      this.footer = footer;
      this.menuType = menuType;
      this.isMiniMenuReq = isMiniMenuReq;
      this.showMiniMenu = showMiniMenu;
      this.showMenu = showMenu;
      this.openRoleModule = openRoleModule;
      this.showRole = showRole;
    };
    /***/

  },

  /***/
  "./src/app/components/change-password/change-password.component.ts":
  /*!*************************************************************************!*\
    !*** ./src/app/components/change-password/change-password.component.ts ***!
    \*************************************************************************/

  /*! exports provided: ChangePasswordComponent */

  /***/
  function srcAppComponentsChangePasswordChangePasswordComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function () {
      return ChangePasswordComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @app/services/toastr/toastr.service */
    "./src/app/services/toastr/toastr.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! sweetalert2 */
    "./node_modules/sweetalert2/dist/sweetalert2.all.js");
    /* harmony import */


    var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */


    var _change_password_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./change-password.service */
    "./src/app/components/change-password/change-password.service.ts");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! crypto-js */
    "./node_modules/crypto-js/index.js");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_8__);

    var ChangePasswordComponent = /*#__PURE__*/function () {
      function ChangePasswordComponent(service, router, changePasswordActiveRoute, toastr, spinner, changePasswordFB) {
        _classCallCheck(this, ChangePasswordComponent);

        this.service = service;
        this.router = router;
        this.changePasswordActiveRoute = changePasswordActiveRoute;
        this.toastr = toastr;
        this.spinner = spinner;
        this.changePasswordFB = changePasswordFB;
        this.noOfTimes = 2;
        this.createChangeForm();
      }

      _createClass(ChangePasswordComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {// this.getCaptcha();
        }
      }, {
        key: "createChangeForm",
        value: function createChangeForm() {
          this.changePassForm = this.changePasswordFB.group({
            oldPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{6,})')])],
            confirmPass: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])]
          });
        } //   public getCaptcha() {
        //     this.service.getCaptchaImage().subscribe(response => {
        //       // console.log(response);
        //       this.captchaImg = response;
        //       // console.log(this.captchaImg.type);
        //       // console.log(this.captchat);
        //       this.captchat.nativeElement.innerHTML = this.captchaImg;
        //     });
        //   }

        /* Encription Methods */
        // private encSaltedPassword(data: string, noOfTimes: number, salt: string) {
        //   // console.log('SALT: ', salt);
        //   const PASSWORD = this.encodePassword(data, noOfTimes);
        //   const ENC_PASS = this.sha512Hash(PASSWORD + '#' + salt);
        //   console.log('ENCODED PASS: ', ENC_PASS);
        //   return ENC_PASS;
        // }

      }, {
        key: "encodePassword",
        value: function encodePassword(data, noOfTimes) {
          var password = data;

          while (noOfTimes > 0) {
            // console.log('BEFORE ENCODING: ' + password);
            password = this.sha512Hash(password); // console.log('AFTER ENCODING: ' + password);

            noOfTimes--;
          }

          return password;
        }
      }, {
        key: "sha512Hash",
        value: function sha512Hash(data) {
          try {
            return crypto_js__WEBPACK_IMPORTED_MODULE_8__["SHA512"](data).toString();
          } catch (error) {
            console.log(error);
          }
        }
        /* Encription Methods Ends Here*/

      }, {
        key: "checkPassword",
        value: function checkPassword(data) {
          if (data.password !== data.confirmPass && data.password !== null && data.confirmPass !== null) {
            this.toastr.warningToastr('Confirm password does not match..!!!');
          } else {
            this.submitChangePassword(data);
          }
        }
      }, {
        key: "submitChangePassword",
        value: function submitChangePassword(data) {
          var _this = this;

          var OLD_PASSWORD = this.encodePassword(data.oldPassword, this.noOfTimes);
          var NEW_PASSWORD = this.encodePassword(data.password, this.noOfTimes);
          console.log(NEW_PASSWORD, 'new password');
          var DATA = {
            oldPassword: OLD_PASSWORD,
            password: NEW_PASSWORD
          };
          sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire({
            title: 'Are you sure?',
            text: 'You will Save this data!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Submit it!',
            cancelButtonText: 'No, keep it'
          }).then(function (resultdata) {
            if (resultdata.value) {
              _this.spinner.show();

              _this.service.changePasword(DATA).subscribe(function (successResponse) {
                if (successResponse !== null) {
                  _this.spinner.hide(); // console.log('result:----', successResponse);
                  // console.log('statusDesc:-----', successResponse.statusDesc);


                  _this.toastr.successToastr(successResponse.message);

                  sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire('Submit!', 'Your Data has been Submittted .', 'success');

                  _this.changePassForm.reset();

                  _this.router.navigateByUrl('/pages/citizen/proposal');
                } else {
                  _this.spinner.hide();

                  _this.toastr.warningToastr('Something went wrong');
                }
              }, function (errorResponse) {
                _this.spinner.hide(); //  this.error.showMessage(errorResponse);
                // console.log(error);


                sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire('Cancelled', 'Oops... Wrong Password', 'error');
              });
            }
          });
        }
      }, {
        key: "backButton",
        value: function backButton() {
          this.router.navigateByUrl('pages/citizen/status');
        }
      }]);

      return ChangePasswordComponent;
    }();

    ChangePasswordComponent.ctorParameters = function () {
      return [{
        type: _change_password_service__WEBPACK_IMPORTED_MODULE_7__["ChangePasswordService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_4__["ToastrClientService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('captcha', {
      "static": true
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], ChangePasswordComponent.prototype, "captchat", void 0);
    ChangePasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-change-password',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./change-password.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/change-password/change-password.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./change-password.scss */
      "./src/app/components/change-password/change-password.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_change_password_service__WEBPACK_IMPORTED_MODULE_7__["ChangePasswordService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_4__["ToastrClientService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])], ChangePasswordComponent);
    /***/
  },

  /***/
  "./src/app/components/change-password/change-password.scss":
  /*!*****************************************************************!*\
    !*** ./src/app/components/change-password/change-password.scss ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsChangePasswordChangePasswordScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".top-container .field-container {\n  height: 433px;\n  background-color: #ffffff;\n  box-shadow: 0px 1px 6px #4d4d8c;\n  margin-left: 32vw;\n  margin-top: 10%;\n  border: 1px solid gray;\n}\n.top-container .field-container img {\n  margin-left: 41%;\n  height: 65px;\n  fill: #4d4d8c;\n}\n.top-container .field-container h4 {\n  font-family: poppins;\n  text-align: center;\n  color: #4d4d8c;\n}\n.top-container .field-container label {\n  font-family: poppins;\n  font-size: 15px;\n  color: #2b2a86;\n}\n.top-container .field-container .custom-btn {\n  border: none;\n  height: 36px;\n  width: 200px;\n  border-radius: 20px;\n  background-color: #0f297e;\n  color: #fff;\n  font-family: poppins;\n  font-weight: 600;\n  margin-top: 10px;\n  cursor: pointer;\n}\n.top-container .field-container .captch-style {\n  font-size: 26px;\n  cursor: pointer;\n  padding-top: 18px;\n  margin-left: -16px;\n  color: green;\n}\n.top-bg {\n  width: 100vw;\n  background-image: linear-gradient(90deg, #b2ebf4, #f3f3f3);\n  position: fixed;\n  top: 0;\n  left: 0;\n  margin-bottom: 80px;\n  z-index: 100;\n  box-shadow: 1px 2px 6px grey;\n}\n.od-logo img {\n  height: 80px;\n  width: 80px;\n  margin-top: 3px;\n  border-right: 1px solid #d4d4d4;\n}\n.wtr-logo img {\n  float: left;\n  margin-top: 17px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jaGFuZ2UtcGFzc3dvcmQvQzpcXHdhdGVybmV3XFxXYXRlckFsbG9jYXRpb24yMjA4XFxXYXRlckFsbG9jYXRpb24yMjA4L3NyY1xcYXBwXFxjb21wb25lbnRzXFxjaGFuZ2UtcGFzc3dvcmRcXGNoYW5nZS1wYXNzd29yZC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2NoYW5nZS1wYXNzd29yZC9jaGFuZ2UtcGFzc3dvcmQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0Esc0JBQUE7QUNBUjtBRENRO0VBQ0ksZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQ0NaO0FEQ1E7RUFDSSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0NaO0FEQ1E7RUFDSSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FDQ1o7QURDUTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQ0NaO0FEQ1E7RUFDSSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDQ1o7QURHQTtFQUNJLFlBQUE7RUFDQSwwREFBQTtFQUVBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDRCQUFBO0FDREo7QURHQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUVBLCtCQUFBO0FDREo7QURHQTtFQUNJLFdBQUE7RUFDQSxnQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9jaGFuZ2UtcGFzc3dvcmQvY2hhbmdlLXBhc3N3b3JkLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudG9wLWNvbnRhaW5lciB7XHJcbiAgICAuZmllbGQtY29udGFpbmVyIHtcclxuICAgICAgICBoZWlnaHQ6IDQzM3B4O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDFweCA2cHggIzRkNGQ4YztcclxuICAgICAgICBtYXJnaW4tbGVmdDogMzJ2dztcclxuICAgICAgICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgICAgICBpbWcge1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogNDElO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDY1cHg7XHJcbiAgICAgICAgICAgIGZpbGw6ICM0ZDRkOGM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGg0IHtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgY29sb3I6ICM0ZDRkOGM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhYmVsIHtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgICAgY29sb3I6ICMyYjJhODY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jdXN0b20tYnRuIHtcclxuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyMDBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzBmMjk3ZTtcclxuICAgICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jYXB0Y2gtc3R5bGUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDI2cHg7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgcGFkZGluZy10b3A6IDE4cHg7XHJcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtMTZweDtcclxuICAgICAgICAgICAgY29sb3I6IGdyZWVuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4udG9wLWJnIHtcclxuICAgIHdpZHRoOiAxMDB2dztcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6ICBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNiMmViZjQsICNmM2YzZjMpOztcclxuICAgIC8vIGJveC1zaGFkb3c6IDJweCAzcHggNXB4ICNjY2M7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogODBweDtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICAgIGJveC1zaGFkb3c6IDFweCAycHggNnB4IGdyZXk7XHJcbn1cclxuLm9kLWxvZ28gaW1nIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogM3B4O1xyXG4gICAgLy8gcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2Q0ZDRkNDtcclxufVxyXG4ud3RyLWxvZ28gaW1nIHtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbWFyZ2luLXRvcDogMTdweDtcclxufSIsIi50b3AtY29udGFpbmVyIC5maWVsZC1jb250YWluZXIge1xuICBoZWlnaHQ6IDQzM3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwcHggMXB4IDZweCAjNGQ0ZDhjO1xuICBtYXJnaW4tbGVmdDogMzJ2dztcbiAgbWFyZ2luLXRvcDogMTAlO1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xufVxuLnRvcC1jb250YWluZXIgLmZpZWxkLWNvbnRhaW5lciBpbWcge1xuICBtYXJnaW4tbGVmdDogNDElO1xuICBoZWlnaHQ6IDY1cHg7XG4gIGZpbGw6ICM0ZDRkOGM7XG59XG4udG9wLWNvbnRhaW5lciAuZmllbGQtY29udGFpbmVyIGg0IHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM0ZDRkOGM7XG59XG4udG9wLWNvbnRhaW5lciAuZmllbGQtY29udGFpbmVyIGxhYmVsIHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgY29sb3I6ICMyYjJhODY7XG59XG4udG9wLWNvbnRhaW5lciAuZmllbGQtY29udGFpbmVyIC5jdXN0b20tYnRuIHtcbiAgYm9yZGVyOiBub25lO1xuICBoZWlnaHQ6IDM2cHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBmMjk3ZTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4udG9wLWNvbnRhaW5lciAuZmllbGQtY29udGFpbmVyIC5jYXB0Y2gtc3R5bGUge1xuICBmb250LXNpemU6IDI2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZy10b3A6IDE4cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMTZweDtcbiAgY29sb3I6IGdyZWVuO1xufVxuXG4udG9wLWJnIHtcbiAgd2lkdGg6IDEwMHZ3O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNiMmViZjQsICNmM2YzZjMpO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgbWFyZ2luLWJvdHRvbTogODBweDtcbiAgei1pbmRleDogMTAwO1xuICBib3gtc2hhZG93OiAxcHggMnB4IDZweCBncmV5O1xufVxuXG4ub2QtbG9nbyBpbWcge1xuICBoZWlnaHQ6IDgwcHg7XG4gIHdpZHRoOiA4MHB4O1xuICBtYXJnaW4tdG9wOiAzcHg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkNGQ0ZDQ7XG59XG5cbi53dHItbG9nbyBpbWcge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLXRvcDogMTdweDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/components/change-password/change-password.service.ts":
  /*!***********************************************************************!*\
    !*** ./src/app/components/change-password/change-password.service.ts ***!
    \***********************************************************************/

  /*! exports provided: ChangePasswordService */

  /***/
  function srcAppComponentsChangePasswordChangePasswordServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChangePasswordService", function () {
      return ChangePasswordService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");
    /* harmony import */


    var _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/services/httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");

    var ChangePasswordService = /*#__PURE__*/function () {
      function ChangePasswordService(httpClient) {
        _classCallCheck(this, ChangePasswordService);

        this.httpClient = httpClient;
      }

      _createClass(ChangePasswordService, [{
        key: "changePasword",
        value: function changePasword(data) {
          return this.httpClient.postAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + 'api/changePassword', data);
        }
      }]);

      return ChangePasswordService;
    }();

    ChangePasswordService.ctorParameters = function () {
      return [{
        type: _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_3__["HttpClientService"]
      }];
    };

    ChangePasswordService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_3__["HttpClientService"]])], ChangePasswordService);
    /***/
  },

  /***/
  "./src/app/components/error/error401/error401.component.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/components/error/error401/error401.component.ts ***!
    \*****************************************************************/

  /*! exports provided: Error401Component */

  /***/
  function srcAppComponentsErrorError401Error401ComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Error401Component", function () {
      return Error401Component;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var Error401Component = /*#__PURE__*/function () {
      function Error401Component() {
        _classCallCheck(this, Error401Component);
      }

      _createClass(Error401Component, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return Error401Component;
    }();

    Error401Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-error401',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./error401.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error401/error401.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], Error401Component);
    /***/
  },

  /***/
  "./src/app/components/error/error404/error404.component.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/components/error/error404/error404.component.ts ***!
    \*****************************************************************/

  /*! exports provided: Error404Component */

  /***/
  function srcAppComponentsErrorError404Error404ComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Error404Component", function () {
      return Error404Component;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var Error404Component = /*#__PURE__*/function () {
      function Error404Component() {
        _classCallCheck(this, Error404Component);
      }

      _createClass(Error404Component, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return Error404Component;
    }();

    Error404Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-error404',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./error404.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error404/error404.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], Error404Component);
    /***/
  },

  /***/
  "./src/app/components/error/error500/error500.component.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/components/error/error500/error500.component.ts ***!
    \*****************************************************************/

  /*! exports provided: Error500Component */

  /***/
  function srcAppComponentsErrorError500Error500ComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Error500Component", function () {
      return Error500Component;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var Error500Component = /*#__PURE__*/function () {
      function Error500Component() {
        _classCallCheck(this, Error500Component);
      }

      _createClass(Error500Component, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return Error500Component;
    }();

    Error500Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-error500',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./error500.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/error/error500/error500.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], Error500Component);
    /***/
  },

  /***/
  "./src/app/components/forgot-password/forgot-password.component.ts":
  /*!*************************************************************************!*\
    !*** ./src/app/components/forgot-password/forgot-password.component.ts ***!
    \*************************************************************************/

  /*! exports provided: ForgotPasswordComponent */

  /***/
  function srcAppComponentsForgotPasswordForgotPasswordComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function () {
      return ForgotPasswordComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _forgot_password_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./forgot-password.service */
    "./src/app/components/forgot-password/forgot-password.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _app_services_encryption_encryption_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @app/services/encryption/encryption.service */
    "./src/app/services/encryption/encryption.service.ts");
    /* harmony import */


    var _app_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @app/services/common/common.service */
    "./src/app/services/common/common.service.ts");
    /* harmony import */


    var _app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @app/validators/custom.validators */
    "./src/app/validators/custom.validators.ts");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");
    /* harmony import */


    var _app_services_utils_utils_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @app/services/utils/utils.service */
    "./src/app/services/utils/utils.service.ts");
    /* harmony import */


    var _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @app/services/toastr/toastr.service */
    "./src/app/services/toastr/toastr.service.ts");

    var ForgotPasswordComponent = /*#__PURE__*/function () {
      function ForgotPasswordComponent(router, changeFB, toastr, pwdService, spinner, // private error: ErrorResponseService,
      encryptService, commonService, activeRoute, utils) {
        _classCallCheck(this, ForgotPasswordComponent);

        this.router = router;
        this.changeFB = changeFB;
        this.toastr = toastr;
        this.pwdService = pwdService;
        this.spinner = spinner;
        this.encryptService = encryptService;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        this.utils = utils;
        this.otpStatus = -1;
        this.passwordChangeType = 'Forgot';
        this.disableSendReq = false;
        this.disableReSendReq = true;
        this.tokenDetails = {
          userId: '',
          token: ''
        };
        this.createForgotPwdForm();
      }

      _createClass(ForgotPasswordComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this2 = this;

          this.activeRoute.params.subscribe(function (params) {
            if (params['uid'] !== undefined && params['tn'] !== undefined) {
              _this2.tokenDetails.userId = params['uid'];
              _this2.tokenDetails.token = params['tn'];
              _this2.passwordChangeType = 'Change';

              _this2.forgotPassForm.controls.userId.setValue(_this2.tokenDetails.userId);

              _this2.sendOtpByLink();
            } else {
              _this2.forgotPassForm.controls.userId.setValue('');

              _this2.passwordChangeType = 'Forgot';
            }
          });
        }
      }, {
        key: "sendOtpByLink",
        value: function sendOtpByLink() {
          var _this3 = this;

          this.spinner.show();
          this.pwdService.sendLinkVerification(this.tokenDetails.userId, this.tokenDetails.token).subscribe(function (successResponse) {
            _this3.spinner.hide();

            if (successResponse.success) {
              _this3.toastr.successToastr(successResponse.Message);

              _this3.setSyncTimer();
            } else {
              _this3.toastr.warningToastr(successResponse.Message);
            }
          }, function (errorResponse) {
            _this3.spinner.hide();

            _this3.toastr.dangerToastr(errorResponse);
          });
        }
      }, {
        key: "createForgotPwdForm",
        value: function createForgotPwdForm() {
          this.forgotPassForm = this.changeFB.group({
            userId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_8__["userIdValidator"]])],
            otp: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_8__["passwordValidator"]])],
            cnfPass: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])]
          }, {
            validator: Object(_app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_8__["matchingPasswords"])('password', 'cnfPass')
          });
        }
      }, {
        key: "submitForgotPassForm",
        value: function submitForgotPassForm(data) {
          var _this4 = this;

          var passDetails = {
            otp: data.otp,
            userId: data.userId,
            newpwd: this.utils.checkAndSendValues(102, data.password) !== null ? this.encryptService.encodePassword(this.utils.checkAndSendValues(102, data.password), _app_app_constants__WEBPACK_IMPORTED_MODULE_9__["AppConstants"].PASSWORD_ENCODING_TIMES) : null
          };
          console.log('Forgot Password Form Data :  ', passDetails);
          this.spinner.show();
          this.pwdService.changePassWithoutAuth(passDetails).subscribe(function (successResponse) {
            _this4.spinner.hide();

            if (successResponse.status !== -1) {
              _this4.toastr.successToastr(successResponse.statusDesc); // this.router.navigate(['/login']);

            } else {
              _this4.toastr.warningToastr(successResponse.statusDesc);
            }
          }, function (errorResponse) {
            _this4.spinner.hide();

            _this4.toastr.dangerToastr(errorResponse);
          });
        }
      }, {
        key: "sendOtp",
        value: function sendOtp(data) {
          var _this5 = this;

          var userId = {
            userName: data.userId
          };
          console.log('Send OTP called');
          this.spinner.show();
          this.pwdService.sendOtp(userId).subscribe(function (successResponse) {
            console.log('OTP Response', successResponse);

            if (successResponse.status !== -1) {
              _this5.toastr.successToastr('Your Respective UserId: ' + successResponse.statusDesc);

              _this5.disableSendReq = true;

              _this5.setSyncTimer(); // this.router.navigate(['/login']);

            } else {
              _this5.toastr.warningToastr(successResponse.statusDesc);

              _this5.disableSendReq = false;
            }

            _this5.spinner.hide();
          }, function (errorResponse) {
            _this5.disableSendReq = false;

            _this5.toastr.dangerToastr(errorResponse);

            _this5.spinner.hide();
          });
        }
      }, {
        key: "reSendOtp",
        value: function reSendOtp(data) {
          var _this6 = this;

          var userId = {
            userName: data.userId
          };
          console.log('Resend OTP called');
          this.spinner.show();
          this.pwdService.reSendOtp(userId).subscribe(function (successResponse) {
            console.log('Resend OTP Response', successResponse);

            if (successResponse.status !== -1) {
              _this6.toastr.successToastr(successResponse.statusDesc);

              _this6.setSyncTimer(); // this.router.navigate(['/login']);

            } else {
              _this6.toastr.warningToastr(successResponse.statusDesc);
            }

            _this6.spinner.hide();
          }, function (errorResponse) {
            _this6.spinner.hide();

            _this6.toastr.dangerToastr(errorResponse);
          });
        }
      }, {
        key: "setSyncTimer",
        value: function setSyncTimer() {
          var _this7 = this;

          this.disableReSendReq = true;
          this.resendTimerID = setTimeout(function () {
            _this7.disableReSendReq = false;
          }, 60 * 1000);
        }
      }, {
        key: "clearTimer",
        value: function clearTimer() {
          this.disableReSendReq = true;

          if (this.resendTimerID !== undefined) {
            clearTimeout(this.resendTimerID);
          }
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.clearTimer();
        }
      }]);

      return ForgotPasswordComponent;
    }();

    ForgotPasswordComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_11__["ToastrClientService"]
      }, {
        type: _forgot_password_service__WEBPACK_IMPORTED_MODULE_2__["ForgotPasswordService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }, {
        type: _app_services_encryption_encryption_service__WEBPACK_IMPORTED_MODULE_6__["EncryptionService"]
      }, {
        type: _app_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]
      }, {
        type: _app_services_utils_utils_service__WEBPACK_IMPORTED_MODULE_10__["UtilsService"]
      }];
    };

    ForgotPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-forgot-password',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forgot-password.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/forgot-password/forgot-password.component.html"))["default"],
      providers: [_forgot_password_service__WEBPACK_IMPORTED_MODULE_2__["ForgotPasswordService"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_11__["ToastrClientService"], _forgot_password_service__WEBPACK_IMPORTED_MODULE_2__["ForgotPasswordService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], _app_services_encryption_encryption_service__WEBPACK_IMPORTED_MODULE_6__["EncryptionService"], _app_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _app_services_utils_utils_service__WEBPACK_IMPORTED_MODULE_10__["UtilsService"]])], ForgotPasswordComponent);
    /***/
  },

  /***/
  "./src/app/components/forgot-password/forgot-password.service.ts":
  /*!***********************************************************************!*\
    !*** ./src/app/components/forgot-password/forgot-password.service.ts ***!
    \***********************************************************************/

  /*! exports provided: ForgotPasswordService */

  /***/
  function srcAppComponentsForgotPasswordForgotPasswordServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPasswordService", function () {
      return ForgotPasswordService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");

    var ForgotPasswordService = /*#__PURE__*/function () {
      function ForgotPasswordService(http) {
        _classCallCheck(this, ForgotPasswordService);

        this.http = http;
      }

      _createClass(ForgotPasswordService, [{
        key: "changePassWithoutAuth",
        value: function changePassWithoutAuth(data) {
          return this.http.postAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'admin/changeUserPasswordWithoutAuth', data);
        }
      }, {
        key: "forgotPassword",
        value: function forgotPassword() {}
      }, {
        key: "sendOtp",
        value: function sendOtp(data) {
          return this.http.postAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'admin/generateOtp', data);
        }
      }, {
        key: "reSendOtp",
        value: function reSendOtp(data) {
          return this.http.postAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'admin/resendotp', data);
        }
      }, {
        key: "sendLinkVerification",
        value: function sendLinkVerification(userId, token) {
          return this.http.getAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'admin/verifyLink/' + userId + '/' + token);
        }
      }]);

      return ForgotPasswordService;
    }();

    ForgotPasswordService.ctorParameters = function () {
      return [{
        type: _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]
      }];
    };

    ForgotPasswordService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]])], ForgotPasswordService);
    /***/
  },

  /***/
  "./src/app/components/login/login.component.scss":
  /*!*******************************************************!*\
    !*** ./src/app/components/login/login.component.scss ***!
    \*******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsLoginLoginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".login-container {\n  background-color: #0e0e0e;\n  background-image: url('login screen bg.jpg');\n  height: 100vh;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: \"Poppins\";\n}\n.login-container .inner-container {\n  width: 100%;\n  height: 100%;\n  background-position-y: 5rem;\n  background-position-x: center, 49vw;\n  -webkit-animation: change-background 12s infinite;\n          animation: change-background 12s infinite;\n}\n.login-container .inner-container .user-apply h2 {\n  color: aliceblue;\n}\n.login-container .inner-container .user-apply p a {\n  cursor: pointer;\n}\n.login-container .inner-container .user-apply p a:hover {\n  background-color: blueviolet;\n  color: #fff;\n}\n.login-container .inner-container .form-container {\n  position: absolute;\n  background-color: #fff;\n  top: 15vh;\n  margin-left: 12%;\n  border-radius: 23px;\n  box-shadow: -1px 5px 17px black;\n}\n.login-container .inner-container .form-container .login-left {\n  background-image: url('login design bg.png');\n  background-repeat: no-repeat;\n  background-position-y: center;\n  border-top-left-radius: 23px;\n  border-bottom-left-radius: 23px;\n}\n.login-container .inner-container .form-container .login-left .e-jala img {\n  width: 192px;\n  margin-left: 42px;\n  margin-top: 28px;\n}\n.login-container .inner-container .form-container .login-left .odisha-logo img {\n  height: 100px;\n  width: 100px;\n  margin-top: 25px;\n  margin-left: 84px;\n}\n.login-container .inner-container .form-container .login-left .water-head {\n  text-align: center;\n}\n.login-container .inner-container .form-container .login-left .water-head .dept {\n  font-family: Poppins;\n  font-size: 18px;\n  margin-left: 17px;\n  color: #3565ad;\n}\n.login-container .inner-container .form-container .login-left .water-head .wtr {\n  font-family: Poppins;\n  font-size: 20px;\n  font-weight: 600;\n  margin-left: 17px;\n  color: #29569a;\n}\n.login-container .inner-container .form-container .login-left .wh-ap {\n  font-family: poppins;\n  cursor: pointer;\n  color: white;\n  margin-top: 80px;\n  margin-left: 65px;\n  text-shadow: 1px 1px 1px black;\n}\n.login-container .inner-container .form-container .login-right {\n  padding-top: 6vh;\n  padding-bottom: 1vh;\n}\n.login-container .inner-container .form-container .login-right .fa {\n  font-size: 35px;\n  color: #908f8f;\n}\n.login-container .inner-container .form-container .login-right .captch-style {\n  font-size: 26px;\n  cursor: pointer;\n  padding-top: 18px;\n  margin-left: -16px;\n  color: green;\n}\n.login-container .inner-container .form-container .login-right .form-group {\n  border-bottom: 1px solid #717171;\n}\n.login-container .inner-container .form-container .login-right .form-control {\n  border: none;\n  box-shadow: none;\n  letter-spacing: 0.1rem;\n}\n.login-container .inner-container .form-container .login-right .custom-check {\n  color: #3565ad;\n  font-size: 26px;\n}\n.login-container .inner-container .form-container .login-right .custom-label {\n  font-size: 15px;\n  color: #908f8f;\n  font-family: poppins;\n}\n.login-container .inner-container .form-container .login-right .custom-btn {\n  background-color: #061a4c;\n  height: 41px;\n  width: 157px;\n  border: none;\n  border-radius: 22px;\n  color: white;\n  font-size: 20px;\n  font-weight: 600;\n  margin-left: 53px;\n}\n.login-container .inner-container .form-container .register-right {\n  padding-top: 6vh;\n}\n.login-container .inner-container .form-container .register-right .fa {\n  font-size: 27px;\n  color: #908f8f;\n}\n.login-container .inner-container .form-container .register-right .form-group {\n  border-bottom: 1px solid #717171;\n}\n.login-container .inner-container .form-container .register-right .captch-style {\n  font-size: 26px;\n  cursor: pointer;\n  padding-top: 18px;\n  margin-left: -16px;\n  color: green;\n}\n.login-container .inner-container .form-container .register-right .form-control {\n  border: none;\n  box-shadow: none;\n  letter-spacing: 0.1rem;\n}\n.login-container .inner-container .form-container .register-right .custom-check {\n  color: #3565ad;\n  font-size: 26px;\n}\n.login-container .inner-container .form-container .register-right .custom-label {\n  font-size: 15px;\n  color: #908f8f;\n  font-family: poppins;\n}\n.login-container .inner-container .form-container .register-right .custom-btn {\n  background-color: #061a4c;\n  height: 41px;\n  width: 157px;\n  border: none;\n  border-radius: 22px;\n  color: white;\n  font-size: 20px;\n  font-weight: 600;\n  margin-left: 53px;\n}\n.login-container .inner-container .quote {\n  position: fixed;\n  bottom: 20px;\n  color: white;\n  width: 100vw;\n  font-size: 18px;\n}\n.top-label {\n  font-size: 27px;\n  color: #447cd2;\n  text-shadow: 0px 0px 1px #010b10;\n  background-color: #cbf3fd;\n  margin-top: 10px;\n  padding-left: 10px;\n  padding-right: 10px;\n  border-radius: 14px;\n  box-shadow: 0px 1px 7px grey;\n}\n.footer {\n  width: 100%;\n}\n.footer img {\n  width: 367px;\n  height: 50px;\n  margin-left: -12px;\n  margin-top: 15px;\n}\n@media only screen and (max-width: 375px) {\n  .form-container {\n    position: relative !important;\n    top: 1vh !important;\n    margin-left: 0 !important;\n  }\n\n  .login-container {\n    overflow-y: auto;\n  }\n\n  .login-left {\n    background-size: cover !important;\n    background-position: 50% 61% !important;\n    border-radius: 23px !important;\n    height: 254px !important;\n  }\n\n  .odisha-logo img {\n    margin-top: 3px !important;\n    margin-left: 113px !important;\n  }\n\n  .login-right {\n    padding-top: 4vh !important;\n  }\n\n  .register-right {\n    padding-top: 4vh !important;\n  }\n}\n@media only screen and (max-width: 320px) {\n  .login-container {\n    overflow-y: auto;\n  }\n\n  .odisha-logo img {\n    margin-top: 3px !important;\n    margin-left: 87px !important;\n  }\n\n  .custom-btn {\n    margin-left: 38px !important;\n  }\n\n  .login-left {\n    height: 238px !important;\n  }\n}\n@media only screen and (max-width: 414px) {\n  .form-container {\n    position: relative !important;\n    top: 1vh !important;\n    margin-left: 0 !important;\n  }\n\n  .login-container {\n    overflow-y: auto;\n  }\n\n  .login-left {\n    background-size: cover !important;\n    background-position: 50% 61% !important;\n    border-radius: 23px !important;\n    height: 254px !important;\n  }\n\n  .odisha-logo img {\n    margin-top: 3px !important;\n    margin-left: 113px !important;\n  }\n\n  .login-right {\n    padding-top: 4vh !important;\n  }\n\n  .register-right {\n    padding-top: 4vh !important;\n  }\n\n  .custom-btn {\n    margin-left: 76px !important;\n  }\n}\n@media only screen and (max-width: 768px) {\n  .form-container {\n    position: relative;\n    margin-left: 0;\n    top: 22vh;\n  }\n\n  .login-right {\n    padding-top: 15vh;\n  }\n\n  .register-right {\n    padding-top: 8vh;\n  }\n}\n@media only screen and (max-width: 1024px) {\n  .form-container {\n    top: 22vh;\n    margin-left: 14vh;\n  }\n\n  .login-right {\n    padding-top: 13vh;\n  }\n\n  .register-right {\n    padding-top: 7vh;\n  }\n}\n::ng-deep .modal-dialog {\n  width: 80vw;\n  margin: 1rem 5rem;\n}\n::ng-deep .modal-content {\n  width: 80vw;\n}\n.pdf-c {\n  font-weight: bolder !important;\n  color: #212529 !important;\n}\n.date {\n  position: fixed;\n  bottom: 2%;\n  right: 5%;\n  color: aliceblue;\n}\n.fs-14 {\n  font-size: 14px !important;\n}\n.form-label {\n  align-self: center;\n  margin-right: 5px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.form-select {\n  border-radius: 5px !important;\n}\n.text-black {\n  color: #000000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9DOlxcd2F0ZXJuZXdcXFdhdGVyQWxsb2NhdGlvbjIyMDhcXFdhdGVyQWxsb2NhdGlvbjIyMDgvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGxvZ2luXFxsb2dpbi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUFBO0VBQ0EsNENBQUE7RUFDQSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtBQ0NKO0FEQUk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUVBLDJCQUFBO0VBQ0EsbUNBQUE7RUFDQSxpREFBQTtVQUFBLHlDQUFBO0FDQ1I7QURDWTtFQUNJLGdCQUFBO0FDQ2hCO0FERWdCO0VBRUksZUFBQTtBQ0RwQjtBREdnQjtFQUNJLDRCQUFBO0VBQ0EsV0FBQTtBQ0RwQjtBRE1RO0VBQ0ksa0JBQUE7RUFHQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7QUNOWjtBRFFZO0VBQ0ksNENBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtBQ05oQjtBRE9nQjtFQUNJLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FDTHBCO0FET2dCO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDTHBCO0FET2dCO0VBQ0ksa0JBQUE7QUNMcEI7QURNb0I7RUFDSSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUNKeEI7QURNb0I7RUFDSSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ0p4QjtBRE9nQjtFQUNJLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7QUNMcEI7QURRWTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7QUNOaEI7QURPZ0I7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQ0xwQjtBRE9nQjtFQUNJLGVBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNMcEI7QURPZ0I7RUFDSSxnQ0FBQTtBQ0xwQjtBRE9nQjtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0FDTHBCO0FET2dCO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUNMcEI7QURPZ0I7RUFDSSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FDTHBCO0FET2dCO0VBQ0kseUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ0xwQjtBRFFZO0VBQ0ksZ0JBQUE7QUNOaEI7QURPZ0I7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQ0xwQjtBRE9nQjtFQUNJLGdDQUFBO0FDTHBCO0FET2dCO0VBQ0ksZUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0xwQjtBRE9nQjtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0FDTHBCO0FET2dCO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUNMcEI7QURPZ0I7RUFDSSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FDTHBCO0FET2dCO0VBQ0kseUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ0xwQjtBRFNRO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUNQWjtBRGFBO0VBQ0ksZUFBQTtFQUNBLGNBQUE7RUFDQSxnQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtBQ1ZKO0FEWUE7RUFDSSxXQUFBO0FDVEo7QURVSTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ1JSO0FEWUE7RUFDSTtJQUNJLDZCQUFBO0lBQ0EsbUJBQUE7SUFDQSx5QkFBQTtFQ1ROOztFRFdFO0lBQ0ksZ0JBQUE7RUNSTjs7RURVRTtJQUNJLGlDQUFBO0lBQ0EsdUNBQUE7SUFDQSw4QkFBQTtJQUNBLHdCQUFBO0VDUE47O0VEU0U7SUFDSSwwQkFBQTtJQUNBLDZCQUFBO0VDTk47O0VEUUU7SUFDSSwyQkFBQTtFQ0xOOztFRE9FO0lBQ0ksMkJBQUE7RUNKTjtBQUNGO0FET0E7RUFDSTtJQUNJLGdCQUFBO0VDTE47O0VET0U7SUFDSSwwQkFBQTtJQUNBLDRCQUFBO0VDSk47O0VETUU7SUFDSSw0QkFBQTtFQ0hOOztFREtFO0lBQ0ksd0JBQUE7RUNGTjtBQUNGO0FES0E7RUFDSTtJQUNJLDZCQUFBO0lBQ0EsbUJBQUE7SUFDQSx5QkFBQTtFQ0hOOztFREtFO0lBQ0ksZ0JBQUE7RUNGTjs7RURJRTtJQUNJLGlDQUFBO0lBQ0EsdUNBQUE7SUFDQSw4QkFBQTtJQUNBLHdCQUFBO0VDRE47O0VER0U7SUFDSSwwQkFBQTtJQUNBLDZCQUFBO0VDQU47O0VERUU7SUFDSSwyQkFBQTtFQ0NOOztFRENFO0lBQ0ksMkJBQUE7RUNFTjs7RURBRTtJQUNJLDRCQUFBO0VDR047QUFDRjtBREFBO0VBQ0k7SUFDSSxrQkFBQTtJQUNBLGNBQUE7SUFDQSxTQUFBO0VDRU47O0VEQUU7SUFDSSxpQkFBQTtFQ0dOOztFRERFO0lBQ0ksZ0JBQUE7RUNJTjtBQUNGO0FEREE7RUFDSTtJQUNJLFNBQUE7SUFDQSxpQkFBQTtFQ0dOOztFRERFO0lBQ0ksaUJBQUE7RUNJTjs7RURGRTtJQUNJLGdCQUFBO0VDS047QUFDRjtBREZBO0VBQ0ksV0FBQTtFQUNBLGlCQUFBO0FDSUo7QUREQTtFQUNJLFdBQUE7QUNJSjtBRERBO0VBQ0ksOEJBQUE7RUFDQSx5QkFBQTtBQ0lKO0FESUE7RUFDSSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtBQ0RKO0FESUE7RUFDSSwwQkFBQTtBQ0RKO0FESUE7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDREo7QURHQTtFQUNJLDZCQUFBO0FDQUo7QURHQTtFQUNJLGNBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tY29udGFpbmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwZTBlMGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1dhdGVyTG9naW4vbG9naW5cXCBzY3JlZW5cXCBiZy5qcGdcIik7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiO1xyXG4gICAgLmlubmVyLWNvbnRhaW5lciB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICNmZmZmO1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogNXJlbTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IGNlbnRlciwgNDl2dztcclxuICAgICAgICBhbmltYXRpb246IGNoYW5nZS1iYWNrZ3JvdW5kIDEycyBpbmZpbml0ZTtcclxuICAgICAgICAudXNlci1hcHBseXtcclxuICAgICAgICAgICAgaDJ7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogYWxpY2VibHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB7XHJcbiAgICAgICAgICAgICAgICBhe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yOiBhbGljZWJsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYTpob3ZlciB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29sb3I6IGFsaWNlYmx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAuZm9ybS1jb250YWluZXIge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIC8vIGhlaWdodDogNzB2aDtcclxuICAgICAgICAgICAgLy8gd2lkdGg6IDUwdnc7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIHRvcDogMTV2aDtcclxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDEyJTtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjNweDtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzogLTFweCA1cHggMTdweCBibGFjaztcclxuXHJcbiAgICAgICAgICAgIC5sb2dpbi1sZWZ0IHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4vLi4vLi4vLi4vYXNzZXRzLy9pbWFnZXMvL1dhdGVyTG9naW4vbG9naW5cXCBkZXNpZ25cXCBiZy5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyM3B4O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjNweDtcclxuICAgICAgICAgICAgICAgIC5lLWphbGEgaW1nIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTkycHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDQycHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMjhweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5vZGlzaGEtbG9nbyBpbWcge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDI1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDg0cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAud2F0ZXItaGVhZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIC5kZXB0IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE3cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMzU2NWFkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAud3RyIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE3cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMjk1NjlhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC53aC1hcCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiA4MHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiA2NXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCBibGFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAubG9naW4tcmlnaHQge1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDZ2aDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxdmg7XHJcbiAgICAgICAgICAgICAgICAuZmEge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzkwOGY4ZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5jYXB0Y2gtc3R5bGUge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IC0xNnB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBncmVlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5mb3JtLWdyb3VwIHtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzcxNzE3MTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5mb3JtLWNvbnRyb2wge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAuY3VzdG9tLWNoZWNrIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzM1NjVhZDtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDI2cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAuY3VzdG9tLWxhYmVsIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM5MDhmOGY7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAuY3VzdG9tLWJ0biB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzA2MWE0YztcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQxcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1N3B4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAyMnB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogNTNweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAucmVnaXN0ZXItcmlnaHQge1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDZ2aDtcclxuICAgICAgICAgICAgICAgIC5mYSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAyN3B4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjOTA4ZjhmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLmZvcm0tZ3JvdXAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNzE3MTcxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLmNhcHRjaC1zdHlsZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogLTE2cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGdyZWVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLmZvcm0tY29udHJvbCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5jdXN0b20tY2hlY2sge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMzU2NWFkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5jdXN0b20tbGFiZWwge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzkwOGY4ZjtcclxuICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogcG9wcGlucztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5jdXN0b20tYnRuIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDYxYTRjO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNDFweDtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTU3cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIycHg7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiA1M3B4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5xdW90ZXtcclxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgICAgICBib3R0b206IDIwcHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICAgIC8vIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59XHJcblxyXG4udG9wLWxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMjdweDtcclxuICAgIGNvbG9yOiAjNDQ3Y2QyO1xyXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggMXB4ICMwMTBiMTA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2JmM2ZkO1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCA3cHggZ3JleTtcclxufVxyXG4uZm9vdGVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaW1ne1xyXG4gICAgICAgIHdpZHRoOiAzNjdweDtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0xMnB4O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzc1cHgpIHtcclxuICAgIC5mb3JtLWNvbnRhaW5lciB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgdG9wOiAxdmggIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmxvZ2luLWNvbnRhaW5lciB7XHJcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIH1cclxuICAgIC5sb2dpbi1sZWZ0IHtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDYxJSAhaW1wb3J0YW50O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIzcHggIWltcG9ydGFudDtcclxuICAgICAgICBoZWlnaHQ6IDI1NHB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAub2Rpc2hhLWxvZ28gaW1nIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAzcHggIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMTEzcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5sb2dpbi1yaWdodCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDR2aCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLnJlZ2lzdGVyLXJpZ2h0IHtcclxuICAgICAgICBwYWRkaW5nLXRvcDogNHZoICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcclxuICAgIC5sb2dpbi1jb250YWluZXIge1xyXG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICB9XHJcbiAgICAub2Rpc2hhLWxvZ28gaW1nIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAzcHggIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogODdweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmN1c3RvbS1idG4ge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzOHB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAubG9naW4tbGVmdCB7XHJcbiAgICAgICAgaGVpZ2h0OiAyMzhweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQxNHB4KSB7XHJcbiAgICAuZm9ybS1jb250YWluZXIge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50O1xyXG4gICAgICAgIHRvcDogMXZoICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5sb2dpbi1jb250YWluZXIge1xyXG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICB9XHJcbiAgICAubG9naW4tbGVmdCB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlciAhaW1wb3J0YW50O1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA2MSUgIWltcG9ydGFudDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyM3B4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgaGVpZ2h0OiAyNTRweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLm9kaXNoYS1sb2dvIGltZyB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogM3B4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDExM3B4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAubG9naW4tcmlnaHQge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiA0dmggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5yZWdpc3Rlci1yaWdodCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDR2aCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmN1c3RvbS1idG4ge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA3NnB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIC5mb3JtLWNvbnRhaW5lciB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gICAgICAgIHRvcDogMjJ2aDtcclxuICAgIH1cclxuICAgIC5sb2dpbi1yaWdodCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDE1dmg7XHJcbiAgICB9XHJcbiAgICAucmVnaXN0ZXItcmlnaHQge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiA4dmg7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgICAuZm9ybS1jb250YWluZXIge1xyXG4gICAgICAgIHRvcDogMjJ2aDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMTR2aDtcclxuICAgIH1cclxuICAgIC5sb2dpbi1yaWdodCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDEzdmg7XHJcbiAgICB9XHJcbiAgICAucmVnaXN0ZXItcmlnaHQge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiA3dmg7XHJcbiAgICB9XHJcbn1cclxuXHJcbjo6bmctZGVlcCAubW9kYWwtZGlhbG9nIHtcclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgbWFyZ2luOiAxcmVtIDVyZW07XHJcbiAgICBcclxufVxyXG46Om5nLWRlZXAgLm1vZGFsLWNvbnRlbnR7XHJcbiAgICB3aWR0aDogODB2dztcclxufVxyXG5cclxuLnBkZi1je1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlciAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICMyMTI1MjkgIWltcG9ydGFudDtcclxufVxyXG5cclxuLy8gLm1vZGFsLWNvbnRlbnQgOjpuZy1kZWVwIC5jdXN0b20tbW9kYWx7XHJcbi8vICAgICB3aWR0aDogNTB2dztcclxuLy8gfVxyXG5cclxuXHJcbi5kYXRlIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDsgXHJcbiAgICBib3R0b206IDIlOyBcclxuICAgIHJpZ2h0OiA1JTsgXHJcbiAgICBjb2xvcjogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uZnMtMTR7XHJcbiAgICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmZvcm0tbGFiZWwge1xyXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7IFxyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4uZm9ybS1zZWxlY3R7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnRleHQtYmxhY2t7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufSIsIi5sb2dpbi1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGUwZTBlO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1dhdGVyTG9naW4vbG9naW4gc2NyZWVuIGJnLmpwZ1wiKTtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCI7XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDVyZW07XG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogY2VudGVyLCA0OXZ3O1xuICBhbmltYXRpb246IGNoYW5nZS1iYWNrZ3JvdW5kIDEycyBpbmZpbml0ZTtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAudXNlci1hcHBseSBoMiB7XG4gIGNvbG9yOiBhbGljZWJsdWU7XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIgLnVzZXItYXBwbHkgcCBhIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC51c2VyLWFwcGx5IHAgYTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgdG9wOiAxNXZoO1xuICBtYXJnaW4tbGVmdDogMTIlO1xuICBib3JkZXItcmFkaXVzOiAyM3B4O1xuICBib3gtc2hhZG93OiAtMXB4IDVweCAxN3B4IGJsYWNrO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAubG9naW4tbGVmdCB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4vLi4vLi4vLi4vYXNzZXRzLy9pbWFnZXMvL1dhdGVyTG9naW4vbG9naW4gZGVzaWduIGJnLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiBjZW50ZXI7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIzcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIzcHg7XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIgLmZvcm0tY29udGFpbmVyIC5sb2dpbi1sZWZ0IC5lLWphbGEgaW1nIHtcbiAgd2lkdGg6IDE5MnB4O1xuICBtYXJnaW4tbGVmdDogNDJweDtcbiAgbWFyZ2luLXRvcDogMjhweDtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLWxlZnQgLm9kaXNoYS1sb2dvIGltZyB7XG4gIGhlaWdodDogMTAwcHg7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWFyZ2luLXRvcDogMjVweDtcbiAgbWFyZ2luLWxlZnQ6IDg0cHg7XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIgLmZvcm0tY29udGFpbmVyIC5sb2dpbi1sZWZ0IC53YXRlci1oZWFkIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAubG9naW4tbGVmdCAud2F0ZXItaGVhZCAuZGVwdCB7XG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xuICBmb250LXNpemU6IDE4cHg7XG4gIG1hcmdpbi1sZWZ0OiAxN3B4O1xuICBjb2xvcjogIzM1NjVhZDtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLWxlZnQgLndhdGVyLWhlYWQgLnd0ciB7XG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1sZWZ0OiAxN3B4O1xuICBjb2xvcjogIzI5NTY5YTtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLWxlZnQgLndoLWFwIHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnM7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xuICBtYXJnaW4tdG9wOiA4MHB4O1xuICBtYXJnaW4tbGVmdDogNjVweDtcbiAgdGV4dC1zaGFkb3c6IDFweCAxcHggMXB4IGJsYWNrO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAubG9naW4tcmlnaHQge1xuICBwYWRkaW5nLXRvcDogNnZoO1xuICBwYWRkaW5nLWJvdHRvbTogMXZoO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAubG9naW4tcmlnaHQgLmZhIHtcbiAgZm9udC1zaXplOiAzNXB4O1xuICBjb2xvcjogIzkwOGY4Zjtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLXJpZ2h0IC5jYXB0Y2gtc3R5bGUge1xuICBmb250LXNpemU6IDI2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZy10b3A6IDE4cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMTZweDtcbiAgY29sb3I6IGdyZWVuO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAubG9naW4tcmlnaHQgLmZvcm0tZ3JvdXAge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzcxNzE3MTtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLXJpZ2h0IC5mb3JtLWNvbnRyb2wge1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIgLmZvcm0tY29udGFpbmVyIC5sb2dpbi1yaWdodCAuY3VzdG9tLWNoZWNrIHtcbiAgY29sb3I6ICMzNTY1YWQ7XG4gIGZvbnQtc2l6ZTogMjZweDtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLXJpZ2h0IC5jdXN0b20tbGFiZWwge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjOTA4ZjhmO1xuICBmb250LWZhbWlseTogcG9wcGlucztcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLmxvZ2luLXJpZ2h0IC5jdXN0b20tYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA2MWE0YztcbiAgaGVpZ2h0OiA0MXB4O1xuICB3aWR0aDogMTU3cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMjJweDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1sZWZ0OiA1M3B4O1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAucmVnaXN0ZXItcmlnaHQge1xuICBwYWRkaW5nLXRvcDogNnZoO1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5mb3JtLWNvbnRhaW5lciAucmVnaXN0ZXItcmlnaHQgLmZhIHtcbiAgZm9udC1zaXplOiAyN3B4O1xuICBjb2xvcjogIzkwOGY4Zjtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLnJlZ2lzdGVyLXJpZ2h0IC5mb3JtLWdyb3VwIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM3MTcxNzE7XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIgLmZvcm0tY29udGFpbmVyIC5yZWdpc3Rlci1yaWdodCAuY2FwdGNoLXN0eWxlIHtcbiAgZm9udC1zaXplOiAyNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmctdG9wOiAxOHB4O1xuICBtYXJnaW4tbGVmdDogLTE2cHg7XG4gIGNvbG9yOiBncmVlbjtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLnJlZ2lzdGVyLXJpZ2h0IC5mb3JtLWNvbnRyb2wge1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XG59XG4ubG9naW4tY29udGFpbmVyIC5pbm5lci1jb250YWluZXIgLmZvcm0tY29udGFpbmVyIC5yZWdpc3Rlci1yaWdodCAuY3VzdG9tLWNoZWNrIHtcbiAgY29sb3I6ICMzNTY1YWQ7XG4gIGZvbnQtc2l6ZTogMjZweDtcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLnJlZ2lzdGVyLXJpZ2h0IC5jdXN0b20tbGFiZWwge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjOTA4ZjhmO1xuICBmb250LWZhbWlseTogcG9wcGlucztcbn1cbi5sb2dpbi1jb250YWluZXIgLmlubmVyLWNvbnRhaW5lciAuZm9ybS1jb250YWluZXIgLnJlZ2lzdGVyLXJpZ2h0IC5jdXN0b20tYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA2MWE0YztcbiAgaGVpZ2h0OiA0MXB4O1xuICB3aWR0aDogMTU3cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMjJweDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1sZWZ0OiA1M3B4O1xufVxuLmxvZ2luLWNvbnRhaW5lciAuaW5uZXItY29udGFpbmVyIC5xdW90ZSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAyMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIHdpZHRoOiAxMDB2dztcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4udG9wLWxhYmVsIHtcbiAgZm9udC1zaXplOiAyN3B4O1xuICBjb2xvcjogIzQ0N2NkMjtcbiAgdGV4dC1zaGFkb3c6IDBweCAwcHggMXB4ICMwMTBiMTA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjYmYzZmQ7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgYm94LXNoYWRvdzogMHB4IDFweCA3cHggZ3JleTtcbn1cblxuLmZvb3RlciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmZvb3RlciBpbWcge1xuICB3aWR0aDogMzY3cHg7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLWxlZnQ6IC0xMnB4O1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM3NXB4KSB7XG4gIC5mb3JtLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gICAgdG9wOiAxdmggIWltcG9ydGFudDtcbiAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmxvZ2luLWNvbnRhaW5lciB7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgfVxuXG4gIC5sb2dpbi1sZWZ0IHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDYxJSAhaW1wb3J0YW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDIzcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDI1NHB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAub2Rpc2hhLWxvZ28gaW1nIHtcbiAgICBtYXJnaW4tdG9wOiAzcHggIWltcG9ydGFudDtcbiAgICBtYXJnaW4tbGVmdDogMTEzcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5sb2dpbi1yaWdodCB7XG4gICAgcGFkZGluZy10b3A6IDR2aCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnJlZ2lzdGVyLXJpZ2h0IHtcbiAgICBwYWRkaW5nLXRvcDogNHZoICFpbXBvcnRhbnQ7XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLmxvZ2luLWNvbnRhaW5lciB7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgfVxuXG4gIC5vZGlzaGEtbG9nbyBpbWcge1xuICAgIG1hcmdpbi10b3A6IDNweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1sZWZ0OiA4N3B4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuY3VzdG9tLWJ0biB7XG4gICAgbWFyZ2luLWxlZnQ6IDM4cHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5sb2dpbi1sZWZ0IHtcbiAgICBoZWlnaHQ6IDIzOHB4ICFpbXBvcnRhbnQ7XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDE0cHgpIHtcbiAgLmZvcm0tY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcbiAgICB0b3A6IDF2aCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gIH1cblxuICAubG9naW4tY29udGFpbmVyIHtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICB9XG5cbiAgLmxvZ2luLWxlZnQge1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXIgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNjElICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogMjNweCAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMjU0cHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5vZGlzaGEtbG9nbyBpbWcge1xuICAgIG1hcmdpbi10b3A6IDNweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1sZWZ0OiAxMTNweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmxvZ2luLXJpZ2h0IHtcbiAgICBwYWRkaW5nLXRvcDogNHZoICFpbXBvcnRhbnQ7XG4gIH1cblxuICAucmVnaXN0ZXItcmlnaHQge1xuICAgIHBhZGRpbmctdG9wOiA0dmggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5jdXN0b20tYnRuIHtcbiAgICBtYXJnaW4tbGVmdDogNzZweCAhaW1wb3J0YW50O1xuICB9XG59XG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5mb3JtLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIHRvcDogMjJ2aDtcbiAgfVxuXG4gIC5sb2dpbi1yaWdodCB7XG4gICAgcGFkZGluZy10b3A6IDE1dmg7XG4gIH1cblxuICAucmVnaXN0ZXItcmlnaHQge1xuICAgIHBhZGRpbmctdG9wOiA4dmg7XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gIC5mb3JtLWNvbnRhaW5lciB7XG4gICAgdG9wOiAyMnZoO1xuICAgIG1hcmdpbi1sZWZ0OiAxNHZoO1xuICB9XG5cbiAgLmxvZ2luLXJpZ2h0IHtcbiAgICBwYWRkaW5nLXRvcDogMTN2aDtcbiAgfVxuXG4gIC5yZWdpc3Rlci1yaWdodCB7XG4gICAgcGFkZGluZy10b3A6IDd2aDtcbiAgfVxufVxuOjpuZy1kZWVwIC5tb2RhbC1kaWFsb2cge1xuICB3aWR0aDogODB2dztcbiAgbWFyZ2luOiAxcmVtIDVyZW07XG59XG5cbjo6bmctZGVlcCAubW9kYWwtY29udGVudCB7XG4gIHdpZHRoOiA4MHZ3O1xufVxuXG4ucGRmLWMge1xuICBmb250LXdlaWdodDogYm9sZGVyICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMjEyNTI5ICFpbXBvcnRhbnQ7XG59XG5cbi5kYXRlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDIlO1xuICByaWdodDogNSU7XG4gIGNvbG9yOiBhbGljZWJsdWU7XG59XG5cbi5mcy0xNCB7XG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1sYWJlbCB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmZvcm0tc2VsZWN0IHtcbiAgYm9yZGVyLXJhZGl1czogNXB4ICFpbXBvcnRhbnQ7XG59XG5cbi50ZXh0LWJsYWNrIHtcbiAgY29sb3I6ICMwMDAwMDA7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/components/login/login.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/components/login/login.component.ts ***!
    \*****************************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppComponentsLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _services_admin_login_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../services/admin/login.service */
    "./src/app/services/admin/login.service.ts");
    /* harmony import */


    var environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @app/services/authentication/auth.service */
    "./src/app/services/authentication/auth.service.ts");
    /* harmony import */


    var _app_app_setting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @app/app.setting */
    "./src/app/app.setting.ts");
    /* harmony import */


    var _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @app/services/toastr/toastr.service */
    "./src/app/services/toastr/toastr.service.ts");
    /* harmony import */


    var _app_services_session_session_checker_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @app/services/session/session-checker.service */
    "./src/app/services/session/session-checker.service.ts");
    /* harmony import */


    var _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @app/services/storage/storage.service */
    "./src/app/services/storage/storage.service.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @app/validators/custom.validators */
    "./src/app/validators/custom.validators.ts");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! crypto-js */
    "./node_modules/crypto-js/index.js");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_14__);
    /* harmony import */


    var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ngx-bootstrap */
    "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js"); // import { AppConstants } from '@app/app.constants';
    // import { LoginService } from '@app/services/login/login.service';


    var LoginComponent = /*#__PURE__*/function () {
      function LoginComponent(formFB, // private registerFB: FormBuilder,
      router, authService, appSetting, toastr, // private error: ErrorResponseService,
      spinner, sessionCheckerService, appStorage, login, modalService, sanitizer) {
        _classCallCheck(this, LoginComponent);

        this.formFB = formFB;
        this.router = router;
        this.authService = authService;
        this.appSetting = appSetting;
        this.toastr = toastr;
        this.spinner = spinner;
        this.sessionCheckerService = sessionCheckerService;
        this.appStorage = appStorage;
        this.login = login;
        this.modalService = modalService;
        this.sanitizer = sanitizer;
        this.isChecked = false;
        this.isRegister = false;
        this.isForgotPass = false;
        this.isVerify = false;
        this.bVerify = true;
        this.isLogin = true;
        this.env = environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"];
        this.disableSendReq = false;
        this.disableReSendReq = true;
        this.noOfTimes = 2;
        this.currentDate = Date.now();
        this.dashBoardData = [];
        this.investmentType = '';
        this.district = '';
        this.riskCategory = '';
        this.showDetails = false; // secretKey = '5f2b71a6d4c8e9a5bb9c4e6a88c7956a3e5b2d7f1c9f3a7f5d4e6c8f1b9a7e6d';

        this.secretKey = '5f2b71a6d4c8e9a5bb9c4e6a88c7956a3e5b2d7f1c9f3a7f5d4e6c8f1b9a7e6d';
        this.createForgotPassForm();
        this.createLoginFormInstance();
        this.createRegisterForm();
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          // this.getToken();
          this.getCaptcha(); // console.log(this.currentDate,'asjhdajdhash');
        }
      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          this.authService.removeStorageDetails(); // this.sessionCheckerService.resetSession();
        }
      }, {
        key: "tooggle",
        value: function tooggle() {
          this.isChecked = !this.isChecked;
        }
      }, {
        key: "createLoginFormInstance",
        value: function createLoginFormInstance() {
          this.loginForm = this.formFB.group({
            userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_13__["userIdValidator"]])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_13__["passwordValidator"]])],
            captchaId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])]
          });
        }
      }, {
        key: "createRegisterForm",
        value: function createRegisterForm() {
          this.registerForm = this.formFB.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_13__["nameValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_13__["nameValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_app_validators_custom_validators__WEBPACK_IMPORTED_MODULE_13__["emailValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^((\\+91-?)|0)?[0-9]{10}$')])]
          });
        }
      }, {
        key: "createForgotPassForm",
        value: function createForgotPassForm() {
          this.forgotPassForm = this.formFB.group({
            userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            mobileNo: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
            otp: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            password: [{
              value: '',
              disabled: true
            }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{6,})')])],
            // captcha: ['', Validators.compose([Validators.required])],
            cnfPass: [{
              value: '',
              disabled: true
            }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])]
          }, {
            validator: this.matchingPasswords('password', 'cnfPass')
          });
        }
      }, {
        key: "getCaptcha",
        value: function getCaptcha() {
          var _this8 = this;

          this.login.getCaptchaImage().subscribe(function (response) {
            // console.log(response);
            _this8.captchaImg = response; // console.log(this.captchaImg.type);
            // console.log(this.captchat);

            if (_this8.isLogin) {
              _this8.captcha.nativeElement.innerHTML = _this8.captchaImg;
            }
            /* else if (this.isForgotPass) {
            this.frgtCaptcha.nativeElement.innerHTML = this.captchaImg;
            } */
            else if (_this8.isRegister) {
                _this8.regCaptcha.nativeElement.innerHTML = _this8.captchaImg;
              }
          });
        }
      }, {
        key: "getCaptchaValue",
        value: function getCaptchaValue(event) {
          this.captchaValue = event.target.value; // console.log(this.captchaValue);
        }
      }, {
        key: "getCaptchaApp",
        value: function getCaptchaApp() {
          var _this9 = this;

          this.login.getCaptchaImage().subscribe(function (response) {
            _this9.captchaImg = response;
            _this9.captchaSvg = _this9.sanitizer.bypassSecurityTrustHtml(_this9.captchaImg);
          });
        }
      }, {
        key: "verifyCaptcha",
        value: function verifyCaptcha(event) {
          this.cValue = event.target.value; // console.log(this.cValue, 'cvalue', this.appNum);
        }
      }, {
        key: "getApplicationStatus",
        value: function getApplicationStatus() {
          var _this10 = this;

          var data = {
            capValue1: this.cValue,
            appNum: this.appNum
          }; // console.log(data);

          this.login.getApplicationSatus(data).subscribe(function (res) {
            console.log(res);

            if (res.Status == false) {
              console.log('mismatch');

              _this10.toastr.dangerToastr('Invalid Captcha');

              _this10.appStatus = 'not found';
            } else {
              console.log('get status', res.status_name);
              _this10.appStatus = res.status_name;
            }
          });
        }
        /* Encription Methods */

      }, {
        key: "encSaltedPassword",
        value: function encSaltedPassword(data, noOfTimes, salt) {
          // console.log('SALT: ', salt);
          var PASSWORD = this.encodePassword(data, noOfTimes);
          var ENC_PASS = this.sha512Hash(PASSWORD + '#' + salt);
          console.log('ENCODED PASS: ', ENC_PASS);
          return ENC_PASS;
        }
      }, {
        key: "encodePassword",
        value: function encodePassword(data, noOfTimes) {
          var password = data;

          while (noOfTimes > 0) {
            // console.log('BEFORE ENCODING: ' + password);
            password = this.sha512Hash(password);
            console.log('AFTER ENCODING: ', password);
            noOfTimes--;
          }

          return password;
        }
      }, {
        key: "sha512Hash",
        value: function sha512Hash(data) {
          try {
            return crypto_js__WEBPACK_IMPORTED_MODULE_14__["SHA512"](data).toString();
          } catch (error) {
            console.log(error);
          }
        }
        /* Encription Methods Ends Here*/
        // decryptToken(encryptedText: string): string {
        //   console.log(encryptedText);
        //   try {
        //     // Split the encrypted text into IV and ciphertext parts
        //     const textParts = encryptedText.split(':');
        //     const iv = CryptoJS.enc.Hex.parse(textParts[0]); // IV part (hex-encoded)
        //     const encryptedData = textParts[1]; // Ciphertext part (assumed to be base64 or hex)
        //     // Convert the secret key to CryptoJS-compatible format
        //     const key = CryptoJS.enc.Hex.parse(this.secretKey);
        //     // Decrypt the token (assuming ciphertext is Base64-encoded)
        //     const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        //       iv: iv,
        //       mode: CryptoJS.mode.CBC,
        //       padding: CryptoJS.pad.Pkcs7
        //     });
        //     // Convert decrypted data back to a UTF-8 string
        //     const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        //     if (!decryptedText) {
        //       throw new Error('Decryption failed, possibly due to incorrect key/IV');
        //     }
        //     return decryptedText;
        //   } catch (error) {
        //     console.error('Error during decryption:', error.message);
        //     throw new Error('Failed to decrypt the token');
        //   }
        // }

      }, {
        key: "getLoginData",
        value: function getLoginData(data) {
          var _this11 = this;

          // console.log(data, 'getLogin');
          var ENC_PASSWORD = this.encSaltedPassword(data.password, this.noOfTimes, this.captchaValue); // console.log(ENC_PASSWORD);

          var LOGIN_DATA = {
            userName: data.userName,
            password: ENC_PASSWORD,
            captchaId: this.captchaValue
          }; // console.log(LOGIN_DATA,'LOGIN_DATA');

          this.spinner.show();
          this.login.getLoginDetails(LOGIN_DATA).subscribe(function (successResponse) {
            console.log(successResponse, 'successResponse');
            console.log('Login Response', successResponse['status']);
            console.log('Show data login', successResponse['token']);
            var token = successResponse['token']; // The token is in the format IV:EncryptedData
            // const decryptedToken = this.decryptToken(token);
            // console.log('Decrypted Token:', decryptedToken);
            // let decodedValue = atob(successResponse['token']);
            // console.log('Decoded value:', decodedValue);
            // this.appStorage.setSessionAttribute('isLoggedIn', true);
            // this.appStorage.setSessionAttribute('accessTokenDetails', successResponse);
            // if (successResponse['status'] == false && successResponse['message'] == 'Please change your password' ) {
            //   alert('your password is too old, please change password');
            //   this.router.navigateByUrl('pages/citizen/change-password');
            //   this.spinner.hide();
            // } else {        

            if (successResponse['status'] === 'SUCCESS') {
              localStorage.setItem('role_id', successResponse['user'].role_id);

              if (successResponse['user'].role_id === 3) {
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('isApprover', 'false');
                localStorage.setItem('access_token', successResponse['token']);
                sessionStorage.setItem('access_token', successResponse['token']);
                localStorage.setItem('user_Name', successResponse['user'].display_name);
                localStorage.setItem('user_email', successResponse['user'].email);
                localStorage.setItem('name', successResponse['user'].user_name);
                localStorage.setItem('mobile', successResponse['user'].mobile);
                localStorage.setItem('id', successResponse['user'].id);
                localStorage.setItem('role_id', successResponse['user'].role_id); // localStorage.setItem('isFirstLogin', successResponse['user'].first_login);

                console.log(successResponse['status1'], 'successResponse1235489654');

                if (successResponse['user'].first_login || successResponse['user'].first_login === 'true') {
                  _this11.router.navigateByUrl('/changepassword');
                } else {
                  if (successResponse['status1'] == false) {
                    alert('your password is too old, please change password');

                    _this11.router.navigateByUrl('pages/citizen/change-password');

                    _this11.spinner.hide();
                  } else {
                    _this11.router.navigateByUrl('/pages/citizen/proposal');
                  }
                } // this.router.navigateByUrl('/pages/citizen/proposal');


                _this11.spinner.hide(); // this.toastr.successToastr('Welcome ' + successResponse['user'].display_name);

              } else if (successResponse['user'].role_id === 2 || successResponse['user'].role_id === 4 || successResponse['user'].role_id === 5 || successResponse['user'].role_id === 6 || successResponse['user'].role_id === 7 || successResponse['user'].role_id === 8) {
                localStorage.setItem('isApprover', 'true');
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('access_token', successResponse['token']);
                sessionStorage.setItem('access_token', successResponse['token']); // this.toastr.successToastr('Welcome'+successResponse["user"].display_name)

                if (successResponse["status1"] == false) {
                  alert("your password is too old, please change password");

                  _this11.router.navigateByUrl("/changepassword");

                  _this11.spinner.hide();
                } else {
                  _this11.router.navigateByUrl('/pages/approver');

                  _this11.spinner.hide();
                } // this.toastr.successToastr('Welcome ' + successResponse['user'].display_name);

              } else if (successResponse['user'].role_id === 1) {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('isApprover', 'false');
                localStorage.setItem('access_token', successResponse['token']);
                sessionStorage.setItem('access_token', successResponse['token']);
                console.log('access_token', successResponse['token']); // this.toastr.successToastr(successResponse["message"]);

                if (successResponse["status1"] == false) {
                  alert("your password is too old, please change password");

                  _this11.router.navigateByUrl("pages/approver/change-password");

                  _this11.spinner.hide();
                } else {
                  _this11.router.navigateByUrl('/pages/admin');

                  _this11.spinner.hide();
                } // this.toastr.successToastr('Welcome ' + successResponse['user'].display_name);

              } else {
                _this11.spinner.hide();

                _this11.toastr.dangerToastr('Invalid user or password');

                _this11.getCaptcha();
              }
            } else if (successResponse['status'] === 'FAILURE') {
              _this11.spinner.hide();

              _this11.getCaptcha();

              _this11.toastr.dangerToastr('Invalid user or password');
            } // }

          }, function (errorResponse) {
            _this11.spinner.hide();

            _this11.getCaptcha(); // this.getToken();


            console.log(errorResponse, 'errorResponse');

            _this11.toastr.dangerToastr(errorResponse.statusText + ', Please enter valid captcha'); // this.loginForm.reset();

          });
        }
      }, {
        key: "openRegistrationForm",
        value: function openRegistrationForm() {
          this.isRegister = true;
          this.getCaptcha();
          this.createRegisterForm();
          this.isLogin = false;
          this.isForgotPass = false;
        }
      }, {
        key: "openForgotPasswordForm",
        value: function openForgotPasswordForm() {
          this.disableReSendReq = true;
          this.disableSendReq = false;
          this.isForgotPass = true;
          this.getCaptchaOtp();
          this.createForgotPassForm();
          this.isLogin = false;
          this.bVerify = true;
          this.isVerify = false;
        }
      }, {
        key: "registerUser",
        value: function registerUser(data) {
          var _this12 = this;

          this.spinner.show();
          var DATA = {
            userName: data.email,
            email: data.email,
            phone: data.phone,
            displayName: data.firstName + ' ' + data.lastName,
            captchaId: this.captchaValue
          };
          console.group('Register Data');
          console.log(DATA);
          this.login.cerateUser(DATA).subscribe(function (response) {
            if (response !== null) {
              _this12.spinner.hide();

              _this12.getCaptcha();

              _this12.toastr.successToastr(response['message'] + 'Successfully. Please check your e-mail');

              _this12.isLogin = true;
              _this12.isRegister = false;

              _this12.router.navigateByUrl('/login');
            }
          }, function (errorResponse) {
            _this12.spinner.hide();

            _this12.getCaptcha();

            _this12.toastr.dangerToastr('Unable to register');
          });
        }
      }, {
        key: "openLoginForm",
        value: function openLoginForm() {
          this.disableReSendReq = true;
          this.disableSendReq = false;
          this.isForgotPass = false;
          this.isRegister = false;
          this.isLogin = true;
        }
      }, {
        key: "verifyOtp",
        value: function verifyOtp() {
          var _this13 = this;

          // Get the OTP value from the form control cnfPass
          var enablePwd = this.forgotPassForm.get('password');
          var enableCPwd = this.forgotPassForm.get('cnfPass');
          var otp = this.forgotPassForm.get('otp').value;
          var user_name = this.forgotPassForm.get('userName').value; // Optional: Add validation to ensure OTP is a valid value (e.g., 4 digits)

          if (otp && otp.length === 4) {
            console.log('verify', otp); // Create an object with the OTP

            var otpData = {
              otp: otp,
              user_name: user_name
            };
            console.log(otpData, 'otpdata'); // Send the object to the verifyOtp API

            this.login.verifyOtp(otpData).subscribe(function (successResponse) {
              console.log(successResponse, 'otp verify');

              if (successResponse['status'] == 'SUCCESS') {
                enablePwd.enable();
                enableCPwd.enable();

                _this13.toastr.successToastr('OTP verified successfully');
              }
            }, function (errorResponse) {
              console.error('OTP verification failed', errorResponse);

              _this13.toastr.dangerToastr(errorResponse.error['message']);
            });
          } else {
            this.toastr.dangerToastr('Please enter a valid 4-digit OTP');
          }
        }
      }, {
        key: "reSendOtp",
        value: function reSendOtp(data) {
          var _this14 = this;

          var DATA = {
            userName: data.userName,
            mobileNo: data.mobileNo
          };
          console.log('Resend OTP called');
          this.spinner.show();
          this.login.reSendOtp(DATA).subscribe(function (successResponse) {
            console.log('Resend OTP Response', successResponse);
            console.log('OTP Response', successResponse, successResponse['status']);
            _this14.disableReSendReq = true;
            console.log(_this14.disableSendReq);

            _this14.setSyncTimer('resend');

            _this14.toastr.successToastr(successResponse['status']);

            _this14.spinner.hide();

            _this14.spinner.hide();
          }, function (errorResponse) {
            _this14.spinner.hide();

            _this14.toastr.dangerToastr('Invalid Credentials');
          });
        }
      }, {
        key: "getCaptchaOtp",
        value: function getCaptchaOtp() {
          var _this15 = this;

          this.login.getCaptchaImage().subscribe(function (response) {
            _this15.captchaImg = response;
            _this15.captchaSvg = _this15.sanitizer.bypassSecurityTrustHtml(_this15.captchaImg);
          });
        }
      }, {
        key: "otpverifyCaptcha",
        value: function otpverifyCaptcha(event) {
          this.captchaValue = event.target.value; // console.log(this.captchaValue, 'captchaValue');
        }
      }, {
        key: "sendOtp",
        value: function sendOtp(data) {
          var _this16 = this;

          var userId = {
            captchaEntry: this.captchaValue,
            userName: data.userName
          };
          console.log(userId, 'Send OTP called');
          this.spinner.show();
          var DATA = {
            captchaEntry: this.captchaValue,
            userName: data.userName,
            mobileNo: data.mobileNo
          };
          console.log(DATA, 'otpData');
          this.spinner.hide();
          this.login.sendOtp(DATA).subscribe(function (successResponse) {
            console.log('OTP Response', successResponse, successResponse['status']);
            _this16.disableSendReq = true;
            _this16.isVerify = true;
            _this16.bVerify = false;
            console.log(_this16.disableSendReq);

            _this16.setSyncTimer('send');

            _this16.toastr.successToastr(successResponse['status']);

            _this16.spinner.hide();
          }, function (errorResponse) {
            _this16.disableSendReq = false;
            console.log(errorResponse);

            _this16.toastr.dangerToastr('Invalid Credentials');

            _this16.spinner.hide();
          });
        }
      }, {
        key: "setSyncTimer",
        value: function setSyncTimer(data) {
          var _this17 = this;

          if (data === 'send') {
            this.disableSendReq = true;
            this.disableReSendReq = true;
            this.resendTimerID = setTimeout(function () {
              _this17.disableReSendReq = false;
            }, 60 * 1000);
          } else if (data === 'resend') {
            this.disableReSendReq = true;
            this.resendTimerID = setTimeout(function () {
              _this17.disableReSendReq = false;
            }, 60 * 1000);
          }
        }
      }, {
        key: "clearTimer",
        value: function clearTimer() {
          this.disableReSendReq = true;

          if (this.resendTimerID !== undefined) {
            clearTimeout(this.resendTimerID);
          }
        }
      }, {
        key: "submitForgotPassForm",
        value: function submitForgotPassForm(data) {
          var _this18 = this;

          console.log('All Data:---', data);
          this.spinner.show();
          var PASS = this.encodePassword(data.password, this.noOfTimes);
          var FRGT_DATA = {
            userName: data.userName,
            otp: data.otp,
            password: PASS
          };
          this.login.changePassWithAuth(FRGT_DATA).subscribe(function (successResponse) {
            console.log('OTP Response', successResponse);

            if (successResponse['status'] !== -1) {
              _this18.toastr.successToastr(successResponse['status']);

              _this18.isForgotPass = false;
              _this18.isLogin = true;
            } else {
              _this18.toastr.warningToastr(successResponse['status']);
            }

            _this18.spinner.hide();
          }, function (errorResponse) {
            _this18.toastr.dangerToastr(errorResponse.error['message']);

            _this18.spinner.hide();
          });
        }
      }, {
        key: "matchingPasswords",
        value: function matchingPasswords(passwordKey, passwordConfirmationKey) {
          return function (group) {
            var password = group.controls[passwordKey];
            var passwordConfirmation = group.controls[passwordConfirmationKey];

            if (passwordConfirmation.value !== '' && password.value !== passwordConfirmation.value) {
              return passwordConfirmation.setErrors({
                mismatchedPasswords: true
              });
            }
          };
        }
      }, {
        key: "openFeedBackModal",
        value: function openFeedBackModal(id) {
          this.modalRef = this.modalService.show(id);
          this.getCaptchaApp();
          this.getServiceDashoad();
          this.getDistrictList();
          this.showDetails = false;
        }
      }, {
        key: "getServiceDashoad",
        value: function getServiceDashoad() {
          var _this19 = this;

          this.startDate = '';
          this.endDate = '';
          this.investmentType = '';
          this.district = '';
          this.dashBoardData = [];
          var dateDuration = {
            startDate: this.startDate,
            endDate: this.endDate
          };
          this.login.landingDashboard(dateDuration).subscribe(function (response) {
            console.log(response[0], 'response');

            _this19.dashBoardData.push(response[0]);
          });
        }
      }, {
        key: "submitDetails",
        value: function submitDetails() {
          var _this20 = this;

          this.showDetails = true;
          console.log(this.startDate, this.endDate, this.investmentType, 'investment', this.district.id, 'district', this.riskCategory, 'datepicker info');
          this.dateDuration = {
            startDate: this.startDate,
            endDate: this.endDate,
            investment: this.investmentType,
            district: this.district.id
          };

          if (this.dateDuration) {
            this.login.landingDashboard(this.dateDuration).subscribe(function (response) {
              _this20.dashBoardData = [];
              console.log(response[0], 'response');

              _this20.dashBoardData.push(response[0]); // // Redirect to another page with query parameters
              // this.router.navigate(['/table-data'], { 
              //   queryParams: { 
              //     startDate: dateDuration.startDate, 
              //     endDate: dateDuration.endDate, 
              //     investment: dateDuration.investment, 
              //     district: dateDuration.district 
              //   }
              // });

            });
          } else {
            this.toastr.dangerToastr('Please give valid input');
          }
        }
      }, {
        key: "getDistrictList",
        value: function getDistrictList() {
          var _this21 = this;

          this.login.getDistrictList().subscribe(function (res) {
            _this21.districtList = res;
            console.log(_this21.districtList);
          });
        }
      }, {
        key: "openNewTab",
        value: function openNewTab() {
          // Ensure dateDuration is defined
          if (!this.dateDuration) {
            this.dateDuration = {};
          }

          var _this$dateDuration = this.dateDuration,
              startDate = _this$dateDuration.startDate,
              endDate = _this$dateDuration.endDate,
              investment = _this$dateDuration.investment,
              district = _this$dateDuration.district;
          var url; // Check if any query parameter is null, empty, or undefined

          if (startDate && endDate && investment && district) {
            // Create the URL tree with parameters
            var urlTree = this.router.createUrlTree(['/table-data'], {
              queryParams: {
                startDate: startDate,
                endDate: endDate,
                investment: investment,
                district: district
              }
            }); // Serialize the URL tree to a string

            url = this.router.serializeUrl(urlTree);
          } else {
            // Create a URL tree without query parameters
            url = this.router.serializeUrl(this.router.createUrlTree(['/table-data']));
          } // Get the base URL


          var baseUrl = window.location.origin + '/index.html#'; // Open the new tab with the full URL

          window.open("".concat(baseUrl).concat(url), '_blank'); // const baseUrl = window.location.origin + '/index.html#';
          // const url = this.router.serializeUrl(this.router.createUrlTree(['/table-data']));
          // window.open(`${baseUrl}${url}`, '_blank');
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.clearTimer();
        }
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"]
      }, {
        type: _app_app_setting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"]
      }, {
        type: _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_9__["ToastrClientService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]
      }, {
        type: _app_services_session_session_checker_service__WEBPACK_IMPORTED_MODULE_10__["SessionCheckerService"]
      }, {
        type: _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"]
      }, {
        type: _services_admin_login_service__WEBPACK_IMPORTED_MODULE_5__["LoginService"]
      }, {
        type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_15__["BsModalService"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__["DomSanitizer"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('captcha', {
      "static": true
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], LoginComponent.prototype, "captcha", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('regCaptcha', {
      "static": true
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], LoginComponent.prototype, "regCaptcha", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('phCaptcha', {
      "static": true
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], LoginComponent.prototype, "phCaptcha", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('otpCaptcha', {
      "static": true
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], LoginComponent.prototype, "otpCaptcha", void 0);
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/login/login.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.scss */
      "./src/app/components/login/login.component.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"], _app_app_setting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"], _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_9__["ToastrClientService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _app_services_session_session_checker_service__WEBPACK_IMPORTED_MODULE_10__["SessionCheckerService"], _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"], _services_admin_login_service__WEBPACK_IMPORTED_MODULE_5__["LoginService"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_15__["BsModalService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__["DomSanitizer"]])], LoginComponent);
    /***/
  },

  /***/
  "./src/app/components/payment-response/payment-response/payment-response.component.ts":
  /*!********************************************************************************************!*\
    !*** ./src/app/components/payment-response/payment-response/payment-response.component.ts ***!
    \********************************************************************************************/

  /*! exports provided: PaymentResponseComponent */

  /***/
  function srcAppComponentsPaymentResponsePaymentResponsePaymentResponseComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaymentResponseComponent", function () {
      return PaymentResponseComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _app_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @app/services/common/common.service */
    "./src/app/services/common/common.service.ts");
    /* harmony import */


    var _app_modules_common_form_common_form_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @app/modules/common-form/common-form.service */
    "./src/app/modules/common-form/common-form.service.ts");
    /* harmony import */


    var _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @app/services/toastr/toastr.service */
    "./src/app/services/toastr/toastr.service.ts");

    var PaymentResponseComponent = /*#__PURE__*/function () {
      function PaymentResponseComponent(httpClient, route, router, commonService, service, toastr) {
        _classCallCheck(this, PaymentResponseComponent);

        this.httpClient = httpClient;
        this.route = route;
        this.router = router;
        this.commonService = commonService;
        this.service = service;
        this.toastr = toastr;
      }

      _createClass(PaymentResponseComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this22 = this;

          /*  this.route.params.subscribe(response => {
             console.log('Data', response);
             // this.getPaymentData(response);
           }); */
          this.route.queryParams.subscribe(function (response) {
            console.log(response.data);
            var DATA = response.data;
            var N_DATA = String(DATA).replace(' ', '+'); // console.log(N_DATA);

            _this22.getPaymentData(N_DATA);
          }); // this.getPaymentData(ID);
        }
      }, {
        key: "getPaymentData",
        value: function getPaymentData(id) {
          var _this23 = this;

          var data = {
            'id': String(id)
          }; // console.log(data, 'data');

          this.commonService.GettransactionDetails(data.id).subscribe(function (res) {
            // console.log(res, 'response-payment status');
            _this23.commonService.storeDetails(res[0]); // this.applicationId = res['appId'];


            _this23.applicationId = res && res[0] ? res[0].appId : null;
            localStorage.setItem('access_token', res['jtoken']);

            if (res[0].status === 'S') {
              _this23.updateStatus();
            }

            _this23.router.navigateByUrl('pages/citizen/proposal/p4');
          }); // this.httpClient.post('http://localhost:4200/index.html#/payment-status', data).subscribe(response => {
          //   console.log(response);
          //   this.commonService.storeDetails(response);
          //   this.applicationId = response['appId'];
          //   localStorage.setItem('access_token', response['jtoken']);
          //   if(response['status'] === 'S'){
          //     this.updateStatus();
          //   }
          //   this.router.navigateByUrl('pages/citizen/proposal/p4');
          // }, errorResponse => {
          //   console.log(errorResponse);
          // });
        }
      }, {
        key: "updateStatus",
        value: function updateStatus() {
          var _this24 = this;

          this.service.updateFormStatus(this.applicationId).subscribe(function (response) {
            console.log(response);

            if (response !== null) {
              // this.status = response;
              // console.log(this.status);
              // this.router.navigateByUrl('pages/citizen/status');
              _this24.toastr.successToastr(response['message']);
            } else {
              _this24.toastr.dangerToastr('Something Went Wrong');
            }
          });
        }
      }]);

      return PaymentResponseComponent;
    }();

    PaymentResponseComponent.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _app_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]
      }, {
        type: _app_modules_common_form_common_form_service__WEBPACK_IMPORTED_MODULE_5__["CommonFormService"]
      }, {
        type: _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_6__["ToastrClientService"]
      }];
    };

    PaymentResponseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-payment-response',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./payment-response.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/payment-response/payment-response/payment-response.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./payment-response.scss */
      "./src/app/components/payment-response/payment-response/payment-response.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _app_modules_common_form_common_form_service__WEBPACK_IMPORTED_MODULE_5__["CommonFormService"], _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_6__["ToastrClientService"]])], PaymentResponseComponent);
    /***/
  },

  /***/
  "./src/app/components/payment-response/payment-response/payment-response.scss":
  /*!************************************************************************************!*\
    !*** ./src/app/components/payment-response/payment-response/payment-response.scss ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsPaymentResponsePaymentResponsePaymentResponseScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@-webkit-keyframes blink {\n  0% {\n    opacity: 0.2;\n  }\n  20% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n@keyframes blink {\n  0% {\n    opacity: 0.2;\n  }\n  20% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n.main-box .dots {\n  text-align: center;\n}\n.main-box .dots h2 span {\n  font-size: 200px;\n  -webkit-animation-name: blink;\n          animation-name: blink;\n  -webkit-animation-duration: 1.4s;\n          animation-duration: 1.4s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n.main-box .dots h2 span:nth-child(2) {\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\n.main-box .dots h2 span:nth-child(3) {\n  -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n}\n.main-box .message {\n  text-align: center;\n  font-size: 25px;\n  font-variant: small-caps;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9wYXltZW50LXJlc3BvbnNlL3BheW1lbnQtcmVzcG9uc2UvQzpcXHdhdGVybmV3XFxXYXRlckFsbG9jYXRpb24yMjA4XFxXYXRlckFsbG9jYXRpb24yMjA4L3NyY1xcYXBwXFxjb21wb25lbnRzXFxwYXltZW50LXJlc3BvbnNlXFxwYXltZW50LXJlc3BvbnNlXFxwYXltZW50LXJlc3BvbnNlLnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvcGF5bWVudC1yZXNwb25zZS9wYXltZW50LXJlc3BvbnNlL3BheW1lbnQtcmVzcG9uc2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJO0lBQ0ksWUFBQTtFQ0NOO0VEQ0U7SUFDSSxVQUFBO0VDQ047RURDRTtJQUNJLFlBQUE7RUNDTjtBQUNGO0FEVkE7RUFDSTtJQUNJLFlBQUE7RUNDTjtFRENFO0lBQ0ksVUFBQTtFQ0NOO0VEQ0U7SUFDSSxZQUFBO0VDQ047QUFDRjtBREdJO0VBQ0ksa0JBQUE7QUNEUjtBREdJO0VBQ0ksZ0JBQUE7RUFDQSw2QkFBQTtVQUFBLHFCQUFBO0VBQ0EsZ0NBQUE7VUFBQSx3QkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0FDRFI7QURHSTtFQUNJLDZCQUFBO1VBQUEscUJBQUE7QUNEUjtBREdJO0VBQ0ksNkJBQUE7VUFBQSxxQkFBQTtBQ0RSO0FER0k7RUFDSSxrQkFBQTtFQUNBLGVBQUE7RUFDQSx3QkFBQTtFQUNBLGlCQUFBO0FDRFIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3BheW1lbnQtcmVzcG9uc2UvcGF5bWVudC1yZXNwb25zZS9wYXltZW50LXJlc3BvbnNlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAa2V5ZnJhbWVzIGJsaW5rIHtcclxuICAgIDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAuMjtcclxuICAgIH1cclxuICAgIDIwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IC4yO1xyXG4gICAgfVxyXG59XHJcblxyXG4ubWFpbi1ib3gge1xyXG4gICAgLmRvdHMge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC5kb3RzIGgyIHNwYW4ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjAwcHg7XHJcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJsaW5rO1xyXG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMS40cztcclxuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xyXG4gICAgfVxyXG4gICAgLmRvdHMgaDIgc3BhbjpudGgtY2hpbGQoMikge1xyXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLjJzO1xyXG4gICAgfVxyXG4gICAgLmRvdHMgaDIgc3BhbjpudGgtY2hpbGQoMykge1xyXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLjRzO1xyXG4gICAgfVxyXG4gICAgLm1lc3NhZ2Uge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgICAgZm9udC12YXJpYW50OiBzbWFsbC1jYXBzO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG59IiwiQGtleWZyYW1lcyBibGluayB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbiAgMjAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuMjtcbiAgfVxufVxuLm1haW4tYm94IC5kb3RzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLm1haW4tYm94IC5kb3RzIGgyIHNwYW4ge1xuICBmb250LXNpemU6IDIwMHB4O1xuICBhbmltYXRpb24tbmFtZTogYmxpbms7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMS40cztcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG59XG4ubWFpbi1ib3ggLmRvdHMgaDIgc3BhbjpudGgtY2hpbGQoMikge1xuICBhbmltYXRpb24tZGVsYXk6IDAuMnM7XG59XG4ubWFpbi1ib3ggLmRvdHMgaDIgc3BhbjpudGgtY2hpbGQoMykge1xuICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XG59XG4ubWFpbi1ib3ggLm1lc3NhZ2Uge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgZm9udC12YXJpYW50OiBzbWFsbC1jYXBzO1xuICBmb250LXdlaWdodDogYm9sZDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/components/products/products.component.ts":
  /*!***********************************************************!*\
    !*** ./src/app/components/products/products.component.ts ***!
    \***********************************************************/

  /*! exports provided: ProductsComponent */

  /***/
  function srcAppComponentsProductsProductsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ProductsComponent", function () {
      return ProductsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/authentication/auth.service */
    "./src/app/services/authentication/auth.service.ts");

    var ProductsComponent = /*#__PURE__*/function () {
      function ProductsComponent(authService) {
        _classCallCheck(this, ProductsComponent);

        this.authService = authService;
        this.slideNo = 1;
        this.isLeft = false;
        this.isRight = false;
      }

      _createClass(ProductsComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "nextSlide",
        value: function nextSlide() {
          this.isLeft = true;
          this.isRight = false;
          this.slideNo++;

          if (this.slideNo > 4) {
            this.slideNo = 1;
          }
        }
      }, {
        key: "prevSlide",
        value: function prevSlide() {
          this.isLeft = false;
          this.isRight = true;
          this.slideNo--;

          if (this.slideNo < 1) {
            this.slideNo = 4;
          }
        }
      }, {
        key: "goBack",
        value: function goBack() {
          this.authService.goBack();
        }
      }]);

      return ProductsComponent;
    }();

    ProductsComponent.ctorParameters = function () {
      return [{
        type: _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }];
    };

    ProductsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-products',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./products.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/products/products.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])], ProductsComponent);
    /***/
  },

  /***/
  "./src/app/components/redirect-data/redirect-data.component.scss":
  /*!***********************************************************************!*\
    !*** ./src/app/components/redirect-data/redirect-data.component.scss ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsRedirectDataRedirectDataComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "/* Chrome, Safari, Edge, Opera */\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9yZWRpcmVjdC1kYXRhL0M6XFx3YXRlcm5ld1xcV2F0ZXJBbGxvY2F0aW9uMjIwOFxcV2F0ZXJBbGxvY2F0aW9uMjIwOC9zcmNcXGFwcFxcY29tcG9uZW50c1xccmVkaXJlY3QtZGF0YVxccmVkaXJlY3QtZGF0YS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9yZWRpcmVjdC1kYXRhL3JlZGlyZWN0LWRhdGEuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0NBQUE7QUFDQTs7RUFFRSx3QkFBQTtFQUNBLFNBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVkaXJlY3QtZGF0YS9yZWRpcmVjdC1kYXRhLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ2hyb21lLCBTYWZhcmksIEVkZ2UsIE9wZXJhICovXHJcbmlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxyXG5pbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XHJcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuIiwiLyogQ2hyb21lLCBTYWZhcmksIEVkZ2UsIE9wZXJhICovXG5pbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcbmlucHV0Ojotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/components/redirect-data/redirect-data.component.ts":
  /*!*********************************************************************!*\
    !*** ./src/app/components/redirect-data/redirect-data.component.ts ***!
    \*********************************************************************/

  /*! exports provided: RedirectDataComponent */

  /***/
  function srcAppComponentsRedirectDataRedirectDataComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RedirectDataComponent", function () {
      return RedirectDataComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_admin_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/admin/login.service */
    "./src/app/services/admin/login.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var RedirectDataComponent = /*#__PURE__*/function () {
      function RedirectDataComponent(login, route) {
        _classCallCheck(this, RedirectDataComponent);

        this.login = login;
        this.route = route;
        this.searchText = '';
      }

      _createClass(RedirectDataComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this25 = this;

          // Using snapshot
          this.startDate = this.route.snapshot.queryParamMap.get("startDate");
          this.endDate = this.route.snapshot.queryParamMap.get("endDate");
          this.investment = this.route.snapshot.queryParamMap.get("investment");
          this.district = this.route.snapshot.queryParamMap.get("district"); // Using params observable

          this.route.queryParams.subscribe(function (params) {
            _this25.startDate = params["startDate"];
            _this25.endDate = params["endDate"];
            _this25.investment = params["investment"];
            _this25.district = params["district"];
          });
          console.log(this.startDate, this.endDate, this.investment, this.district);
          this.dateDuration = {
            startDate: this.startDate,
            endDate: this.endDate,
            investment: this.investment,
            district: this.district
          };
          console.log(this.dateDuration);
          this.login.getTableInfo(this.dateDuration).subscribe(function (res) {
            console.log(res, 'response');
            _this25.tableData = res;
            console.log(_this25.tableData, 'tabledata');
          });
        }
      }]);

      return RedirectDataComponent;
    }();

    RedirectDataComponent.ctorParameters = function () {
      return [{
        type: _app_services_admin_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }];
    };

    RedirectDataComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-redirect-data",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./redirect-data.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/redirect-data/redirect-data.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./redirect-data.component.scss */
      "./src/app/components/redirect-data/redirect-data.component.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_admin_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])], RedirectDataComponent);
    /***/
  },

  /***/
  "./src/app/components/user-profile/user-profile.component.ts":
  /*!*******************************************************************!*\
    !*** ./src/app/components/user-profile/user-profile.component.ts ***!
    \*******************************************************************/

  /*! exports provided: UserProfileComponent */

  /***/
  function srcAppComponentsUserProfileUserProfileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function () {
      return UserProfileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/authentication/auth.service */
    "./src/app/services/authentication/auth.service.ts");
    /* harmony import */


    var _user_profile_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./user-profile.service */
    "./src/app/components/user-profile/user-profile.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @app/services/toastr/toastr.service */
    "./src/app/services/toastr/toastr.service.ts");

    var UserProfileComponent = /*#__PURE__*/function () {
      function UserProfileComponent(authService, userProfileService, userProfileFB, toastr) {
        _classCallCheck(this, UserProfileComponent);

        this.authService = authService;
        this.userProfileService = userProfileService;
        this.userProfileFB = userProfileFB;
        this.toastr = toastr;
        this.isEdit = true;
        this.orgName = 'ORMAS';
        this.userProfileDetails = [];
        this.createProfileForm();
      }

      _createClass(UserProfileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.isEdit = true;
          this.getUserProfileDetails();
        }
      }, {
        key: "createProfileForm",
        value: function createProfileForm() {
          this.userProfileForm = this.userProfileFB.group({
            userName: '',
            emailId: '',
            mobileNo: '',
            gender: '',
            dob: ''
          });
        }
      }, {
        key: "getUserProfileDetails",
        value: function getUserProfileDetails() {
          var _this26 = this;

          this.userProfileService.getProfileDetails().subscribe(function (successResponse) {
            console.log(successResponse);
            _this26.userProfileDetails = successResponse[0];
            console.log(_this26.userProfileDetails);
          }, function (errorResponse) {});
        }
      }, {
        key: "toggleEdit",
        value: function toggleEdit() {
          this.isEdit = !this.isEdit;
        }
      }, {
        key: "goBackToPage",
        value: function goBackToPage() {
          this.authService.goBack();
        }
      }, {
        key: "submitUserDetails",
        value: function submitUserDetails(data) {
          var PROFILE_FD = new FormData();
          PROFILE_FD.append('displayName', data.userName);
          PROFILE_FD.append('mobileNo', data.mobileNo); // PROFILE_FD.append('gender', data.gender);

          PROFILE_FD.append('emailId', data.emailId);
          PROFILE_FD.append('userId', '');
          this.modifyUserProfileDetails(PROFILE_FD);
        }
      }, {
        key: "modifyUserProfileDetails",
        value: function modifyUserProfileDetails(data) {
          var _this27 = this;

          this.userProfileService.setProfileDetails(data).subscribe(function (successResponse) {
            console.log(successResponse);

            if (successResponse['status'] === 0) {
              _this27.toastr.successToastr(successResponse['statusDesc']);

              _this27.isEdit = true;

              _this27.getUserProfileDetails();
            } else {
              _this27.toastr.warningToastr(successResponse['statusDesc']);
            }
          }, function (errorResponse) {});
        }
      }]);

      return UserProfileComponent;
    }();

    UserProfileComponent.ctorParameters = function () {
      return [{
        type: _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: _user_profile_service__WEBPACK_IMPORTED_MODULE_3__["UserProfileService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_5__["ToastrClientService"]
      }];
    };

    UserProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-user-profile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./user-profile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/user-profile/user-profile.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
      providers: [_user_profile_service__WEBPACK_IMPORTED_MODULE_3__["UserProfileService"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _user_profile_service__WEBPACK_IMPORTED_MODULE_3__["UserProfileService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _app_services_toastr_toastr_service__WEBPACK_IMPORTED_MODULE_5__["ToastrClientService"]])], UserProfileComponent);
    /***/
  },

  /***/
  "./src/app/components/user-profile/user-profile.service.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/components/user-profile/user-profile.service.ts ***!
    \*****************************************************************/

  /*! exports provided: UserProfileService */

  /***/
  function srcAppComponentsUserProfileUserProfileServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserProfileService", function () {
      return UserProfileService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");

    var UserProfileService = /*#__PURE__*/function () {
      function UserProfileService(httpClient) {
        _classCallCheck(this, UserProfileService);

        this.httpClient = httpClient;
      }

      _createClass(UserProfileService, [{
        key: "getProfileDetails",
        value: function getProfileDetails() {
          return this.httpClient.getWithoutRGrp(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'sysadmin/getProfileView');
        }
      }, {
        key: "setProfileDetails",
        value: function setProfileDetails(data) {
          return this.httpClient.postFD(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'sysadmin/edituser', data);
        }
      }]);

      return UserProfileService;
    }();

    UserProfileService.ctorParameters = function () {
      return [{
        type: _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]
      }];
    };

    UserProfileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]])], UserProfileService);
    /***/
  },

  /***/
  "./src/app/guard/auth.guard.ts":
  /*!*************************************!*\
    !*** ./src/app/guard/auth.guard.ts ***!
    \*************************************/

  /*! exports provided: AuthGuard */

  /***/
  function srcAppGuardAuthGuardTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthGuard", function () {
      return AuthGuard;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/services/authentication/auth.service */
    "./src/app/services/authentication/auth.service.ts");
    /* harmony import */


    var _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @app/services/storage/storage.service */
    "./src/app/services/storage/storage.service.ts");
    /* harmony import */


    var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs/internal/observable/of */
    "./node_modules/rxjs/internal/observable/of.js");
    /* harmony import */


    var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__);

    var AuthGuard = /*#__PURE__*/function () {
      function AuthGuard(router, authService, appStorage) {
        _classCallCheck(this, AuthGuard);

        this.router = router;
        this.authService = authService;
        this.appStorage = appStorage;
      } // THIS USED TO CHECK IF PARENT IS VALID TO VIEW OR NOT


      _createClass(AuthGuard, [{
        key: "canActivate",
        value: function canActivate(currentRoute, state) {
          var _this28 = this;

          console.log('--------CanActive--------');
          this.authService.isSessionAvail().subscribe(function (successResponse) {
            if (successResponse === true) {
              return true;
            }

            _this28.router.navigateByUrl('/login');

            return false;
          }, function (errorResponse) {
            return false;
          });
          return Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__["of"])(false);
        } // THIS USED TO CHECK EVERY CHILD IS VALID TO VIEW OR NOT

      }, {
        key: "canActivateChild",
        value: function canActivateChild(currentRoute, state) {
          console.log('--------Authentication Guard--------'); // console.log(localStorage.getItem('access_token'));
          // console.log(currentRoute, state);

          if (sessionStorage.getItem('access_token') !== null) {
            return Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__["of"])(true);
          } else {
            // this.router.navigateByUrl('/login');
            return Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__["of"])(false); // this.router.navigateByUrl('/login');
          }
          /* this.authService.isSessionAvail().subscribe(successResponse => {
              console.log('Is session available', successResponse);
              if (successResponse === true) {
                  console.log('Yes available');
                  return true;
              }
              this.router.navigateByUrl('/login');
              console.log('No not available');
              return false;
          }, errorResponse => {
              console.log('No not available');
              return false;
          }); */
          // this.isAllowedToAccess(state)

        }
      }]);

      return AuthGuard;
    }();

    AuthGuard.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"]
      }];
    };

    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_services_authentication_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"]])], AuthGuard);
    /***/
  },

  /***/
  "./src/app/menu/menu-model.ts":
  /*!************************************!*\
    !*** ./src/app/menu/menu-model.ts ***!
    \************************************/

  /*! exports provided: MenuModel */

  /***/
  function srcAppMenuMenuModelTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MenuModel", function () {
      return MenuModel;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var MenuModel = function MenuModel(menuId, parentMenuId, resId, resGrId, menuOrder, subMenuOrder, title, iconType, icon, routerLink, lookUpMenuName, isSubMenu, isExtraMenu, isItLookUp, isItInTopNav, isReadPerAvail, isWritePerAvail) {
      _classCallCheck(this, MenuModel);

      this.menuId = menuId;
      this.parentMenuId = parentMenuId;
      this.resId = resId;
      this.resGrId = resGrId;
      this.menuOrder = menuOrder;
      this.subMenuOrder = subMenuOrder;
      this.title = title;
      this.iconType = iconType;
      this.icon = icon;
      this.routerLink = routerLink;
      this.lookUpMenuName = lookUpMenuName;
      this.isSubMenu = isSubMenu;
      this.isExtraMenu = isExtraMenu;
      this.isItLookUp = isItLookUp;
      this.isItInTopNav = isItInTopNav;
      this.isReadPerAvail = isReadPerAvail;
      this.isWritePerAvail = isWritePerAvail;
    };
    /***/

  },

  /***/
  "./src/app/menu/menu.data.ts":
  /*!***********************************!*\
    !*** ./src/app/menu/menu.data.ts ***!
    \***********************************/

  /*! exports provided: TEST_MENU, LOOKUP_MENU, ADMIN_MENU, APPROVER_MENU */

  /***/
  function srcAppMenuMenuDataTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TEST_MENU", function () {
      return TEST_MENU;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LOOKUP_MENU", function () {
      return LOOKUP_MENU;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ADMIN_MENU", function () {
      return ADMIN_MENU;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "APPROVER_MENU", function () {
      return APPROVER_MENU;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _menu_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./menu-model */
    "./src/app/menu/menu-model.ts");

    var TEST_MENU = [// new MenuModel(6, 0, 1006, 16, 6, 0, 'Configration', 'ICON', 'fa-bolt', 'javascript:void(0);', null, false, false, false, false, true, true),
    new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](40, 0, 1007, 17, 40, 0, 'Exhibition', 'ICON', 'assets/icon/exhibition.png', 'javascript:void(0);', null, false, false, false, false, true, true), // new MenuModel(8, 0, 1008, 18, 8, 0, 'Projects', 'ICON', 'fa-assistive-listening-systems', 'javascript:void(0);', null, false, false, false, false, true, true),
    // new MenuModel(41, 0, 1008, 19, 41, 0, 'Settings', 'ICON', 'assets/icon/setting.png', 'javascript:void(0);', null, false, false, false, false, true, true),
    new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](41, 0, 1008, 19, 41, 0, 'Report', 'ICON', 'assets/icon/report.png', 'javascript:void(0);', null, false, false, false, false, true, true), new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](41, 0, 1008, 19, 41, 0, 'Support', 'ICON', 'assets/icon/more.png', 'javascript:void(0);', null, false, false, false, false, true, true), // new MenuModel(10, 9, 1010, 10, 0, 1, 'menu item - 1', 'ICON', 'fa-assistive-listening-systems', 'javascript:void(0);', null, false, false, false, false, true, true),
    // new MenuModel(11, 9, 1011, 11, 0, 2, 'menu item - 2', 'ICON', 'fa-binoculars', 'javascript:void(0);', null, false, false, false, false, true, true),
    new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](101, 18, 1018, 26, 0, 8, 'Product', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/products', null, false, false, false, false, false, false), new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](102, 18, 1019, 26, 0, 9, 'Member', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/member', null, false, false, false, false, false, false), new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](103, 18, 1020, 26, 0, 10, 'PG', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/pg', null, false, false, false, false, false, false), new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](104, 18, 1021, 26, 0, 11, 'SHG', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/shg', null, false, false, false, false, false, false)];
    var LOOKUP_MENU = new _menu_model__WEBPACK_IMPORTED_MODULE_1__["MenuModel"](0, 0, 0, 0, 0, 0, 'Lookup', 'ICON', 'fa-user', '/pages/lookup', null, false, false, false, false, false, false);
    var ADMIN_MENU = [{
      id: 1,
      name: 'My View',
      isActive: false,
      hasSubMenu: false,
      subMenu: [],
      link: 'admin'
    }, {
      id: 2,
      name: 'Proposal',
      isActive: true,
      hasSubMenu: false,
      subMenu: [],
      link: 'admin/proposal'
    }, {
      id: 3,
      name: 'Setup',
      isActive: false,
      hasSubMenu: true,
      subMenu: [{
        name: 'State',
        link: 'admin/setup/state'
      }, {
        name: 'District',
        link: 'admin/setup/district'
      }, {
        name: 'Block',
        link: 'admin/setup/block'
      }, {
        name: 'Industry',
        link: 'admin/setup/industry'
      }, {
        name: 'Purpose',
        link: 'admin/setup/purpose'
      }, {
        name: 'Application For',
        link: 'admin/setup/application-for'
      }, {
        name: 'Operational Source',
        link: 'admin/setup/operational-source'
      }]
    }, {
      id: 4,
      name: 'Manage',
      isActive: false,
      hasSubMenu: true,
      subMenu: [{
        name: 'User',
        link: 'admin/manage/user'
      }, {
        name: 'Role',
        link: 'admin/manage/role'
      }, {
        name: 'Resource',
        link: 'admin/manage/resource'
      }]
    }, {
      id: 5,
      name: 'MIS',
      isActive: false,
      hasSubMenu: false,
      subMenu: []
    }];
    var APPROVER_MENU = [{
      id: 1,
      name: 'My View'
    }, {
      id: 2,
      name: 'Proposal',
      isActive: true,
      hasSubMenu: false,
      subMenu: [],
      link: 'approver/proposal'
    }, {
      id: 5,
      name: 'MIS'
    }];
    /***/
  },

  /***/
  "./src/app/modules/common-form/common-form.service.ts":
  /*!************************************************************!*\
    !*** ./src/app/modules/common-form/common-form.service.ts ***!
    \************************************************************/

  /*! exports provided: CommonFormService */

  /***/
  function srcAppModulesCommonFormCommonFormServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CommonFormService", function () {
      return CommonFormService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");

    var CommonFormService = /*#__PURE__*/function () {
      function CommonFormService(httpClient, http) {
        _classCallCheck(this, CommonFormService);

        this.httpClient = httpClient;
        this.http = http;
      }

      _createClass(CommonFormService, [{
        key: "submitFormDetails",
        value: function submitFormDetails(data) {
          // console.log('inside service',data);
          return this.httpClient.postFD(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/formSubmit', data);
        }
      }, {
        key: "updateFormDetails",
        value: function updateFormDetails(data) {
          // console.log('inside service',data);
          return this.httpClient.postFD(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/formEdit', data);
        }
      }, {
        key: "postPaymentData",
        value: function postPaymentData(data) {
          console.log(data, 'post payment data'); // return this.httpClient.post('http://localhost:3002/dowr/api/setBankPaymentDetails',data);

          return this.httpClient.post('https://waterallocation.odisha.gov.in/dowr/api/setBankPaymentDetails', data); //  return this.http.post('https://industrialwaterod.nic.in/Est_Pay/JForm_Trs_Transaction', data, {responseType: 'text'});
        }
      }, {
        key: "sendPaymentResponseData",
        value: function sendPaymentResponseData(data) {
          console.log(data, 'payment data');
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/sendTreasuryData', data); //  return this.http.post('https://industrialwaterod.nic.in/Est_Pay/JForm_Trs_Transaction', data, {responseType: 'text'});
        }
      }, {
        key: "updateFormStatus",
        value: function updateFormStatus(id) {
          // console.log('inside service',data);
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/changeApplicationStatus/' + id + '?type=new');
        }
      }, {
        key: "getAllApplicationData",
        value: function getAllApplicationData(type) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getApplicationData?type=' + type);
        }
      }, {
        key: "getAllIndusrtyDetails",
        value: function getAllIndusrtyDetails() {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getAllIndustriesDetails');
        }
      }, {
        key: "getBlockByDistId",
        value: function getBlockByDistId(id) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getAllBlocksByDistrict/' + id);
        }
      }, {
        key: "getAllDamByRiverID",
        value: function getAllDamByRiverID(id) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getAllDamsByRiver/' + id);
        }
      }, {
        key: "getApplicationViewdata",
        value: function getApplicationViewdata(appId) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getApplicationDataById/' + appId);
        }
      }, {
        key: "getExistingApplicationdata",
        value: function getExistingApplicationdata(indId) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getApplicationDataById/' + indId + '?type=ind');
        }
      }, {
        key: "getApplicationPaymentDetails",
        value: function getApplicationPaymentDetails(appID) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'api/getPaymentDetailById/' + appID);
        }
      }]);

      return CommonFormService;
    }();

    CommonFormService.ctorParameters = function () {
      return [{
        type: _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]
      }, {
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]
      }];
    };

    CommonFormService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])], CommonFormService);
    /***/
  },

  /***/
  "./src/app/pages/modules/chatbot/chatbot.component.scss":
  /*!**************************************************************!*\
    !*** ./src/app/pages/modules/chatbot/chatbot.component.scss ***!
    \**************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesModulesChatbotChatbotComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".icon {\n  position: fixed;\n  z-index: 10;\n  width: 60px;\n  height: 60px;\n  right: 5rem;\n  bottom: 5rem;\n  background-color: #8a57cf;\n  color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  padding: 9px;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;\n  cursor: pointer;\n  display: block;\n  transform: translateY(0);\n}\n\n.chatbot {\n  position: fixed;\n  z-index: 10;\n  bottom: 4rem;\n  right: 5rem;\n}\n\n.icon:hover {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);\n  opacity: 1;\n}\n\n.chatbot {\n  width: 300px;\n}\n\n.chatbot .card {\n  height: 450px;\n}\n\n.chatbot .card-body {\n  display: block;\n  height: 352px;\n  overflow-y: scroll;\n}\n\n.chatbot .card-footer {\n  padding: 0 !important;\n}\n\n.chatbot .icon_close {\n  float: right;\n  cursor: pointer;\n}\n\n.chatbot .Input {\n  position: relative;\n  width: 100%;\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  color: #96aab4;\n  background-color: #fff;\n  border-top: 1px solid #e6ebea;\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n\n.chatbot .Input .Input-blank .Input_field {\n  max-height: 20px;\n  width: 100%;\n  resize: none;\n  border: none;\n  outline: none;\n  padding: 0;\n  padding-right: 0px;\n  padding-left: 0px;\n  padding-left: 20px;\n  padding-right: 75px;\n  background-color: transparent;\n  font-size: 16px;\n  line-height: 20px;\n  min-height: 20px !important;\n}\n\n.chatbot .Input_field {\n  height: 22px;\n  font-size: 12px;\n  max-height: 10%;\n  width: 100%;\n  resize: none;\n  border: none;\n  outline: none;\n  padding: 0;\n  padding-right: 0px;\n  padding-left: 0px;\n  padding-left: 20px;\n  padding-right: 75px;\n  background-color: transparent;\n  font-size: 16px;\n  line-height: 20px;\n  min-height: 20px !important;\n}\n\n.chatbot .Input_button-emoji {\n  right: 45px;\n}\n\n.chatbot .Input_button {\n  position: absolute;\n  bottom: 15px;\n  width: 25px;\n  height: 25px;\n  padding: 0;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  cursor: pointer;\n}\n\n.chatbot .Input_button-send {\n  right: 15px;\n}\n\n.chatbot .Input-emoji .Input_button-emoji .Icon,\n.chatbot #Smallchat .Input_button:hover .Icon {\n  transform: scale(1.1);\n  transition: all 0.1s ease-in-out;\n}\n\n.chatbot .Input-emoji .Input_button-emoji .Icon path,\n.chatbot #Smallchat .Input_button:hover .Icon path {\n  fill: #2c2c46;\n}\n\n.chatbot .messages {\n  padding-left: 0;\n  margin: 0;\n  list-style: none;\n  flex-grow: 1;\n  border-radius: 4px;\n  background: transparent;\n}\n\n.chatbot .messages .bot {\n  text-align: left;\n  padding: 6px;\n  background: aliceblue;\n  margin-bottom: 1rem;\n  border-radius: 10px;\n  margin-right: 15px;\n  display: block;\n}\n\n.chatbot .messages .user {\n  text-align: right;\n  padding: 6px;\n  background: #daf6c2;\n  border-radius: 10px;\n  padding-right: 10px;\n  margin-bottom: 1rem;\n  margin-left: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbW9kdWxlcy9jaGF0Ym90L0M6XFx3YXRlcm5ld1xcV2F0ZXJBbGxvY2F0aW9uMjIwOFxcV2F0ZXJBbGxvY2F0aW9uMjIwOC9zcmNcXGFwcFxccGFnZXNcXG1vZHVsZXNcXGNoYXRib3RcXGNoYXRib3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL21vZHVsZXMvY2hhdGJvdC9jaGF0Ym90LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBTUksZUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx3RkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7QUNKSjs7QURPQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNKSjs7QURPQTtFQUNJLDBFQUFBO0VBQ0EsVUFBQTtBQ0pKOztBRE9BO0VBRUksWUFBQTtBQ0xKOztBRE1JO0VBQ0ksYUFBQTtBQ0pSOztBRE1JO0VBQ0ksY0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQ0pSOztBRE1JO0VBQ0kscUJBQUE7QUNKUjs7QURNSTtFQUNJLFlBQUE7RUFDQSxlQUFBO0FDSlI7O0FETUk7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFJQSxZQUFBO0VBR0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7QUNKUjs7QURNWTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsMkJBQUE7QUNKaEI7O0FEUUk7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNkJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwyQkFBQTtBQ05SOztBRFFJO0VBQ0ksV0FBQTtBQ05SOztBRFFJO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSw2QkFBQTtFQUNBLGVBQUE7QUNOUjs7QURRSTtFQUNJLFdBQUE7QUNOUjs7QURRSTs7RUFJSSxxQkFBQTtFQUVBLGdDQUFBO0FDTlI7O0FEUUk7O0VBRUksYUFBQTtBQ05SOztBRFFJO0VBR0ksZUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0FDUlI7O0FEU1E7RUFDSSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUNQWjs7QURTUTtFQUNJLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUNQWiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21vZHVsZXMvY2hhdGJvdC9jaGF0Ym90LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmljb24ge1xyXG4gICAgLy8gcGFkZGluZzogMTBweDtcclxuICAgIC8vIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XHJcbiAgICAvLyBjb2xvcjogd2hpdGVzbW9rZTtcclxuICAgIC8vIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIC8vIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHotaW5kZXg6IDEwO1xyXG4gICAgd2lkdGg6IDYwcHg7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICByaWdodDogNXJlbTtcclxuICAgIGJvdHRvbTogNXJlbTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4YTU3Y2Y7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDlweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgMnB4IDEwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpIWltcG9ydGFudDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG59XHJcblxyXG4uY2hhdGJvdCB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB6LWluZGV4OiAxMDtcclxuICAgIGJvdHRvbTogNHJlbTtcclxuICAgIHJpZ2h0OiA1cmVtO1xyXG59XHJcblxyXG4uaWNvbjpob3ZlciB7XHJcbiAgICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2IoMCAwIDAgLyAxOSUpLCAwIDZweCA2cHggcmdiKDAgMCAwIC8gMjMlKTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbn1cclxuXHJcbi5jaGF0Ym90IHtcclxuICAgIC8vIG1pbi1oZWlnaHQ6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgLmNhcmQge1xyXG4gICAgICAgIGhlaWdodDogNDUwcHg7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1ib2R5e1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGhlaWdodDogMzUycHg7XHJcbiAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgfVxyXG4gICAgLmNhcmQtZm9vdGVyIHtcclxuICAgICAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuaWNvbl9jbG9zZSB7XHJcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuICAgIC5JbnB1dCB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XHJcbiAgICAgICAgLXdlYmtpdC1mbGV4LWdyb3c6IDA7XHJcbiAgICAgICAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XHJcbiAgICAgICAgZmxleC1ncm93OiAwO1xyXG4gICAgICAgIC13ZWJraXQtZmxleC1zaHJpbms6IDA7XHJcbiAgICAgICAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XHJcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgY29sb3I6ICM5NmFhYjQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZWJlYTtcclxuICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIC5JbnB1dC1ibGFuayB7XHJcbiAgICAgICAgICAgIC5JbnB1dF9maWVsZCB7XHJcbiAgICAgICAgICAgICAgICBtYXgtaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICByZXNpemU6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDBweDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMHB4O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNzVweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgICAgICAgICBtaW4taGVpZ2h0OiAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAuSW5wdXRfZmllbGQge1xyXG4gICAgICAgIGhlaWdodDogMjJweDtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgbWF4LWhlaWdodDogMTAlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHJlc2l6ZTogbm9uZTtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDBweDtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogNzVweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgbWluLWhlaWdodDogMjBweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLklucHV0X2J1dHRvbi1lbW9qaSB7XHJcbiAgICAgICAgcmlnaHQ6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICAuSW5wdXRfYnV0dG9uIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgYm90dG9tOiAxNXB4O1xyXG4gICAgICAgIHdpZHRoOiAyNXB4O1xyXG4gICAgICAgIGhlaWdodDogMjVweDtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuICAgIC5JbnB1dF9idXR0b24tc2VuZCB7XHJcbiAgICAgICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuSW5wdXQtZW1vamkgLklucHV0X2J1dHRvbi1lbW9qaSAuSWNvbixcclxuICAgICNTbWFsbGNoYXQgLklucHV0X2J1dHRvbjpob3ZlciAuSWNvbiB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgLjFzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuMXMgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICAuSW5wdXQtZW1vamkgLklucHV0X2J1dHRvbi1lbW9qaSAuSWNvbiBwYXRoLFxyXG4gICAgI1NtYWxsY2hhdCAuSW5wdXRfYnV0dG9uOmhvdmVyIC5JY29uIHBhdGgge1xyXG4gICAgICAgIGZpbGw6ICMyYzJjNDY7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZXMge1xyXG4gICAgICAgIC8vIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgICAgICAvLyBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgICAgIGZsZXgtZ3JvdzogMTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgLmJvdCB7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogYWxpY2VibHVlO1xyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudXNlciB7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA2cHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNkYWY2YzI7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi5pY29uIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDtcbiAgd2lkdGg6IDYwcHg7XG4gIGhlaWdodDogNjBweDtcbiAgcmlnaHQ6IDVyZW07XG4gIGJvdHRvbTogNXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhhNTdjZjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA5cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgMnB4IDEwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpICFpbXBvcnRhbnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbn1cblxuLmNoYXRib3Qge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IDEwO1xuICBib3R0b206IDRyZW07XG4gIHJpZ2h0OiA1cmVtO1xufVxuXG4uaWNvbjpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xOSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpO1xuICBvcGFjaXR5OiAxO1xufVxuXG4uY2hhdGJvdCB7XG4gIHdpZHRoOiAzMDBweDtcbn1cbi5jaGF0Ym90IC5jYXJkIHtcbiAgaGVpZ2h0OiA0NTBweDtcbn1cbi5jaGF0Ym90IC5jYXJkLWJvZHkge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAzNTJweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuLmNoYXRib3QgLmNhcmQtZm9vdGVyIHtcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xufVxuLmNoYXRib3QgLmljb25fY2xvc2Uge1xuICBmbG9hdDogcmlnaHQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jaGF0Ym90IC5JbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIC13ZWJraXQtYm94LWZsZXg6IDA7XG4gIC13ZWJraXQtZmxleC1ncm93OiAwO1xuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcbiAgZmxleC1ncm93OiAwO1xuICAtd2Via2l0LWZsZXgtc2hyaW5rOiAwO1xuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgY29sb3I6ICM5NmFhYjQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTZlYmVhO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbn1cbi5jaGF0Ym90IC5JbnB1dCAuSW5wdXQtYmxhbmsgLklucHV0X2ZpZWxkIHtcbiAgbWF4LWhlaWdodDogMjBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHJlc2l6ZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDc1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICBtaW4taGVpZ2h0OiAyMHB4ICFpbXBvcnRhbnQ7XG59XG4uY2hhdGJvdCAuSW5wdXRfZmllbGQge1xuICBoZWlnaHQ6IDIycHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbWF4LWhlaWdodDogMTAlO1xuICB3aWR0aDogMTAwJTtcbiAgcmVzaXplOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIHBhZGRpbmctcmlnaHQ6IDBweDtcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbiAgcGFkZGluZy1yaWdodDogNzVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIG1pbi1oZWlnaHQ6IDIwcHggIWltcG9ydGFudDtcbn1cbi5jaGF0Ym90IC5JbnB1dF9idXR0b24tZW1vamkge1xuICByaWdodDogNDVweDtcbn1cbi5jaGF0Ym90IC5JbnB1dF9idXR0b24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTVweDtcbiAgd2lkdGg6IDI1cHg7XG4gIGhlaWdodDogMjVweDtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNoYXRib3QgLklucHV0X2J1dHRvbi1zZW5kIHtcbiAgcmlnaHQ6IDE1cHg7XG59XG4uY2hhdGJvdCAuSW5wdXQtZW1vamkgLklucHV0X2J1dHRvbi1lbW9qaSAuSWNvbixcbi5jaGF0Ym90ICNTbWFsbGNoYXQgLklucHV0X2J1dHRvbjpob3ZlciAuSWNvbiB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMXMgZWFzZS1pbi1vdXQ7XG4gIHRyYW5zaXRpb246IGFsbCAwLjFzIGVhc2UtaW4tb3V0O1xufVxuLmNoYXRib3QgLklucHV0LWVtb2ppIC5JbnB1dF9idXR0b24tZW1vamkgLkljb24gcGF0aCxcbi5jaGF0Ym90ICNTbWFsbGNoYXQgLklucHV0X2J1dHRvbjpob3ZlciAuSWNvbiBwYXRoIHtcbiAgZmlsbDogIzJjMmM0Njtcbn1cbi5jaGF0Ym90IC5tZXNzYWdlcyB7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgbWFyZ2luOiAwO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBmbGV4LWdyb3c6IDE7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG4uY2hhdGJvdCAubWVzc2FnZXMgLmJvdCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDZweDtcbiAgYmFja2dyb3VuZDogYWxpY2VibHVlO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLmNoYXRib3QgLm1lc3NhZ2VzIC51c2VyIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBhZGRpbmc6IDZweDtcbiAgYmFja2dyb3VuZDogI2RhZjZjMjtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/pages/modules/chatbot/chatbot.component.ts":
  /*!************************************************************!*\
    !*** ./src/app/pages/modules/chatbot/chatbot.component.ts ***!
    \************************************************************/

  /*! exports provided: ChatbotComponent */

  /***/
  function srcAppPagesModulesChatbotChatbotComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChatbotComponent", function () {
      return ChatbotComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_chatbot_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/chatbot.service */
    "./src/app/services/chatbot.service.ts");

    var ChatbotComponent = /*#__PURE__*/function () {
      function ChatbotComponent(service) {
        _classCallCheck(this, ChatbotComponent);

        this.service = service;
        this.flag = false;
        this.data = [{
          text: 'Welcome dear',
          "class": 'bot'
        }];
      }

      _createClass(ChatbotComponent, [{
        key: "open",
        value: function open() {
          console.log('open');
          this.flag = true;
        }
      }, {
        key: "close",
        value: function close() {
          console.log('close');
          this.flag = false;
        }
      }, {
        key: "submit",
        value: function submit() {
          var _this29 = this;

          this.fake = "";
          this.id = Math.floor(Math.random() * 1000);
          var check = document.getElementById("field").value;
          console.log(check, this.id);
          this.data.push({
            text: check,
            "class": 'user'
          });
          this.service.sendChatBotMessage({
            id: 1,
            newMessage: check
          }).subscribe(function (res) {
            console.log(res);

            _this29.data.push({
              text: res.message,
              "class": 'bot'
            });
          });
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return ChatbotComponent;
    }();

    ChatbotComponent.ctorParameters = function () {
      return [{
        type: _app_services_chatbot_service__WEBPACK_IMPORTED_MODULE_2__["ChatbotService"]
      }];
    };

    ChatbotComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-chatbot',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./chatbot.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/modules/chatbot/chatbot.component.html"))["default"],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].Emulated,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./chatbot.component.scss */
      "./src/app/pages/modules/chatbot/chatbot.component.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_chatbot_service__WEBPACK_IMPORTED_MODULE_2__["ChatbotService"]])], ChatbotComponent);
    /***/
  },

  /***/
  "./src/app/pipes/date-now.pipe.ts":
  /*!****************************************!*\
    !*** ./src/app/pipes/date-now.pipe.ts ***!
    \****************************************/

  /*! exports provided: DateFormatPipe */

  /***/
  function srcAppPipesDateNowPipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DateFormatPipe", function () {
      return DateFormatPipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var DateFormatPipe = /*#__PURE__*/function () {
      function DateFormatPipe() {
        _classCallCheck(this, DateFormatPipe);
      }

      _createClass(DateFormatPipe, [{
        key: "transform",
        value: function transform(value) {
          if (!value) return ''; // Check if value is null or undefined

          var date = new Date(value);
          var day = date.getDate();
          var month = date.getMonth() + 1; // Months are zero-based

          var year = date.getFullYear(); // Ensure leading zeros for day and month if necessary

          var formattedDay = day < 10 ? "0".concat(day) : "".concat(day);
          var formattedMonth = month < 10 ? "0".concat(month) : "".concat(month);
          return "".concat(formattedDay, "-").concat(formattedMonth, "-").concat(year);
        }
      }]);

      return DateFormatPipe;
    }();

    DateFormatPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: 'dateFormat'
    })], DateFormatPipe);
    /***/
  },

  /***/
  "./src/app/pipes/maskid.pipe.ts":
  /*!**************************************!*\
    !*** ./src/app/pipes/maskid.pipe.ts ***!
    \**************************************/

  /*! exports provided: MaskIdPipe */

  /***/
  function srcAppPipesMaskidPipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MaskIdPipe", function () {
      return MaskIdPipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var MaskIdPipe = /*#__PURE__*/function () {
      function MaskIdPipe() {
        _classCallCheck(this, MaskIdPipe);
      }

      _createClass(MaskIdPipe, [{
        key: "transform",
        value: function transform(value) {
          if (!value) {
            return value.toString();
          }

          var idStr = value.toString();
          var stars = '****' + '*'.repeat(idStr.length - 1);
          return stars + idStr.slice(-1); // const stars = '****' + '*'.repeat(Math.max(1, idStr.length - 1));
          // return stars + idStr.slice(-1);
        }
      }]);

      return MaskIdPipe;
    }();

    MaskIdPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: 'maskId'
    })], MaskIdPipe);
    /***/
  },

  /***/
  "./src/app/pipes/search.pipe.ts":
  /*!**************************************!*\
    !*** ./src/app/pipes/search.pipe.ts ***!
    \**************************************/

  /*! exports provided: SearchPipe */

  /***/
  function srcAppPipesSearchPipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SearchPipe", function () {
      return SearchPipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var SearchPipe = /*#__PURE__*/function () {
      function SearchPipe() {
        _classCallCheck(this, SearchPipe);
      }

      _createClass(SearchPipe, [{
        key: "transform",
        value: function transform(value, args) {
          if (!value) return null;
          if (!args) return value; // args = args.toLowerCase();

          console.log(args, 'args');
          return value.filter(function (item) {
            return JSON.stringify(item.id).includes(args);
          });
        }
      }]);

      return SearchPipe;
    }();

    SearchPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: 'searchText'
    })], SearchPipe);
    /***/
  },

  /***/
  "./src/app/services/ErrorHandler/client-error-handler.service.ts":
  /*!***********************************************************************!*\
    !*** ./src/app/services/ErrorHandler/client-error-handler.service.ts ***!
    \***********************************************************************/

  /*! exports provided: ClientErrorHandlerService */

  /***/
  function srcAppServicesErrorHandlerClientErrorHandlerServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ClientErrorHandlerService", function () {
      return ClientErrorHandlerService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");

    var ClientErrorHandlerService = /*#__PURE__*/function () {
      function ClientErrorHandlerService() {
        _classCallCheck(this, ClientErrorHandlerService);
      }

      _createClass(ClientErrorHandlerService, [{
        key: "handleError",
        value: function handleError(error) {
          console.log('Something Went Wrong. Please Check Error As Following::');

          if (!navigator.onLine) {
            // Handle offline error
            console.error('Browser Offline!');
          } else {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
              // Server or connection error happened
              if (!navigator.onLine) {
                // Handle offline error
                console.error('Browser Offline!');
              } else if (error.status === 401) {
                // Handles Unauthorised error
                window.location.href = "/login";
              } else {
                // Handle Http Error (4xx, 5xx, ect.)
                console.log(error);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
              }
            } else {
              // Handle Client Error (Angular Error, ReferenceError...)
              console.log('Client Error!');
              console.error(error);
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
            } // Always log the error


            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
          }
        }
      }]);

      return ClientErrorHandlerService;
    }();

    ClientErrorHandlerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], ClientErrorHandlerService);
    /***/
  },

  /***/
  "./src/app/services/admin/login.service.ts":
  /*!*************************************************!*\
    !*** ./src/app/services/admin/login.service.ts ***!
    \*************************************************/

  /*! exports provided: LoginService */

  /***/
  function srcAppServicesAdminLoginServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginService", function () {
      return LoginService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");

    var LoginService = /*#__PURE__*/function () {
      // public BASE_URL = 'http://192.168.0.162:3002/dowr/api';
      // public accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE1NzQ2ODAzMDksImV4cCI6MTU3NDY4MzkwOX0.2X1GXerr32D_stAWtXWKlJOq7YqNLlSp_WtxT7UKago';
      function LoginService(httpClient) {
        _classCallCheck(this, LoginService);

        this.httpClient = httpClient;
      }

      _createClass(LoginService, [{
        key: "getLoginDetails",
        value: function getLoginDetails(data) {
          console.log(data, 'secure: true');
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/login', data, options);
        }
      }, {
        key: "cerateUser",
        value: function cerateUser(data) {
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/createUser', data, options);
        }
      }, {
        key: "sendOtp",
        value: function sendOtp(data) {
          console.log(data, 'data otp');
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/generateOtp', data, options);
        }
      }, {
        key: "verifyOtp",
        value: function verifyOtp(data) {
          console.log('otp', data);
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/verifyOtp', data);
        }
      }, {
        key: "reSendOtp",
        value: function reSendOtp(data) {
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/resendOtp', data);
        }
      }, {
        key: "changePassWithAuth",
        value: function changePassWithAuth(data) {
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/changePassword', data, options);
        }
      }, {
        key: "getCaptchaImage",
        value: function getCaptchaImage() {
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/captcha', {
            headers: HEADERS,
            responseType: 'text',
            withCredentials: true
          });
        }
      }, {
        key: "getApplicationSatus",
        value: function getApplicationSatus(data) {
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/users/applicationStatus', data, options);
        }
      }, {
        key: "getDashBoardDetails",
        value: function getDashBoardDetails() {
          // console.log('inside service',data);
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/serviceDashboardData');
        } // http://localhost:3002/dowr/api/testPaymentDetails

      }, {
        key: "getDistrictList",
        value: function getDistrictList() {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/getDistrictList');
        }
      }, {
        key: "landingDashboard",
        value: function landingDashboard(data) {
          console.log(data, 'data');
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/landingDashboard', data, options);
        }
      }, {
        key: "getTableInfo",
        value: function getTableInfo(data) {
          console.log(data, 'data');
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
          var options = {
            headers: HEADERS,
            withCredentials: true
          };
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/getTable', data, options);
        }
      }]);

      return LoginService;
    }();

    LoginService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }];
    };

    LoginService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])], LoginService);
    /***/
  },

  /***/
  "./src/app/services/authentication/auth.service.ts":
  /*!*********************************************************!*\
    !*** ./src/app/services/authentication/auth.service.ts ***!
    \*********************************************************/

  /*! exports provided: AuthService */

  /***/
  function srcAppServicesAuthenticationAuthServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthService", function () {
      return AuthService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");
    /* harmony import */


    var _storage_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../storage/storage.service */
    "./src/app/services/storage/storage.service.ts");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");
    /* harmony import */


    var _encryption_encryption_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../encryption/encryption.service */
    "./src/app/services/encryption/encryption.service.ts");
    /* harmony import */


    var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs/internal/observable/of */
    "./node_modules/rxjs/internal/observable/of.js");
    /* harmony import */


    var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _app_menu_menu_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @app/menu/menu.data */
    "./src/app/menu/menu.data.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");

    var AuthService = /*#__PURE__*/function () {
      function AuthService(httpClient, appStorage, encryptService, router, authService, location) {
        _classCallCheck(this, AuthService);

        this.httpClient = httpClient;
        this.appStorage = appStorage;
        this.encryptService = encryptService;
        this.router = router;
        this.authService = authService;
        this.location = location;
      }

      _createClass(AuthService, [{
        key: "isSessionAvail",
        value: function isSessionAvail() {
          if (this.appStorage.getSessionAttribute('isLoggedIn') === true) {
            console.log('--------- Checking After Login --------- ');
            _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].ACCESS_DETAILS = this.appStorage.getSessionAttribute('accessTokenDetails');
            return Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__["of"])(true);
          } else {
            return Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__["of"])(false);
          }
        }
      }, {
        key: "login",
        value: function login(uid, upass, salt) {
          var DATA = null;

          if (this.appStorage.getSessionAttribute('tokenSaltValue')) {
            DATA = JSON.parse(this.encryptService.encSaltedPassword(upass, _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].PASSWORD_ENCODING_TIMES, salt));
          }

          var data = {
            'grant_type': 'custom',
            'username': uid,
            'password': DATA
          };
          return this.httpClient.postAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'admin/logintoken', data);
        }
      }, {
        key: "logout",
        value: function logout() {
          this.removeStorageDetails();
          this.router.navigateByUrl('/login');
        }
      }, {
        key: "getAuthenticationToken",
        value: function getAuthenticationToken() {
          return this.httpClient.getAuthResponse(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'admin/logintoken');
        }
      }, {
        key: "goBack",
        value: function goBack() {
          this.location.back();
        }
        /* revokeAuthToken(data: object) {
            return this.httpClient.postAuth(AppConstants.BASE_API_URL + 'admin/refreshtoken', data).map(result => {
                // console.log('coming under success Response');
                this.appStorage.setSessionAttribute('accessTokenDetails', result);
                AppConstants.ACCESS_DETAILS = this.appStorage.getSessionAttribute('accessTokenDetails');
                this.sessionChecker.resetSession();
                this.sessionChecker.syncSession(AppConstants.ACCESS_DETAILS['expires_in']);
                return Observable.of<boolean>(true);
            }, errorRep => {
                // console.log('coming under Error Response');
                return Observable.of<boolean>(false);
            }).catch(errorResponse => {
                // console.log('coming under Error Response');
                return Observable.of<boolean>(false);
            });
        } */

      }, {
        key: "getAuthMenus",
        value: function getAuthMenus() {
          var _this30 = this;

          if (this.isSessionAvail()) {
            return this.httpClient.getNoAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'sysadmin/getUIResourceForUser').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (successResponse) {
              console.log(successResponse); // this.setModules(successResponse['moduleInfo'], successResponse['primaryModuleId']);

              return _this30.setMenusInFormat(successResponse['resourceInfo']);
            }));
          }
        }
      }, {
        key: "getAuthMenusModuleWise",
        value: function getAuthMenusModuleWise(data) {
          var _this31 = this;

          if (this.isSessionAvail()) {
            return this.httpClient.getRPNoAuth(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'sysadmin/getUIResourceofModule', {
              moduleId: data
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (successResponse) {
              console.log(successResponse); // this.setMenuType(data);

              return _this31.setMenusInFormat(successResponse['resourceInfo']);
            }));
          }
        }
      }, {
        key: "setMenusInFormat",
        value: function setMenusInFormat(menuResponse) {
          if (menuResponse.length !== 0) {
            var orgMenu = menuResponse.map(function (item) {
              var menu = {
                menuId: item.smId,
                parentMenuId: item.parentSmId !== null ? item.parentSmId : 0,
                isSubMenu: item.hasSubMenu,
                iconType: item.iconType !== null ? item.iconType : 'ICON',
                icon: item.iconType !== 'IMAGE' ? item.icon !== '' ? 'fa-' + item.icon : 'fa-user-circle-o' : item.icon,
                title: item.resourceName,
                routerLink: item.routerLink !== '' ? item.routerLink : null,
                resId: item.resourceId !== null ? item.resourceId : 0,
                menuOrder: item.parentSmId === null && item.smOrder !== null ? item.smOrder : 0,
                subMenuOrder: item.parentSmId !== null && item.resourceOrder !== null ? item.resourceOrder : 0,
                isExtraMenu: item.extraMenu,
                isItLookUp: false,
                lookUpMenuName: null,
                resGrId: item.rGId,
                isItInTopNav: false,
                isReadPerAvail: false,
                isWritePerAvail: false
              };
              return menu;
            });
            console.log(orgMenu);

            _app_menu_menu_data__WEBPACK_IMPORTED_MODULE_8__["TEST_MENU"].forEach(function (item) {
              orgMenu.push(item);
            });

            console.log('FInal Menu', orgMenu); // this.appStorage.setSessionAttribute('defaultLink', this.getDefaultUrlToRedirect(orgMenu));

            return orgMenu;
          } else {
            return [];
          }
        }
        /* private setModules(modules: ModuleAvail[], primeModuleId: number) {
            console.log(modules);
            if (modules.length !== 0) {
                this.appStorage.setSessionAttribute('modules', modules);
                this.appStorage.setSessionAttribute('currentModule', primeModuleId);
                this.setMenuType(primeModuleId);
                return true;
            } else {
                return false;
            }
        } */

        /* private setMenuType(moduleId: number) {
            const MODULES: ModuleAvail[] = this.appStorage.getSessionAttribute('modules');
            if (MODULES.length !== 0) {
                const PRES_MODULE = MODULES.find(ele => ele.moduleId === moduleId);
                if (typeof PRES_MODULE !== 'undefined') {
                    const MENU_TYPE: string = PRES_MODULE.menuType.toUpperCase().trim();
                    this.appStorage.setSessionAttribute('menuType', MENU_TYPE);
                    this.settings.theme.menuType = MENU_TYPE;
                }
            }
        } */

        /* private getDefaultUrlToRedirect(data: MenuModel[]) {
            const ORDERED_MAIN_MENU = data.filter(ele => ele.parentId === 0).sort((R1, R2) => {
                return R1.menuOrder - R2.menuOrder;
            });
            const F_MENU = ORDERED_MAIN_MENU[0];
            console.log('--------- Main Menu Details ---------');
            if (F_MENU.hasSubMenu) {
                const ORDERED_SUB_MENU = data.filter(ele => ele.parentId === F_MENU.id).sort((R1, R2) => {
                    return R1.subMenuOrder - R2.subMenuOrder;
                });
                const F_SUB_F_MENU = ORDERED_SUB_MENU[0];
                return F_SUB_F_MENU.routerLink;
            } else {
                return F_MENU.routerLink;
            }
        } */

        /* getMenusList() {
            const PATH = this.location.path();
            const TOTAL_MENUS: Menu[] = this.appStorage.getSessionAttribute('menus');
            const PARENT_ID = TOTAL_MENUS.find(ele => ele.routerLink === PATH).id;
            const SUB_MENU_LIST = TOTAL_MENUS.filter(ele => ele.parentId === PARENT_ID).sort((M1, M2) => {
                return M1.subMenuOrder - M2.subMenuOrder;
            });
            console.log('Sub Menus List: ', SUB_MENU_LIST);
            return SUB_MENU_LIST;
        } */

        /* public getAssignedSocietyDetails() {
            const PACS_TYPES: string[] = ['PACS', 'CREDIT' ];
            this.appStorage.setSessionAttribute('assignedInspTypes', PACS_TYPES);
        } */
        // IS USER ALLOWED TO GIVE FEED BACK

      }, {
        key: "isUserAllowedForFeedback",
        value: function isUserAllowedForFeedback() {
          return this.httpClient.getWithoutRGrp(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'sysadmin/isUserAllowedForFeedback');
        } // USED FOR SAVING FEEDBACK FORM

      }, {
        key: "sendFeedbackDetails",
        value: function sendFeedbackDetails(data) {
          return this.httpClient.postWithoutRGrp(_app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].BASE_API_URL + 'sysadmin/saveFeedbackDtls', data);
        }
        /* async logout() {
            if (environment.server === 'PRODUCTION') {
                if (AppConstants.ACCESS_DETAILS['access_token'] !== undefined) {
                    return await this.serverSessionOut(AppConstants.ACCESS_DETAILS['access_token']).toPromise();
                } else {
                    return true;
                }
            } else {
                this.removeStorageDetails();
                return true;
            }
        } */

      }, {
        key: "removeStorageDetails",
        value: function removeStorageDetails() {
          this.appStorage.removeSessionAttribute('isLoggedIn');
          this.appStorage.removeSessionAttribute('accessTokenDetails');
          this.appStorage.removeSessionAttribute('menus');
          this.appStorage.removeSessionAttribute('menuType');
          this.appStorage.removeSessionAttribute('modules');
          this.appStorage.removeSessionAttribute('currentModule');
          this.appStorage.removeSessionAttribute('defaultLink'); // Inspection Planning menus

          this.appStorage.removeSessionAttribute('planningMenus'); // DCP Search

          this.appStorage.removeSessionAttribute('searchData');
          this.appStorage.removeSessionAttribute('prevMenuPathForRd'); // Template Authentication

          this.appStorage.removeSessionAttribute('assignedSocietyDetails');
          this.appStorage.removeSessionAttribute('assignedInspTypes');
          this.appStorage.removeSessionAttribute('templateAllotedStatus');
          this.appStorage.removeSessionAttribute('currentSheetNo');
          this.appStorage.removeSessionAttribute('assignedPetitionerPetSlNo');
          this.appStorage.removeSessionAttribute('assignedPetitionerDetails');
          this.appStorage.removeSessionAttribute('role');
          this.appStorage.removeStorageDetails();
        }
      }]);

      return AuthService;
    }();

    AuthService.ctorParameters = function () {
      return [{
        type: _httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]
      }, {
        type: _storage_storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"]
      }, {
        type: _encryption_encryption_service__WEBPACK_IMPORTED_MODULE_5__["EncryptionService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]
      }, {
        type: AuthService
      }, {
        type: _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"]
      }];
    };

    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"], _storage_storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"], _encryption_encryption_service__WEBPACK_IMPORTED_MODULE_5__["EncryptionService"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"], AuthService, _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"]])], AuthService);
    /***/
  },

  /***/
  "./src/app/services/chatbot.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/services/chatbot.service.ts ***!
    \*********************************************/

  /*! exports provided: ChatbotService */

  /***/
  function srcAppServicesChatbotServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChatbotService", function () {
      return ChatbotService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");

    var ChatbotService = /*#__PURE__*/function () {
      function ChatbotService(httpClient) {
        _classCallCheck(this, ChatbotService);

        this.httpClient = httpClient;
      }

      _createClass(ChatbotService, [{
        key: "sendChatBotMessage",
        value: function sendChatBotMessage(msg) {
          return this.httpClient.post(_app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].BASE_API_URL + 'api/sendChatBotMessage', msg);
        }
      }]);

      return ChatbotService;
    }();

    ChatbotService.ctorParameters = function () {
      return [{
        type: _app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]
      }];
    };

    ChatbotService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]])], ChatbotService);
    /***/
  },

  /***/
  "./src/app/services/common/common.service.ts":
  /*!***************************************************!*\
    !*** ./src/app/services/common/common.service.ts ***!
    \***************************************************/

  /*! exports provided: CommonService */

  /***/
  function srcAppServicesCommonCommonServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CommonService", function () {
      return CommonService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");
    /* harmony import */


    var _httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../httpClient/http-client.service */
    "./src/app/services/httpClient/http-client.service.ts");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs/internal/observable/of */
    "./node_modules/rxjs/internal/observable/of.js");
    /* harmony import */


    var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */


    var _storage_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../storage/storage.service */
    "./src/app/services/storage/storage.service.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");

    var CommonService = /*#__PURE__*/function () {
      function CommonService(httpClient, appStorage, datePipe) {
        _classCallCheck(this, CommonService);

        this.httpClient = httpClient;
        this.appStorage = appStorage;
        this.datePipe = datePipe;
        this.params = null;
      }

      _createClass(CommonService, [{
        key: "getStoredDetails",
        value: function getStoredDetails() {
          console.log('GETTING', this.storedDetails);
          return this.storedDetails;
        }
      }, {
        key: "storeDetails",
        value: function storeDetails(data) {
          this.storedDetails = data;
          console.log(this.storedDetails);
        }
      }, {
        key: "getParams",
        value: function getParams() {
          return this.params;
        }
      }, {
        key: "setParams",
        value: function setParams(params) {
          this.params = params;
        }
      }, {
        key: "getImage",
        value: function getImage(imageType, imageId) {
          console.log('-------------inside  common service' + imageType + imageId);
          return this.httpClient.getBlobRP(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + 'sysadmin/imagedownload/' + imageType + '_' + imageId);
        }
      }, {
        key: "saveAndDownloadFile",
        value: function saveAndDownloadFile(fileData, fileName) {
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(fileData);
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, {
        key: "getPacsActivityImage",
        value: function getPacsActivityImage(fileName) {
          console.log('-------------inside  common service' + fileName);
          return this.httpClient.getBlobRP(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + 'pacs/downloadTemplate?fileName=' + fileName);
        }
      }, {
        key: "getStatusList",
        value: function getStatusList(statusFor) {
          return this.httpClient.getRP(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + 'sysadmin/getStatus', {
            'requestedBy': statusFor
          });
        }
      }, {
        key: "getCountryList",
        value: function getCountryList() {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + 'mdm/getCountry');
        }
      }, {
        key: "getFinyearList",
        value: function getFinyearList(limit) {
          return this.httpClient.get(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + 'sysadmin/getAllFisyrOnly').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            return response['response'].sort(function (F1, F2) {
              return F2.id - F1.id;
            }).slice(0, limit);
          }));
        }
      }, {
        key: "getMonthsListByFsYear",
        value: function getMonthsListByFsYear(finYr) {
          return this.httpClient.getRP(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + '/sysadmin/getMonthByFsYear', {
            'fsYear': finYr
          });
        }
      }, {
        key: "searchEntries",
        value: function searchEntries(url, term, data) {
          console.log(term);

          if (term.length !== 0) {
            return this.httpClient.postRP(_app_app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].BASE_API_URL + url, data, this.getParams()); // { 'searchBy': term }
          }
        }
      }, {
        key: "search",
        value: function search(terms, url, data) {
          var _this32 = this;

          console.log(terms);
          return terms.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(400), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (term) {
            return term ? _this32.searchEntries(url, term, data) : Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__["of"])([]);
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) {
            return Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_5__["of"])([]);
          }));
        } // Here Onwards new Coding Starts
        // USED TO GET LOOKUP MENUS

      }, {
        key: "getLookUpMenus",
        value: function getLookUpMenus() {
          var _this33 = this;

          var MENUS = this.appStorage.getSessionAttribute('menus');
          return MENUS.filter(function (menu) {
            return menu.lookUpMenuName === _this33.appStorage.getSessionAttribute('lookUpMenuId');
          });
        }
      }, {
        key: "transformDate",
        value: function transformDate(date) {
          console.log(date);
          return this.datePipe.transform(date, 'dd-MM-yyyy'); // whatever format you need.
        }
      }, {
        key: "getConfigResponse",
        value: function getConfigResponse() {
          // return this.httpClient.get('http://203.193.144.93:8080/waterResource/index.html#/payment-status', { observe: 'response' });
          // return this.httpClient.get('https://waterallocationod.nic.in/index.html#/payment-status', { observe: 'response' });
          return this.httpClient.get('https://waterallocation.odisha.gov.in/index.html#/payment-status', {
            observe: 'response'
          });
        }
      }, {
        key: "GettransactionDetails",
        value: function GettransactionDetails(data) {
          console.log(data, 'payment data');
          return this.httpClient.get('https://waterallocation.odisha.gov.in/dowr/api/GettransactionDetails/' + data);
        }
      }]);

      return CommonService;
    }();

    CommonService.ctorParameters = function () {
      return [{
        type: _httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_3__["HttpClientService"]
      }, {
        type: _storage_storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"]
      }, {
        type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]
      }];
    };

    CommonService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_httpClient_http_client_service__WEBPACK_IMPORTED_MODULE_3__["HttpClientService"], _storage_storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]])], CommonService);
    /***/
  },

  /***/
  "./src/app/services/encryption/encryption.service.ts":
  /*!***********************************************************!*\
    !*** ./src/app/services/encryption/encryption.service.ts ***!
    \***********************************************************/

  /*! exports provided: EncryptionService */

  /***/
  function srcAppServicesEncryptionEncryptionServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EncryptionService", function () {
      return EncryptionService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! crypto-js */
    "./node_modules/crypto-js/index.js");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");

    var EncryptionService = /*#__PURE__*/function () {
      function EncryptionService() {
        _classCallCheck(this, EncryptionService);
      }

      _createClass(EncryptionService, [{
        key: "encryptData",
        value: function encryptData(data, key) {
          try {
            return crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].encrypt(JSON.stringify(data), key).toString();
          } catch (error) {
            console.log(error);
          }
        }
      }, {
        key: "decryptData",
        value: function decryptData(data, key) {
          try {
            var bytes = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].decrypt(data, key);

            if (bytes.toString()) {
              return JSON.parse(bytes.toString(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8));
            }

            return data;
          } catch (error) {
            console.log(error);
          }
        }
      }, {
        key: "generateSalt",
        value: function generateSalt(saltLength) {
          try {
            return crypto_js__WEBPACK_IMPORTED_MODULE_2__["lib"].WordArray.random(Math.ceil(saltLength / 2)).toString(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].HEX).slice(0, saltLength);
          } catch (error) {
            console.log(error);
          }
        }
      }, {
        key: "sha512Hash",
        value: function sha512Hash(data) {
          try {
            return crypto_js__WEBPACK_IMPORTED_MODULE_2__["SHA512"](data).toString();
          } catch (error) {
            console.log(error);
          }
        }
      }, {
        key: "encodePassword",
        value: function encodePassword(data, noOfTimes) {
          var password = data;

          while (noOfTimes > 0) {
            // console.log('BEFORE ENCODING: ' + password);
            password = this.sha512Hash(password); // console.log('AFTER ENCODING: ' + password);

            noOfTimes--;
          }

          return password;
        }
      }, {
        key: "encodeSaltedPassword",
        value: function encodeSaltedPassword(data, noOfTimes) {
          var SALT = this.generateSalt(20);
          var PASSWORD = this.encodePassword(data, noOfTimes); // console.log('Generated Salt: ' + SALT);

          var RETURN_OBJ = {
            'password': this.sha512Hash(PASSWORD + '#' + SALT),
            'salt': SALT
          };
          return JSON.stringify(RETURN_OBJ);
        }
      }, {
        key: "encSaltedPassword",
        value: function encSaltedPassword(data, noOfTimes, salt) {
          // console.log('SALT: ', salt);
          var PASSWORD = this.encodePassword(data, noOfTimes);
          var ENC_PASS = this.sha512Hash(PASSWORD + '#' + salt); // console.log('ENCODED PASS: ', ENC_PASS);

          return JSON.stringify(ENC_PASS);
        }
      }, {
        key: "encodeKeyValue",
        value: function encodeKeyValue(data, keyValue) {
          var itemValue = data;
          var counter = _app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].ITEM_ENCODE_ITERATOR;

          while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.encryptData(data, keyValue); // console.log('AFTER ENCODING: ' + itemValue);

            counter--;
          }

          return itemValue;
        }
      }, {
        key: "encodeTotalSession",
        value: function encodeTotalSession(data) {
          var itemValue = data;
          var counter = _app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].DECODE_ITERATOR;

          while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.encryptData(data, _app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].DECODE_KEY); // console.log('AFTER ENCODING: ' + itemValue);

            counter--;
          }

          return itemValue;
        }
      }, {
        key: "decodeKeyValue",
        value: function decodeKeyValue(data, keyValue) {
          var itemValue = data;
          var counter = _app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].ITEM_ENCODE_ITERATOR;

          while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.decryptData(data, keyValue); // console.log('AFTER ENCODING: ' + itemValue);

            counter--;
          }

          return itemValue;
        }
      }, {
        key: "decodeTotalSession",
        value: function decodeTotalSession(data) {
          var itemValue = data;
          var counter = _app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].DECODE_ITERATOR;

          while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.decryptData(data, _app_app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].DECODE_KEY); // console.log('AFTER ENCODING: ' + itemValue);

            counter--;
          }

          return itemValue;
        }
      }]);

      return EncryptionService;
    }();

    EncryptionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], EncryptionService);
    /***/
  },

  /***/
  "./src/app/services/httpClient/http-client.service.ts":
  /*!************************************************************!*\
    !*** ./src/app/services/httpClient/http-client.service.ts ***!
    \************************************************************/

  /*! exports provided: HttpClientService */

  /***/
  function srcAppServicesHttpClientHttpClientServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HttpClientService", function () {
      return HttpClientService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _app_app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @app/app.constants */
    "./src/app/app.constants.ts");
    /* harmony import */


    var _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @app/services/storage/storage.service */
    "./src/app/services/storage/storage.service.ts");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _ErrorHandler_client_error_handler_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../ErrorHandler/client-error-handler.service */
    "./src/app/services/ErrorHandler/client-error-handler.service.ts");

    var HttpClientService = /*#__PURE__*/function () {
      function HttpClientService(http, appStorage, location, clientErrorHandler) {
        _classCallCheck(this, HttpClientService);

        this.http = http;
        this.appStorage = appStorage;
        this.location = location;
        this.clientErrorHandler = clientErrorHandler;
      } // USED FOR METHOD TYPE GET & CONTENT TYPE IS JSON


      _createClass(HttpClientService, [{
        key: "getWithoutRGrp",
        value: function getWithoutRGrp(url, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken);
          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          }; // console.log(options);

          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE POST & CONTENT TYPE IS JSON

      }, {
        key: "postWithoutRGrp",
        value: function postWithoutRGrp(url, data, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken);
          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };
          return this.http.post(url, data, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // FOR GET AUTHORIZATION

      }, {
        key: "getAuth",
        value: function getAuth(url, opt) {
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER);
          var options = opt ? opt : {
            headers: HEADERS
          };
          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // FOR GET AUTHORIZATION

      }, {
        key: "getAuthResponse",
        value: function getAuthResponse(url, opt) {
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded'); // .set('Origin', (window.location.href).split('#')[0].split('/')[2]);
          // .set('Authorization', AppConstants.AUTHORIZATION_HEADER);

          var options = opt ? opt : {
            headers: HEADERS,
            // observe: 'response',
            withCredentials: true
          };
          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // SEND AUTHORIZATION DETAILS TO GET ACCESS

      }, {
        key: "postAuth",
        value: function postAuth(url, data, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('x-auth', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block');
          var options = opt ? opt : {
            headers: HEADERS,
            withCredentials: true
          };
          return this.http.post(url, data, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // FOR AUTHENTICATION WITH OUT RGID

      }, {
        key: "getNoAuth",
        value: function getNoAuth(url, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken);
          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          }; // console.log(options);

          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // FOR AUTHENTICATION WITH OUT RGID

      }, {
        key: "getRPNoAuth",
        value: function getRPNoAuth(url, extraParams, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken);
          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };

          for (var _i = 0, _Object$keys = Object.keys(extraParams); _i < _Object$keys.length; _i++) {
            var param = _Object$keys[_i];
            options['params'][param] = extraParams[param];
          }

          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE GET & CONTENT TYPE IS JSON

      }, {
        key: "get",
        value: function get(url, opt) {
          // console.log('rGId', this.getRgId().toString());
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER; // console.log(accessToken);

          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('x-auth', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          }; // console.log(options);

          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE GET & CONTENT TYPE IS JSON

      }, {
        key: "getByCN",
        value: function getByCN(url, opt) {
          var data = this.appStorage.getSessionAttribute('assignedPetitionerDetails'); // console.log('data.caseNo+++', data.caseNo);

          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken).set('rGId', this.getRgId().toString()).set('caseno', data.caseNo);
          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };
          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE GET & CONTENT TYPE IS FORM DATA

      }, {
        key: "getFD",
        value: function getFD(url, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()["delete"]('X-Powered-By').set('Content-Type', 'application/json').set('x-auth', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'http://localhost:4200').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };
          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE GET & REQUEST PARAMETERS

      }, {
        key: "getRP",
        value: function getRP(url, extraParams, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };

          for (var _i2 = 0, _Object$keys2 = Object.keys(extraParams); _i2 < _Object$keys2.length; _i2++) {
            var param = _Object$keys2[_i2];
            options['params'][param] = extraParams[param];
          }

          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE POST & CONTENT TYPE IS JSON

      }, {
        key: "post",
        value: function post(url, data, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('x-auth', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };
          return this.http.post(url, data, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE POST & HEADER TYPE IS JSON

      }, {
        key: "postRH",
        value: function postRH(url, data, opt) {
          // const accessToken = AppConstants.AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]() // .set('Authorization', accessToken)
          .set('ackNo', data);
          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };
          return this.http.post(url, null, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE POST & CONTENT TYPE IS FORM DATA

      }, {
        key: "postFD",
        value: function postFD(url, data, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('x-auth', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          }; // console.log('data..................>>>>', data);

          return this.http.post(url, data, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE POST & REQUEST PARAMETER

      }, {
        key: "postRP",
        value: function postRP(url, data, extraParams, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json').set('Authorization', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            params: {}
          };

          for (var _i3 = 0, _Object$keys3 = Object.keys(extraParams); _i3 < _Object$keys3.length; _i3++) {
            var param = _Object$keys3[_i3];
            options['params'][param] = extraParams[param];
          }

          return this.http.post(url, data, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        } // USED FOR METHOD TYPE GET & RESPONSE TYPE IS BLOB

      }, {
        key: "getBlobRP",
        value: function getBlobRP(url, extraParams, opt) {
          var accessToken = _app_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].AUTHORIZATION_HEADER;
          var HEADERS = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Authorization', accessToken).set('Cache-Control', 'private, no-cache, no-store, must-revalidate').set('Pragma', 'no-cache').set('Expires', '-1').set('Access-Control-Allow-Credentials', 'true').set('Access-Control-Allow-Methods', 'GET, POST').set('Access-Control-Max-Age', '1800').set('X-Frame-Options', 'SAMEORIGIN').set('X-XSS-Protection', '1; mode=block'); // .set('rGId', this.getRgId().toString());

          var options = opt ? opt : {
            headers: HEADERS,
            // observe: 'response',
            params: {},
            responseType: 'blob'
          };

          if (extraParams !== undefined) {
            for (var _i4 = 0, _Object$keys4 = Object.keys(extraParams); _i4 < _Object$keys4.length; _i4++) {
              var param = _Object$keys4[_i4];
              options['params'][param] = extraParams[param];
            }
          }

          return this.http.get(url, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(this.clientErrorHandler.handleError));
        }
        /*  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
             // cloning original request and set/add new headers
             const authReq = req.clone({
                 headers: req.headers
                     .set('Access-Control-Allow-Origin', '*')
                     .set('Content-Type', 'application/json')
                     .set('Access-Control-Expose-Headers', '*')
                  req.headers,
                 params: req.params
         });
             return next.handle(authReq);
             } */

      }, {
        key: "getRgId",
        value: function getRgId() {
          if (this.appStorage.getSessionAttribute('isLoggedIn')) {
            var MENU = this.appStorage.getSessionAttribute('menus');
            var CURR_PATH_ARR = this.location.path().split('/');

            var _loop = function _loop() {
              var CURR_PATH = CURR_PATH_ARR.join('/');
              var INDEX = MENU.findIndex(function (ele) {
                return ele.routerLink === CURR_PATH;
              });

              if (INDEX !== -1) {
                return {
                  v: MENU[INDEX].resGrId
                };
              } else {
                CURR_PATH_ARR.pop();
              }
            };

            while (CURR_PATH_ARR.length > 1) {
              var _ret = _loop();

              if (typeof _ret === "object") return _ret.v;
            }

            return 0;
          } else {
            return 0;
          }
        }
      }]);

      return HttpClientService;
    }();

    HttpClientService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }, {
        type: _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"]
      }, {
        type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"]
      }, {
        type: _ErrorHandler_client_error_handler_service__WEBPACK_IMPORTED_MODULE_7__["ClientErrorHandlerService"]
      }];
    };

    HttpClientService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"], _ErrorHandler_client_error_handler_service__WEBPACK_IMPORTED_MODULE_7__["ClientErrorHandlerService"]])], HttpClientService);
    /***/
  },

  /***/
  "./src/app/services/httpClient/res-header.service.ts":
  /*!***********************************************************!*\
    !*** ./src/app/services/httpClient/res-header.service.ts ***!
    \***********************************************************/

  /*! exports provided: ResponseHeaderInterceptor */

  /***/
  function srcAppServicesHttpClientResHeaderServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ResponseHeaderInterceptor", function () {
      return ResponseHeaderInterceptor;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    var ResponseHeaderInterceptor = /*#__PURE__*/function () {
      function ResponseHeaderInterceptor() {
        _classCallCheck(this, ResponseHeaderInterceptor);
      }

      _createClass(ResponseHeaderInterceptor, [{
        key: "intercept",
        value: function intercept(req, next) {
          console.log("Responsecalled");
          return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
              console.log("HttpResponse"); // Create a new response object without the X-Powered-By header

              var modifiedResponse = event.clone({
                headers: event.headers["delete"]('X-Powered-By') // Remove the X-Powered-By header
                .set('Access-Control-Allow-Origin', 'http://localhost:4200') // Set Access-Control-Allow-Origin header

              });
              return modifiedResponse; // Return the modified response
            } else {
              console.log("HttpResponse1");
            }

            console.log(event);
            return event; // If not an HttpResponse, return the original event
          }));
        }
      }]);

      return ResponseHeaderInterceptor;
    }();

    ResponseHeaderInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], ResponseHeaderInterceptor);
    /***/
  },

  /***/
  "./src/app/services/session/session-checker.service.ts":
  /*!*************************************************************!*\
    !*** ./src/app/services/session/session-checker.service.ts ***!
    \*************************************************************/

  /*! exports provided: SessionCheckerService */

  /***/
  function srcAppServicesSessionSessionCheckerServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SessionCheckerService", function () {
      return SessionCheckerService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var SessionCheckerService = function SessionCheckerService() {
      _classCallCheck(this, SessionCheckerService);
    };

    SessionCheckerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], SessionCheckerService);
    /***/
  },

  /***/
  "./src/app/services/storage/storage.service.ts":
  /*!*****************************************************!*\
    !*** ./src/app/services/storage/storage.service.ts ***!
    \*****************************************************/

  /*! exports provided: StorageService */

  /***/
  function srcAppServicesStorageStorageServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StorageService", function () {
      return StorageService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_services_encryption_encryption_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @app/services/encryption/encryption.service */
    "./src/app/services/encryption/encryption.service.ts");

    var StorageService = /*#__PURE__*/function () {
      function StorageService(encryptService) {
        _classCallCheck(this, StorageService);

        this.encryptService = encryptService;
        this.AppStorage = {};
        this.checkIsAlreadyAvailable();
      }

      _createClass(StorageService, [{
        key: "setSessionStorage",
        value: function setSessionStorage(data) {
          sessionStorage.setItem('ANGULARSESSIONID', this.encryptService.encodeTotalSession(JSON.stringify(data)));
        }
      }, {
        key: "updateSessionStorage",
        value: function updateSessionStorage(data) {
          sessionStorage.removeItem('ANGULARSESSIONID');
          this.setSessionStorage(data);
        }
      }, {
        key: "getSessionStorageDetails",
        value: function getSessionStorageDetails() {
          this.checkIsAlreadyAvailable();
          this.AppStorage = JSON.parse(this.encryptService.decodeTotalSession(sessionStorage.getItem('ANGULARSESSIONID')));
        }
      }, {
        key: "checkIsAlreadyAvailable",
        value: function checkIsAlreadyAvailable() {
          if (sessionStorage.getItem('ANGULARSESSIONID')) {
            this.updateSessionStorage(JSON.parse(this.encryptService.decodeTotalSession(sessionStorage.getItem('ANGULARSESSIONID'))));
          } else {
            this.createNewSessionDetails();
          }
        }
      }, {
        key: "removeStorageDetails",
        value: function removeStorageDetails() {
          sessionStorage.removeItem('ANGULARSESSIONID');
        }
      }, {
        key: "createNewSessionDetails",
        value: function createNewSessionDetails() {
          var DATA = {
            'id': this.encryptService.generateSalt(20),
            'name': 'Storing Details Locally'
          };
          this.setSessionStorage(DATA);
        }
      }, {
        key: "getSessionId",
        value: function getSessionId() {
          this.getSessionStorageDetails();
          return String(this.AppStorage['id']);
        }
      }, {
        key: "setSessionAttribute",
        value: function setSessionAttribute(attrName, data) {
          this.getSessionStorageDetails();
          var DATA = {};
          DATA[attrName] = this.encryptService.encodeKeyValue(JSON.stringify(data), this.getSessionId());
          Object.assign(this.AppStorage, DATA);
          this.updateSessionStorage(this.AppStorage);
        }
      }, {
        key: "setDistMenu",
        value: function setDistMenu(data) {
          this.menuData = data.uid;
        }
      }, {
        key: "getDistMenu",
        value: function getDistMenu() {
          return this.menuData;
        }
      }, {
        key: "getSessionAttribute",
        value: function getSessionAttribute(attrName) {
          this.getSessionStorageDetails();

          if (this.AppStorage[attrName] !== undefined) {
            return JSON.parse(this.encryptService.decodeKeyValue(this.AppStorage[attrName], this.getSessionId()));
          } else {
            return null;
          }
        }
      }, {
        key: "removeSessionAttribute",
        value: function removeSessionAttribute(attrName) {
          this.getSessionStorageDetails();
          delete this.AppStorage[attrName];
          this.updateSessionStorage(this.AppStorage);
        }
      }]);

      return StorageService;
    }();

    StorageService.ctorParameters = function () {
      return [{
        type: _app_services_encryption_encryption_service__WEBPACK_IMPORTED_MODULE_2__["EncryptionService"]
      }];
    };

    StorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services_encryption_encryption_service__WEBPACK_IMPORTED_MODULE_2__["EncryptionService"]])], StorageService);
    /***/
  },

  /***/
  "./src/app/services/toastr/toastr.service.ts":
  /*!***************************************************!*\
    !*** ./src/app/services/toastr/toastr.service.ts ***!
    \***************************************************/

  /*! exports provided: ToastrClientService */

  /***/
  function srcAppServicesToastrToastrServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToastrClientService", function () {
      return ToastrClientService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");

    var ToastrClientService = /*#__PURE__*/function () {
      function ToastrClientService(toastr) {
        _classCallCheck(this, ToastrClientService);

        this.toastr = toastr;
      }

      _createClass(ToastrClientService, [{
        key: "successToastr",
        value: function successToastr(message) {
          this.toastr.success(message);
        }
      }, {
        key: "warningToastr",
        value: function warningToastr(message) {
          this.toastr.warning(message);
        }
      }, {
        key: "dangerToastr",
        value: function dangerToastr(message) {
          this.toastr.error(message);
        }
      }, {
        key: "infoToastr",
        value: function infoToastr(message) {
          this.toastr.info(message);
        }
      }]);

      return ToastrClientService;
    }();

    ToastrClientService.ctorParameters = function () {
      return [{
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]
      }];
    };

    ToastrClientService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]])], ToastrClientService);
    /***/
  },

  /***/
  "./src/app/services/utils/utils.service.ts":
  /*!*************************************************!*\
    !*** ./src/app/services/utils/utils.service.ts ***!
    \*************************************************/

  /*! exports provided: UtilsService */

  /***/
  function srcAppServicesUtilsUtilsServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UtilsService", function () {
      return UtilsService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");

    var UtilsService = /*#__PURE__*/function () {
      function UtilsService(location) {
        _classCallCheck(this, UtilsService);

        this.location = location;
      }

      _createClass(UtilsService, [{
        key: "goBack",
        value: function goBack() {
          this.location.back();
        }
      }, {
        key: "goCurrentLocPath",
        value: function goCurrentLocPath() {
          return this.location.path();
        } // USED TO GET UPLOADED FILE PATH

      }, {
        key: "getUploadedFileName",
        value: function getUploadedFileName(filePath) {
          if (typeof filePath !== 'undefined') {
            var FILE_ARY = filePath.split(/(\\|\/)/);
            return FILE_ARY[FILE_ARY.length - 1];
          } else {
            return '';
          }
        } // USED TO CHANGE VALUE TO IT'S DEFAULT OR ORIGINAL

      }, {
        key: "getAndSetValues",
        value: function getAndSetValues(type, data) {
          if (type === 101) {
            // Number
            return data !== undefined ? data !== null ? Number(data) !== 0 ? Number(data) : 0 : 0 : 0;
          } else if (type === 102) {
            // String
            return data !== undefined ? data !== null ? String(data) !== '' ? data : '' : '' : '';
          } else if (type === 103) {
            // Boolean
            return data !== undefined ? data !== null ? Boolean(data) : false : false;
          } else if (type === 104) {
            // Date
            return data !== undefined ? data !== null ? data !== '' ? this.dateFormat(data) : '' : '' : '';
          }
        } // USED TO SEND VALUE BY IT'S DEFAULT OR ORIGINAL

      }, {
        key: "checkAndSendValues",
        value: function checkAndSendValues(type, data) {
          if (type === 101) {
            // Number
            return data !== undefined ? data !== null ? data !== '' ? Number(data) !== 0 ? Number(data) : 0 : 0 : 0 : 0;
          } else if (type === 102) {
            // String
            return data !== undefined ? data !== null ? data !== '' ? String(data) : null : null : null;
          } else if (type === 103) {
            // Boolean
            return data !== undefined ? data !== null ? data !== '' ? data === 'YES' ? true : false : false : false : false;
          } else if (type === 104) {
            // Date
            return data !== undefined ? data !== null ? data !== '' ? this.dateParse(data) : null : null : null;
          }
        } // ONLY NUMBERS

      }, {
        key: "checkIsNumber",
        value: function checkIsNumber(event) {
          var y = Number(event.key);
          var x = event.which || event.keycode;

          if (x === 32) {
            return false;
          } else if (!isNaN(y)) {
            return true;
          } else {
            if (x === 8 || x >= 35 && x <= 40 || x === 46) {
              return true;
            } else {
              return false;
            }
          }
        } // ONLY DECIMAL VALUES ALLOWED

      }, {
        key: "checkIsDecimal",
        value: function checkIsDecimal(event) {
          var isShiftKey = event.shiftKey;
          var y = Number(event.key);
          var x = event.which || event.keycode;

          if (x === 32) {
            return false;
          } else if (!isNaN(y)) {
            return true;
          } else {
            if (x === 8 || x >= 35 && x <= 40 || x === 46 || x === 190 && !isShiftKey) {
              return true;
            } else {
              return false;
            }
          }
        } // used to get financial year according to months

      }, {
        key: "getCurrentFinancialYear",
        value: function getCurrentFinancialYear() {
          var date = new Date();
          var CURR_MONTH = date.getUTCMonth();

          if (CURR_MONTH > 2) {
            var CURR_YR = date.getUTCFullYear();
            var NEXT_YR = (date.getUTCFullYear() + 1).toString().substr(-2);
            return CURR_YR + '-' + NEXT_YR;
          } else {
            var _CURR_YR = date.getUTCFullYear().toString().substr(-2);

            var PRE_YR = date.getUTCFullYear() - 1;
            return PRE_YR + '-' + _CURR_YR;
          }
        }
      }, {
        key: "removeEmptyObjectsFromArray",
        value: function removeEmptyObjectsFromArray(data) {
          var NON_EMPTY_ARRAY = []; // console.log('sending data ', data);

          data.forEach(function (item) {
            var OBJECT_KEYS = Object.keys(item); // console.log('Object Keys ', OBJECT_KEYS);

            var valueCounter = 0;
            OBJECT_KEYS.forEach(function (Key) {
              if (item[Key] === null) {
                valueCounter++;
              } else if (item[Key] === 0) {
                valueCounter++;
              } else if (item[Key] === false) {
                valueCounter++;
              }
            }); // console.log('valuecounter ', valueCounter, OBJECT_KEYS.length);

            if (valueCounter !== OBJECT_KEYS.length) {
              NON_EMPTY_ARRAY.push(item);
            }
          });
          return NON_EMPTY_ARRAY;
        }
      }, {
        key: "isFilevalidForUpload",
        value: function isFilevalidForUpload(uFile, fileType, minFileSize, maxFileSize) {
          console.log(uFile, uFile.name, uFile.size, uFile.type);
          var isValid = false;
          var MIME_TYPE = uFile.type;
          var FILE_EXTENSION = uFile.name.toUpperCase().split('.'); // Double Extension

          console.log('Double Extension Check');

          if (FILE_EXTENSION.length !== 2) {
            return this.showFileUploadErrorMessage('Upload a Valid File', uFile.name);
          } // Extension


          console.log('Extension Check');

          switch (fileType) {
            case 20:
              // IMG
              if (FILE_EXTENSION[1] === 'JPEG' || FILE_EXTENSION[1] === 'JPG') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a Valid File', uFile.name);
              }

              break;

            case 30:
              // IMG || PDF
              if (FILE_EXTENSION[1] === 'JPEG' || FILE_EXTENSION[1] === 'JPG' || FILE_EXTENSION[1] === 'PDF') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a Valid File', uFile.name);
              }

              break;

            case 40:
              // XLSX
              if (FILE_EXTENSION[1] === 'XLSX' || FILE_EXTENSION[1] === 'XLS') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a Valid File', uFile.name);
              }

              break;

            case 50:
              // PDF
              if (FILE_EXTENSION[1] === 'PDF') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a Valid File', uFile.name);
              }

              break;

            case 60:
              // PDF,XLSX
              if (FILE_EXTENSION[1] === 'PDF' || FILE_EXTENSION[1] === 'DOCX' || FILE_EXTENSION[1] === 'DOC' || FILE_EXTENSION[1] === 'XLSX' || FILE_EXTENSION[1] === 'XLS') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a Valid File', uFile.name);
              }

              break;
          } // Size


          if (maxFileSize !== undefined) {
            console.log('Max file size Check');

            if (uFile.size < maxFileSize * 1000 * 1024) {
              isValid = true;
            } else {
              return this.showFileUploadErrorMessage('File must be less than ' + maxFileSize + 'mb', uFile.name);
            }
          }

          if (minFileSize !== undefined) {
            console.log('Min file size Check');

            if (uFile.size > minFileSize * 1024) {
              isValid = true;
            } else {
              return this.showFileUploadErrorMessage('File must be greater than ' + minFileSize + 'kb', uFile.name);
            }
          } // MIME type


          console.log('MIME type check');

          switch (fileType) {
            case 20:
              // IMG
              if (MIME_TYPE === 'image/jpeg' || MIME_TYPE === 'image/jpg') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a valid file', uFile.name);
              }

              break;

            case 30:
              // IMG || PDF
              if (MIME_TYPE === 'image/jpeg' || MIME_TYPE === 'image/jpg' || MIME_TYPE === 'application/pdf') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a valid file', uFile.name);
              }

              break;

            case 40:
              // XLSX
              if (MIME_TYPE === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || MIME_TYPE === 'application/vnd.ms-excel') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a valid file', uFile.name);
              }

              break;

            case 50:
              // PDF
              if (MIME_TYPE === 'application/pdf') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a valid file', uFile.name);
              }

              break;

            case 60:
              // PDF,XLSX
              if (MIME_TYPE === 'application/pdf' || MIME_TYPE === 'application/msword' || MIME_TYPE === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || MIME_TYPE === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || MIME_TYPE === 'application/vnd.ms-excel') {
                isValid = true;
              } else {
                return this.showFileUploadErrorMessage('Upload a valid file', uFile.name);
              }

              break;
          }

          return isValid;
        }
      }, {
        key: "showFileUploadErrorMessage",
        value: function showFileUploadErrorMessage(message, fileName) {
          console.log(fileName + ' file not valid');
          return false;
        }
      }, {
        key: "dateParse",
        value: function dateParse(data) {
          console.log(data, typeof data);
          var DATE = (data.getDate() < 9 ? '0' + data.getDate() : data.getDate()) + '-' + (data.getMonth() <= 8 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1) + '-' + data.getFullYear();
          return DATE;
        }
      }, {
        key: "dateFormat",
        value: function dateFormat(data) {
          var DATE_ARR = data.split('-');
          var DATE = new Date(DATE_ARR[1] + '/' + DATE_ARR[0] + '/' + DATE_ARR[2]);
          return DATE;
        }
      }]);

      return UtilsService;
    }();

    UtilsService.ctorParameters = function () {
      return [{
        type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]
      }];
    };

    UtilsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])], UtilsService);
    /***/
  },

  /***/
  "./src/app/validators/custom.validators.ts":
  /*!*************************************************!*\
    !*** ./src/app/validators/custom.validators.ts ***!
    \*************************************************/

  /*! exports provided: emailValidator, comboboxNumberValidator, ceNameValidator, comboboxValidator, comboboxStringValidator, numberValidator, codeValidator, pacsNameValidator, nameValidator, titleValidator, titleValidator2, userIdValidator, addrValidator, licenseNoValidator, dateValidator, linkValidator, passwordValidator, matchingPasswords, resourceNameValidator, descValidator, urlValidator, roleNameValidator, mobileNumberValidator, panCardValidator, aadharCardValidator, bankAccNoValidator, gstinNoValidator, httpUrlValidator, nullValidator, numberComparator, emailPasswordValidator, pinNumberValidator */

  /***/
  function srcAppValidatorsCustomValidatorsTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "emailValidator", function () {
      return emailValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "comboboxNumberValidator", function () {
      return comboboxNumberValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ceNameValidator", function () {
      return ceNameValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "comboboxValidator", function () {
      return comboboxValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "comboboxStringValidator", function () {
      return comboboxStringValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "numberValidator", function () {
      return numberValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "codeValidator", function () {
      return codeValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "pacsNameValidator", function () {
      return pacsNameValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "nameValidator", function () {
      return nameValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "titleValidator", function () {
      return titleValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "titleValidator2", function () {
      return titleValidator2;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "userIdValidator", function () {
      return userIdValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "addrValidator", function () {
      return addrValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "licenseNoValidator", function () {
      return licenseNoValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "dateValidator", function () {
      return dateValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "linkValidator", function () {
      return linkValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "passwordValidator", function () {
      return passwordValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "matchingPasswords", function () {
      return matchingPasswords;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "resourceNameValidator", function () {
      return resourceNameValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "descValidator", function () {
      return descValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "urlValidator", function () {
      return urlValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "roleNameValidator", function () {
      return roleNameValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "mobileNumberValidator", function () {
      return mobileNumberValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "panCardValidator", function () {
      return panCardValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "aadharCardValidator", function () {
      return aadharCardValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "bankAccNoValidator", function () {
      return bankAccNoValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "gstinNoValidator", function () {
      return gstinNoValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "httpUrlValidator", function () {
      return httpUrlValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "nullValidator", function () {
      return nullValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "numberComparator", function () {
      return numberComparator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "emailPasswordValidator", function () {
      return emailPasswordValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "pinNumberValidator", function () {
      return pinNumberValidator;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    function emailValidator(control) {
      var pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidEmail: true
        };
      }
    }

    function comboboxNumberValidator(control) {
      console.log('Validation:', control.value);

      if (control.value === 0) {
        return {
          invalidField: true
        };
      }
    }

    function ceNameValidator(control) {
      var pattern = /^[a-zA-Z0-9-_()\n@,/.$%&:' ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidCeName: true
        };
      }
    }

    function comboboxValidator(control) {
      var PATTERN = /^[A-Za-z-]*$/;
      var PATTERN1 = /^[0-9 -]*$/; // if (control.value === '') {
      //     return { invalidField: true };
      // }

      if (!PATTERN.test(control.value) && !PATTERN1.test(control.value)) {
        return {
          invalidField: true
        };
      }
    }

    function comboboxStringValidator(control) {
      // console.log(control.value);
      if (control.value === 'NA') {
        return {
          invalidField: true
        };
      }
    }

    function numberValidator(control) {
      var pattern = /^[0-9.]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidNumber: true
        };
      }
    }

    function codeValidator(control) {
      var pattern = /^[a-zA-Z]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidCode: true
        };
      }
    }

    function pacsNameValidator(control) {
      var pattern = /^[a-zA-Z ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidPacsName: true
        };
      }
    }

    function nameValidator(control) {
      var pattern = /^[a-zA-Z.\d-_() ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidName: true
        };
      }
    }

    function titleValidator(control) {
      var pattern = /^(?![0-9_\@-]*$)^([0-9a-zA-Z _\@-]*)$/; // ^[a-zA-Z0-9_\-@ ]*$

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidTitle: true
        };
      }
    }

    function titleValidator2(control) {
      var pattern = /^([0-9a-zA-Z _\@-]*)$/; // ^[a-zA-Z0-9_\-@ ]*$

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidTitle: true
        };
      }
    }

    function userIdValidator(control) {
      var pattern = /^[a-zA-Z0-9 ]{6,20}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidUserId: true
        };
      }
    }

    function addrValidator(control) {
      var pattern = /^[a-zA-Z0-9-_()\n@,/.$%&:' ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidAddr: true
        };
      }
    }

    function licenseNoValidator(control) {
      var pattern = /^[a-zA-Z0-9-_()\&:/ ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidLicense: true
        };
      }
    }

    function dateValidator(control) {
      var pattern = /^((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidDate: true
        };
      }
    }

    function linkValidator(control) {
      var pattern = /^[a-zA-Z0-9-_()&./' ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidLink: true
        };
      }
    }

    function passwordValidator(control) {
      var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!*])[A-Za-z\d$@$!*]{8,20}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidPassword: true
        };
      }
    }

    function matchingPasswords(passwordKey, passwordConfirmationKey) {
      return function (group) {
        var password = group.controls[passwordKey];
        var passwordConfirmation = group.controls[passwordConfirmationKey];

        if (passwordConfirmation.value !== '' && password.value !== passwordConfirmation.value) {
          return passwordConfirmation.setErrors({
            mismatchedPasswords: true
          });
        }
      };
    } // added by Amrita
    // Date : 3/08/2018


    function resourceNameValidator(control) {
      var pattern = /^[a-zA-Z0-9-_&/ ]{2,50}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidResourceName: true
        };
      }
    }

    function descValidator(control) {
      var pattern = /^[a-zA-Z0-9-_()\n@,/.$%&:' ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidDesc: true
        };
      }
    }

    function urlValidator(control) {
      var pattern = /^[a-zA-Z0-9-_()@.&/' ]*$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidUrl: true
        };
      }
    } // added by Prachi
    // Date : 3/08/2018


    function roleNameValidator(control) {
      var pattern = /^[a-zA-Z0-9- _& ]{2,50}$/; // const pattern = /^[a-zA-Z0-9-_]{6,20}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidRoleName: true
        };
      }
    } // added by Amrita on date: 27-08-2018  ^((\+)?(\d{2}[-]))?(\d{10}){1}?$


    function mobileNumberValidator(control) {
      var pattern = /^[6-9]{1}[0-9]{9}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidMobileNumber: true
        };
      }
    }

    function panCardValidator(control) {
      var pattern = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}?$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidPanNumber: true
        };
      }
    }

    function aadharCardValidator(control) {
      var pattern = /^((\+)?(\d{2}[-]))?(\d{12}){1}?$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidAadharNumber: true
        };
      }
    }

    function bankAccNoValidator(control) {
      var pattern = /^[0-9][0-9]{10,16}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidAccountNumber: true
        };
      }
    }

    function gstinNoValidator(control) {
      var pattern = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidGstinNumber: true
        };
      }
    }

    function httpUrlValidator(control) {
      var pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidUrl: true
        };
      }
    }

    function nullValidator(control) {
      var pattern = /^/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalid: true
        };
      }
    }

    function numberComparator(firstNum, secondNum) {
      return function (group) {
        var num1 = group.controls[firstNum];
        var num2 = group.controls[secondNum];

        if (Number(num1.value) > Number(num2.value)) {
          return num1.setErrors({
            isGreaterThan: true
          });
        } else {
          return null;
        }
      };
    }

    function emailPasswordValidator(control) {
      var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!*])[A-Za-z\d$@$!*]{0,20}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidPassword: true
        };
      }
    }

    function pinNumberValidator(control) {
      var pattern = /^[1-9][0-9]{5}$/;

      if (control.value && !pattern.test(control.value)) {
        return {
          invalidPinNumber: true
        };
      }
    } // export function dateCheckValidator(from_date: string, to_date: string): ValidatorFn {
    //     return (formGroup: AbstractControl): ValidationErrors | null => {
    //       const from_date = formGroup.get(from_date)?.value;
    //       const to_date = formGroup.get(to_date)?.value;
    //       if (from_date && to_date && new Date(to_date) <= new Date(from_date)) {
    //         return { dateInvalid: true }; // Error key for invalid date range
    //       }
    //       return null; // No error if valid
    //     };
    //   }

    /* export function unitValidator(unit: string, quant: string) {
        console.log(unit, quant);
        // if (this.isCalled) {
        return (group: FormGroup) => {
          const unitVal = group.controls[unit];
          console.log('this.phaseVal********', unitVal, this.phaseVal);
          if (Number(unitVal.parent.value.unit) >= Number(quant)) {
            console.log('quant', quant);
            console.log('(unitVal.parent.value >= quant', (unitVal.parent.value >= quant));
            return unitVal.setErrors({ invalid: true });
          }
        };
        // }
      } */

    /***/

  },

  /***/
  "./src/environments/environment.prod.ts":
  /*!**********************************************!*\
    !*** ./src/environments/environment.prod.ts ***!
    \**********************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentProdTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var environment = {
      name: 'production',
      production: true,
      versionCheck: true
    };
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js"); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      name: 'development',
      production: false,
      versionCheck: false
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./environments/environment.prod */
    "./src/environments/environment.prod.ts");

    if (_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! C:\waternew\WaterAllocation2208\WaterAllocation2208\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map