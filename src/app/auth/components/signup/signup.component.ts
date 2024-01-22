import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  isSpinning = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator.bind(this)]], 
    });
  }

  confirmationValidator = (control: FormControl) => { 
    if (!control.value) {
      return { required: true };
    }
    else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  submitForm() {
    console.log(this.signupForm.value);
    this.authService.registerVendor(this.signupForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message.success('Signup successful', { nzDuration: 5000 });
        this.router.navigateByUrl("/login");
      },
      error: (err: any) => {
        console.log(err);
        this.message.error("Something went wrong", { nzDuration: 5000 });
      }
    });
  }

}
