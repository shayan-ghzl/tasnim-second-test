import { HttpClient, HttpContext, HttpContextToken, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IParamRegister, IQuery, IResponseRegister, IResponseTax, TaxQuery } from '../models/list';

export const CACHE_OPTION = new HttpContextToken<{ cache: boolean, expiresIn?: number; }>(() => ({ cache: false }));

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  register(param: IParamRegister) {
    const url = environment.apiUrl + 'auth/signup';

    return this.http.post<IResponseRegister>(url, param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  login(param: IParamRegister) {
    const url = environment.apiUrl + 'auth/signin';

    return this.http.post<IResponseRegister>(url, param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  getList(query?: Partial<TaxQuery>): Observable<IResponseTax | false> {
    const context = new HttpContext().set(CACHE_OPTION, {
      cache: true
    });
    const url = environment.apiUrl + 'erp/inv/Tax';
    const params = new HttpParams().appendAll(this.removeUndefinedProperties(query));

    return this.http.get<IResponseTax>(url, { params, context }).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  removeUndefinedProperties(obj?: Partial<IQuery>): IQuery {
    if (!obj) {
      return {};
    }
    const filteredObject: IQuery = Object.fromEntries(
      Object.entries(obj).filter(value => value !== undefined)
    ) as IQuery;

    return filteredObject;
  }

}
