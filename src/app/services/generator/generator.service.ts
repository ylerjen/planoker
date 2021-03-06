import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserGeneratorResponse } from '../../models/UserGeneratorResponse';
import { genUUID } from '../../helpers/Uuid';

const userGeneratorApi = 'https://randomuser.me/api/';

@Injectable()
export class GeneratorService {

  constructor(
    private _http: Http
  ) { }

  genUsername(): Observable<UserGeneratorResponse> {
    return this._http.get(userGeneratorApi)
      .map(resp => {
        const payload = resp.json();
        const userArr = payload.results as Array<UserGeneratorResponse>;
        return userArr[0];
      });
  }

  genSessionId(): string {
    return this.genUUID();
  }

  genUUID(): string {
    return genUUID();
  }
}
