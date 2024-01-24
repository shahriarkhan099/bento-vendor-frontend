import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // private vendorApiUrl = 'http://localhost:5000'; // Local Api
  private vendorApiUrl = 'https://bento-vendor.onrender.com'; // Deployed Api

  constructor() { }

  getVendorApiUrl(): string {
    return this.vendorApiUrl;
  }

}
