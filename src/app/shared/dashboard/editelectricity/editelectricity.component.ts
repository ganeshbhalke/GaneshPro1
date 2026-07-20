import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IElectricity } from '../../modules/electricity';
import { ElectricityService } from '../../service/electricity.service';

@Component({
  selector: 'app-editelectricity',
  templateUrl: './editelectricity.component.html',
  styleUrls: ['./editelectricity.component.scss']
})
export class EditelectricityComponent implements OnInit {

  id!: string;

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

  constructor(

    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private electricityService: ElectricityService

  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.loadData();

  }

  loadData(): void {

    this.electricityService
      .getElectricityById(this.id)
      .subscribe({

        next: (res: any) => {

          this.electricityForm.patchValue({

            title: res.title,
            image: res.image,
            description: res.description,
            voltage: res.voltage,
            power: res.power,
            category: res.category,

            manufacturer: res.manufacturer,
            modelNumber: res.modelNumber,
            warranty: res.warranty,
            country: res.country,
            efficiency: res.efficiency,
            installationType: res.installationType,
            weight: res.weight

          });

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  update(): void {

    if (this.electricityForm.invalid) {
      return;
    }

    this.electricityService
      .updateElectricity(
        this.id,
        this.electricityForm.value as IElectricity
      )
      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',
            title: 'Updated Successfully!',
            text: 'Electricity record has been updated.',
            confirmButtonColor: '#198754',
            timer: 2000,
            showConfirmButton: false

          });

          setTimeout(() => {

            this.router.navigate(['/dashboard']);

          }, 2000);

        },

        error: () => {

          Swal.fire({

            icon: 'error',
            title: 'Update Failed!',
            text: 'Something went wrong.',
            confirmButtonColor: '#dc3545'

          });

        }

      });

  }

}