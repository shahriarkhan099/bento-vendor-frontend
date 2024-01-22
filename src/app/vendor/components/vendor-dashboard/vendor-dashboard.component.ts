import { Component } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css'
})
export class VendorDashboardComponent {
  isCollapsed = false;
  id = StorageService.getId();
}
