import { Injectable } from '@angular/core';
import { EncryptionService } from '@app/services/encryption/encryption.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private AppStorage: object = {};
    public menuData: any;

    constructor(
        private encryptService: EncryptionService
    ) {
        this.checkIsAlreadyAvailable();
    }

    private setSessionStorage(data) {
        sessionStorage.setItem('ANGULARSESSIONID', this.encryptService.encodeTotalSession(JSON.stringify(data)));
    }

    private updateSessionStorage(data) {
        sessionStorage.removeItem('ANGULARSESSIONID');
        this.setSessionStorage(data);
    }

    private getSessionStorageDetails() {
        this.checkIsAlreadyAvailable();
        this.AppStorage = JSON.parse(this.encryptService.decodeTotalSession(sessionStorage.getItem('ANGULARSESSIONID')));
    }

    private checkIsAlreadyAvailable() {
        if (sessionStorage.getItem('ANGULARSESSIONID')) {
            this.updateSessionStorage(JSON.parse(this.encryptService.decodeTotalSession(sessionStorage.getItem('ANGULARSESSIONID'))));
        } else {
            this.createNewSessionDetails();
        }
    }

    public removeStorageDetails() {
        sessionStorage.removeItem('ANGULARSESSIONID');
    }

    private createNewSessionDetails() {
        const DATA = {
            'id': this.encryptService.generateSalt(20),
            'name': 'Storing Details Locally'
        };
        this.setSessionStorage(DATA);
    }

    private getSessionId() {
        this.getSessionStorageDetails();
        return String(this.AppStorage['id']);
    }

    setSessionAttribute(attrName: string, data: any) {
        this.getSessionStorageDetails();
        const DATA = {}; DATA[attrName] = this.encryptService.encodeKeyValue(JSON.stringify(data), this.getSessionId());
        Object.assign(this.AppStorage, DATA);
        this.updateSessionStorage(this.AppStorage);
    }
    public setDistMenu(data: any){
        this.menuData = data.uid;
    }
    public getDistMenu(){
        return this.menuData;
    }

    getSessionAttribute(attrName: string) {
        this.getSessionStorageDetails();
        if (this.AppStorage[attrName] !== undefined) {
            return JSON.parse(this.encryptService.decodeKeyValue(this.AppStorage[attrName], this.getSessionId()));
        } else {
            return null;
        }
    }

    removeSessionAttribute(attrName: string) {
        this.getSessionStorageDetails();
        delete this.AppStorage[attrName];
        this.updateSessionStorage(this.AppStorage);
    }
}
