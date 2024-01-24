import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = 'https://bento-vendor.onrender.com/v1';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  registerVendor(signupData: any) {
    return this.http.post(`${apiUrl}/vendor/register`, signupData);
  }

  loginVendor(loginData: any) {
    return this.http.post(`${apiUrl}/vendor/authenticate`, loginData);
  }
}
