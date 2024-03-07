import { Component } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css'
})
export class VendorDashboardComponent {
  isCollapsed = false;
  id = StorageService.getId();

  constructor(private router: Router) {}

  logoutVendor () {
    localStorage.removeItem('accessToken');
    StorageService.logout();
    this.router.navigateByUrl('/logout');
    // window.location.href = 'https://getbento.vercel.app/logout';
  }
}
