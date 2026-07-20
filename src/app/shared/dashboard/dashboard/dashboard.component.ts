import { Component, OnInit } from '@angular/core';
import { ElectricityService } from '../../service/electricity.service';
import Swal from 'sweetalert2';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
total = 0;

solar = 0;
solarInverter = 0;
motor = 0;
transformer = 0;
battery = 0;
generator = 0;
circuitBreaker = 0;
switchGear = 0;
powerCable = 0;
electricalWire = 0;
distributionBoard = 0;

other=0;

// ================= BAR CHART =================

public barChartType: 'bar' = 'bar';
public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
};

public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [
    'Solar',
    'Motor',
    'Transformer',
    'Battery',
    'Generator',
    'Cable'
  ],
  datasets: [
    {
      label: 'Equipment',
      data: [0, 0, 0, 0, 0, 0]
    }
  ]
};


// ================= PIE CHART =================

public pieChartType: ChartType = 'pie';

public pieChartData: ChartConfiguration<'pie'>['data'] = {
  labels: [
    'Solar',
    'Motor',
    'Transformer',
    'Battery',
    'Others'
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0]
    }
  ]
};

  constructor(private electricityService: ElectricityService) {}

  ngOnInit(): void {
    this.getDashboardData();
    // this.uploadData();
  }


 

  getDashboardData(): void {

    this.electricityService.getElectricity().subscribe({

      next: (data: any) => {

        const list = Object.keys(data || {}).map(key => ({
          id: key,
          ...data[key]
        }));
this.total = list.length;

this.solar = list.filter(item => item.category === 'Solar Panel').length;

this.solarInverter = list.filter(item => item.category === 'Solar Inverter').length;

this.motor = list.filter(item => item.category === 'Electric Motor').length;

this.transformer = list.filter(item => item.category === 'Transformer').length;

this.battery = list.filter(item => item.category === 'Battery').length;

this.generator = list.filter(item => item.category === 'Generator').length;

this.circuitBreaker = list.filter(item => item.category === 'Circuit Breaker').length;

this.switchGear = list.filter(item => item.category === 'Switch Gear').length;

this.powerCable = list.filter(item => item.category === 'Power Cable').length;

this.electricalWire = list.filter(item => item.category === 'Electrical Wire').length;

this.distributionBoard = list.filter(item => item.category === 'Distribution Board').length;


this.other = list.filter(item => item.category === '').length;

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

}