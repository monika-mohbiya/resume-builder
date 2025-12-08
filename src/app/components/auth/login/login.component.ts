import { Component, Inject, inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
// import { response } from 'express';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
declare const google: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatInputModule,
    MatIconModule,
    MatCardContent,
    // MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;
  hide = true;
  toastrService = inject(ToastrService);
  service = inject(MainService);
  router = inject(Router);

  constructor() { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)]),
      password: new FormControl('', [Validators.required]),
    });

  }
  submit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginUser(this.loginForm.value);
    } else {

    }
  }
  async loginUser(val: any) {
    try {
      const response = await this.service.login(val);
      console.log('Login successful:', response.token);
      // localStorage.setItem('Access Token:', response.token);
      localStorage.setItem('accessToken', response.accessToken);

      // if (response.token) {
      if (response.accessToken) {
        this.router.navigateByUrl('/dashboard');
        this.toastrService.success('Successfully Login', '', { timeOut: 5000 });

      } else {
        this.toastrService.error('Invalid credentials', '', { timeOut: 5000 });
      }

    } catch (error) {
      this.toastrService.error('Invalid credentials', '', { timeOut: 5000 });
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get Username() {
    return this.loginForm.get('username');
  }




}




