import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ApiService {

  private _url = "https://api.iextrading.com/1.0/stock/";

  constructor(private _http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

  getInfo(symbol) {
    return this._http.get(this._url + symbol +"/company")
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  getStock(symbol, time) {
    return this._http.get(this._url + symbol +"/chart/" + time)
      .do(data => console.log(data))
      .catch(this.handleError);
  }

}
