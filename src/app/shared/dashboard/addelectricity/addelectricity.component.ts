import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ElectricityService } from '../../service/electricity.service';

@Component({
  selector: 'app-addelectricity',
  templateUrl: './addelectricity.component.html',
  styleUrls: ['./addelectricity.component.scss']
})
export class AddelectricityComponent {

  constructor(
    private fb: FormBuilder,
    private electricityService: ElectricityService
  ) {}

  electricityForm = this.fb.group({

    title: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    voltage: ['', Validators.required],
    power: ['', Validators.required],
    category: ['', Validators.required],

    manufacturer: [''],
    modelNumber: [''],
    warranty: [''],
    country: [''],
    efficiency: [''],
    installationType: [''],
    weight: ['']

  });

  onSubmit(): void {

    if (this.electricityForm.invalid) {

      this.electricityForm.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill all required fields.',
        confirmButtonColor: '#f59e0b'
      });

      return;
    }

    this.electricityService
      .addElectricity(this.electricityForm.value as any)
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Added Successfully 🎉',
            text: 'Electricity equipment has been added successfully.',
            confirmButtonColor: '#198754'
          });

          // Form Reset
          this.electricityForm.reset();

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#dc3545'
          });

        }

      });

  }

}