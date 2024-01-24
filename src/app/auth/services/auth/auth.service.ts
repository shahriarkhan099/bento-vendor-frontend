import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../vendor/services/config/config.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getVendorApiUrl(): string {
    return this.configService.getVendorApiUrl();
  }

  registerVendor(signupData: any) {
    return this.http.post(`${this.getVendorApiUrl()}/v1/vendor/register`, signupData);
  }

  loginVendor(loginData: any) {
    return this.http.post(`${this.getVendorApiUrl()}/v1/vendor/authenticate`, loginData);
  }

}
