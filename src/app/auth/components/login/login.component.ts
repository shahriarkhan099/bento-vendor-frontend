import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isSpinning = false;
  id!: number
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.authService.loginVendor(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message.success('Login successful', { nzDuration: 5000 });
        this.id = res.token.id;
        StorageService.saveToken(res.token.token);
        StorageService.saveId(res.token.id);
        this.router.navigateByUrl(`/dashboard/${this.id}/profile`);
      },
      error: (err: any) => {
        console.log(err);
        this.message.error("Something went wrong", { nzDuration: 5000 });
      }
    });
  }


}
