import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { VendorDashboardComponent } from './vendor/components/vendor-dashboard/vendor-dashboard.component';
import { VendorProfileComponent } from './vendor/components/vendor-profile/vendor-profile.component';
import { SuppliableIngredientsComponent } from './vendor/components/suppliable-ingredients/suppliable-ingredients.component';
import { DeliveryBoxesComponent } from './vendor/components/delivery-boxes/delivery-boxes.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard/:id',
    component: VendorDashboardComponent,
    children: [
      { path: 'profile', component: VendorProfileComponent },
      {
        path: 'suppliable-ingredients',
        component: SuppliableIngredientsComponent,
      },
      {
        path: 'delivery-boxes',
        component: DeliveryBoxesComponent,
      },
    ],
  },
  // { path: 'dashboard/:id/profile', component: VendorProfileComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
