import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = 'http://localhost:5000/v1/vendor';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getVendorById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );;
  }

  updateVendorById(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

}
