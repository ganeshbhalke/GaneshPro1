import { Component, OnInit } from '@angular/core';
import { Connection } from '../../modules/bill';

@Component({
  selector: 'app-my-conaction',
  templateUrl: './my-conaction.component.html',
  styleUrls: ['./my-conaction.component.scss']
})
export class MyConactionComponent implements OnInit {

  constructor() { }

   connection: Connection = {

    consumerName: 'Ganesh Bhalke',

    connectionNumber: 'CON1025487',

    meterNumber: 'MTR458796',

    connectionType: 'Residential',

    load: '5 kW',

    category: 'Domestic',

    status: 'Active',

    state: 'Maharashtra',

    city: 'Latur',

    area: 'Shivaji Nagar',

    pinCode: '413512',

    fullAddress:
      'Near Bus Stand, Shivaji Nagar, Latur, Maharashtra - 413512',

    connectionDate: '12 Jan 2025',

    lastBillDate: '01 Jul 2026',

    nextBillDate: '01 Aug 2026',

    meterReading: '3560 Units'

  };

  downloadCertificate() {

    alert('Connection Certificate Downloading...');

  }

  raiseComplaint() {

    alert('Complaint Page Opening...');

  }

  viewBills() {

    alert('Redirecting to My Bills...');

  }
  ngOnInit(): void {
  }

}
