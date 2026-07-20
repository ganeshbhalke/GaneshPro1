import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      mobile: [
  '',
  [
    Validators.required,
    Validators.pattern(/^\+91[0-9]{10}$/)
  ]
],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: ['', Validators.required]
    });

  }

  onRegister() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!'
      });

      return;
    }

   localStorage.setItem(
  'user',
  JSON.stringify(this.registerForm.value)
);

console.log('AFTER SAVE:', localStorage.getItem('user'));

alert('Saved');

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Please Login',
      timer: 2000,
      showConfirmButton: false
    });

    this.router.navigate(['/login']);
  }

}