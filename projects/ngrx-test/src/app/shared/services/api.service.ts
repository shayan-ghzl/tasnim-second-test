import { HttpClient, HttpContext, HttpContextToken, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IParamRegister, IParamUom, IQuery, IQueryUom, IResponseRegister, IResponseUom, Uom } from '../models/list';

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

  getList(query?: Partial<IQueryUom>): Observable<IResponseUom | false> {
    const context = new HttpContext().set(CACHE_OPTION, {
      cache: true
    });
    const url = environment.apiUrl + 'erp/inv/uom';
    const params = new HttpParams().appendAll(this.removeUndefinedProperties(query));

    return this.http.get<IResponseUom>(url, { params, context }).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  postListItem(param: IParamUom): Observable<Uom | false> {
    const url = environment.apiUrl + 'erp/inv/uom';

    return this.http.post<Uom>(url, param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  deleteListItem(id: number): Observable<Uom | false> {
    const url = environment.apiUrl + 'erp/inv/uom/' + id;

    return this.http.delete<Uom>(url).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  patchListItem(id: number, param: IParamUom): Observable<Uom | false> {
    const url = environment.apiUrl + 'erp/inv/uom/' + id;

    return this.http.patch<Uom>(url, param).pipe(
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
