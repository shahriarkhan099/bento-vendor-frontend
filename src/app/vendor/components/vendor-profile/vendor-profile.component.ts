import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { VendorService } from '../../services/vendor/vendor.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.css',
})
export class VendorProfileComponent implements OnInit {
  isCollapsed = false;
  id = StorageService.getId();
  vendor: any;

  constructor(private vendorService: VendorService) {}

  ngOnInit() {
    this.getVendor();
  }

  getVendor() {
    const vendorId = StorageService.getId();
    this.vendorService.getVendorById(Number(vendorId)).subscribe((data: any) => {
      this.vendor = data.data;
      console.log(this.vendor);
    });
  }

  updateVendor() {
    const updatedData = {}; // Replace with actual updated data
    this.vendorService.updateVendorById(this.vendor.id, updatedData).subscribe(() => {
      this.getVendor();
    });
  }
}