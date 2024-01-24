import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class VendorService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getVendorApiUrl(): string {
    return this.configService.getVendorApiUrl();
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getVendorById(id: number) {
    return this.http.get(`${this.getVendorApiUrl()}/v1/vendor/${id}`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );;
  }

  updateVendorById(id: number, data: any) {
    return this.http.put(`${this.getVendorApiUrl()}/v1/vendor/${id}`, data).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

}
