import { Injectable } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable()
export class StateService {

    constructor(
        private httpClient: HttpClientService
    ) { }
    private storedData;
    public getStoredData(data){
      this.storedData = data;
    //   console.log('Inside Service get',this.storedData);
    }
    public setStoredData(){
    //   console.log('Inside Service set',this.storedData);
      return this.storedData;
    }
    getAllStateDetails(data:PaginationModel) {
        // console.log(data);
        return this.httpClient.post(AppConstants.BASE_API_URL+'api/getAllStates', data);
    }

    addStateDetails(data: Object) {
        return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createState', data);
    }

    editStateDetails(data: Object) {
        return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateState', data);
    }

    // searchStateEntries(term, data) {
    //     console.log(term);
    //     if (term.length !== 0) {
    //         return this.httpClient.postRP(AppConstants.BASE_API_URL + 'mdm/searchStateByStateName', data, { 'searchBy': term });
    //     }
    // }
    // searchState(terms: Observable<string>, data) {
    //     return terms.debounceTime(400)
    //         .distinctUntilChanged()
    //         .switchMap(term => term ? this.searchStateEntries(term, data) : Observable.of<any[]>([])
    //             .catch(error => {
    //                 console.log(error);
    //                 return Observable.of<any[]>([]);
    //             })
    //         );

    // }

}
