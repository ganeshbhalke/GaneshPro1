import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  otp = '';

  showPassword = false;
  showOtpBox = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {

    this.loading = true;

    const email = this.email.trim().toLowerCase();

    const user = this.authService.login(email);

    if (!user) {

      this.loading = false;

      Swal.fire({
        icon: 'error',
        title: 'Email not registered'
      });

      return;
    }

    this.authService.sendOtp(email).subscribe({

      next: (res) => {

  console.log('SUCCESS =>', res);

  this.loading = false;

  this.showOtpBox = true;

  Swal.fire({
    icon: 'success',
    title: res.message
  });

},

     error: (err) => {

  console.log('FULL ERROR =>', err);
  console.log('STATUS =>', err.status);
  console.log('ERROR BODY =>', err.error);

  this.loading = false;

  Swal.fire({
    icon: 'error',
    title: err?.error?.message || err.message || 'OTP Send Failed'
  });

}

    });

  }

  verifyOtp() {

    this.authService.verifyOtp(this.email, this.otp).subscribe({

      next: (res) => {

        localStorage.setItem('isLoggedIn', 'true');

        Swal.fire({
          icon: 'success',
          title: res.message
        });

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: err.error.message || 'Invalid OTP'
        });

      }

    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}