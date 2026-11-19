import { Injectable } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { HttpClientService } from '../httpClient/http-client.service';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { StorageService } from '../storage/storage.service';
import { MenuModel } from '@app/menu/menu-model';
import { DatePipe, formatDate } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Config } from 'protractor';
import { DateFormatPipe } from '@app/pipes/date-format.pipe';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private storedDetails: any;
    private params: object = null;
    constructor(
        private httpClient: HttpClientService,
        private appStorage: StorageService,
        private datePipe: DatePipe
    ) { }

    public getStoredDetails() {
        console.log('GETTING', this.storedDetails);
        return this.storedDetails;
    }

    public storeDetails(data: any) {
        this.storedDetails = data;
        console.log(this.storedDetails);
    }

    private getParams() {
        return this.params;
    }

    public setParams(params: object) {
        this.params = params;
    }
    public getImage(imageType: string, imageId: string) {
        console.log('-------------inside  common service' + imageType + imageId);
        return this.httpClient.getBlobRP(AppConstants.BASE_API_URL + 'sysadmin/imagedownload/' + imageType + '_' + imageId);
    }
    public saveAndDownloadFile(fileData: Blob, fileName: string) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileData);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    public getPacsActivityImage(fileName: string) {
        console.log('-------------inside  common service' + fileName);
        return this.httpClient.getBlobRP(AppConstants.BASE_API_URL + 'pacs/downloadTemplate?fileName=' + fileName);
    }
    public getStatusList(statusFor: string) {
        return this.httpClient.getRP(AppConstants.BASE_API_URL + 'sysadmin/getStatus', { 'requestedBy': statusFor });
    }

    public getCountryList() {
        return this.httpClient.get(AppConstants.BASE_API_URL + 'mdm/getCountry');
    }

    public getFinyearList(limit: number) { // , finYrUpto?: number
        return this.httpClient.get(AppConstants.BASE_API_URL + 'sysadmin/getAllFisyrOnly').pipe(
            map(response => response['response'].sort((F1, F2) => F2.id - F1.id).slice(0, limit)));
    }
    public getMonthsListByFsYear(finYr: string) {
        return this.httpClient.getRP(AppConstants.BASE_API_URL + '/sysadmin/getMonthByFsYear', { 'fsYear': finYr });
    }

    public searchEntries(url: string, term, data?: any) {
        console.log(term);
        if (term.length !== 0) {
            return this.httpClient.postRP(AppConstants.BASE_API_URL + url, data, this.getParams()); // { 'searchBy': term }
        }
    }

    public search(terms: Observable<string>, url: string, data?: any) {
        console.log(terms);
        return terms.pipe(debounceTime(400), distinctUntilChanged(),
            switchMap(term => term ? this.searchEntries(url, term, data) : of([])),
            catchError(error => of([]))
        );
    }

    // Here Onwards new Coding Starts

    // USED TO GET LOOKUP MENUS
    public getLookUpMenus() {
        const MENUS: MenuModel[] = this.appStorage.getSessionAttribute('menus');
        return MENUS.filter(menu => menu.lookUpMenuName === this.appStorage.getSessionAttribute('lookUpMenuId'));
    }

    transformDate(date) {
        console.log(date);
        return this.datePipe.transform(date, 'dd-MM-yyyy'); // whatever format you need.
    }
    getConfigResponse(): Observable<HttpResponse<any>> {
        // return this.httpClient.get('http://203.193.144.93:8080/waterResource/index.html#/payment-status', { observe: 'response' });
        // return this.httpClient.get('https://waterallocationod.nic.in/index.html#/payment-status', { observe: 'response' });
        return this.httpClient.get('https://waterallocation.odisha.gov.in/index.html#/payment-status', { observe: 'response' });
    }

    public GettransactionDetails(data:any) {
        console.log(data,'payment data');
        // return this.httpClient.get('https://waterallocation.odisha.gov.in/dowr/api/GettransactionDetails/'+ data);
         return this.httpClient.get('http://localhost:3001/dowr/api/GettransactionDetails/'+ data);
      }
}
