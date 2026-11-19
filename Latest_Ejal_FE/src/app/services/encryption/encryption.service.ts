import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppConstants } from '@app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {
    private encryptData(data, key) {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
        } catch (error) {
            console.log(error);
        }
    }

    private decryptData(data, key) {
        try {
            const bytes = CryptoJS.AES.decrypt(data, key);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    public generateSalt(saltLength: number) {
        try {
            return CryptoJS.lib.WordArray.random(Math.ceil(saltLength / 2)).toString(CryptoJS.enc.HEX).slice(0, saltLength);
        } catch (error) {
            console.log(error);
        }

    }

    private sha512Hash(data) {
        try {
            return CryptoJS.SHA512(data).toString();
        } catch (error) {
            console.log(error);
        }
    }

    encodePassword(data: string, noOfTimes: number) {
        let password = data;
        while (noOfTimes > 0) {
            // console.log('BEFORE ENCODING: ' + password);
            password = this.sha512Hash(password);
            // console.log('AFTER ENCODING: ' + password);
            noOfTimes--;
        }
        return password;
    }

    private encodeSaltedPassword(data: string, noOfTimes: number) {
        const SALT = this.generateSalt(20);
        const PASSWORD = this.encodePassword(data, noOfTimes);
        // console.log('Generated Salt: ' + SALT);
        const RETURN_OBJ = {
            'password': this.sha512Hash(PASSWORD + '#' + SALT),
            'salt': SALT
        };
        return JSON.stringify(RETURN_OBJ);
    }

    encSaltedPassword(data: string, noOfTimes: number, salt: string) {
        // console.log('SALT: ', salt);
        const PASSWORD = this.encodePassword(data, noOfTimes);
        const ENC_PASS = this.sha512Hash(PASSWORD + '#' + salt);
        // console.log('ENCODED PASS: ', ENC_PASS);
        return JSON.stringify(ENC_PASS);
    }

    public encodeKeyValue(data: string, keyValue: string) {
        let itemValue = data; let counter = AppConstants.ITEM_ENCODE_ITERATOR;
        while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.encryptData(data, keyValue);
            // console.log('AFTER ENCODING: ' + itemValue);
            counter--;
        }
        return itemValue;
    }

    public encodeTotalSession(data: string) {
        let itemValue = data; let counter = AppConstants.DECODE_ITERATOR;
        while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.encryptData(data, AppConstants.DECODE_KEY);
            // console.log('AFTER ENCODING: ' + itemValue);
            counter--;
        }
        return itemValue;
    }

    public decodeKeyValue(data: string, keyValue: string) {
        let itemValue = data; let counter = AppConstants.ITEM_ENCODE_ITERATOR;
        while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.decryptData(data, keyValue);
            // console.log('AFTER ENCODING: ' + itemValue);
            counter--;
        }
        return itemValue;
    }

    public decodeTotalSession(data: string) {
        let itemValue = data; let counter = AppConstants.DECODE_ITERATOR;
        while (counter > 0) {
            // console.log('BEFORE ENCODING: ' + itemValue);
            itemValue = this.decryptData(data, AppConstants.DECODE_KEY);
            // console.log('AFTER ENCODING: ' + itemValue);
            counter--;
        }
        return itemValue;
    }
}
