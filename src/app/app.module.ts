import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {  CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Ng-Zorro-Antd modules
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { VendorDashboardComponent } from './vendor/components/vendor-dashboard/vendor-dashboard.component';
import { SidebarComponent } from './vendor/components/sidebar/sidebar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';

// For Form
import { NzFormModule } from 'ng-zorro-antd/form'; // For Form
import { NzInputModule } from 'ng-zorro-antd/input'; // For Form
import { NzUploadModule } from 'ng-zorro-antd/upload'; // For Form
import { NzModalModule } from 'ng-zorro-antd/modal'; // For Form

// For Drawer
import { NzDrawerModule } from 'ng-zorro-antd/drawer'; // For Drawer
import { NzSelectModule } from 'ng-zorro-antd/select'; // For Drawer
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'; // For Drawer

// For Popconfirm
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'; // For Popconfirm



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VendorDashboardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzMenuModule,
    NzTableModule,
    CommonModule,
    NzDrawerModule,
    NzSelectModule,
    NzDatePickerModule,
    NzUploadModule,
    NzModalModule,
    NzPopconfirmModule,
    NzPaginationModule,
    NzIconModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
