import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { endpoint, httpOptions } from '../../app.endpoints';
import { IUser, IEqt } from '../home.interface';

@Injectable()
export class BackendService {

  private url = endpoint;
  constructor(
    private _http: HttpClient
  ) { }

  getUsers() {
    return this._http.get<IUser[]>(this.url + "/api/users/", httpOptions);
  }

  getUser(id) {
    return this._http.get<IUser>(this.url + "/api/users/" + id, httpOptions);
  }

  getEqt(id) {
    return this._http.get<any[]>(this.url + "/api/users/" + id + "/eqt", httpOptions);
  }

  postEqt(id, _eqt) {
    return this._http.post<IEqt>(this.url + "/api/users/" + id + "/eqt", _eqt, httpOptions);
  }

  patchEqt(id, _eqt) {
    return this._http.patch<IEqt>(this.url + "/api/users/" + id + "/eqt", _eqt, httpOptions);
  }

}
