import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectricityService } from '../../service/electricity.service';
import { IElectricity } from '../../modules/electricity';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  electricity!: IElectricity;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private electricityService: ElectricityService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.id = params['id'];

      this.electricityService
        .getElectricityById(this.id)
        .subscribe({

          next: (res: any) => {

            this.electricity = {
              id: this.id,
              ...res
            };

          },

          error: (err) => {
            console.log(err);
          }

        });

    });

  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  edit() {
    this.router.navigate(['/edit', this.id]);
  }

}