import { Component, OnInit } from '@angular/core';
import { Bill } from '../../modules/bill';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-mybills',
  templateUrl: './mybills.component.html',
  styleUrls: ['./mybills.component.scss']
})
export class MybillsComponent implements OnInit {


  // Search
  searchText: string = '';

  // Filter
  selectedStatus: string = 'All Bills';

  // Bills List
  bills: Bill[] = [];

  // Table Data
  filteredBills: Bill[] = [];

  constructor() { }

  ngOnInit(): void {

    this.loadBills();

  }

  loadBills() {

    this.bills = [

      {
        billNo: 'BILL-1001',
        equipment: 'Solar Panel',
        category: 'Renewable',
        month: 'July 2026',
        dueDate: '10 Aug 2026',
        amount: 2450,
        status: 'Paid'
      },

      {
        billNo: 'BILL-1002',
        equipment: 'Transformer',
        category: 'Industrial',
        month: 'July 2026',
        dueDate: '15 Aug 2026',
        amount: 5800,
        status: 'Pending'
      },

      {
        billNo: 'BILL-1003',
        equipment: 'Battery',
        category: 'Storage',
        month: 'July 2026',
        dueDate: '08 Aug 2026',
        amount: 3100,
        status: 'Overdue'
      },

      {
        billNo: 'BILL-1004',
        equipment: 'Motor',
        category: 'Industrial',
        month: 'July 2026',
        dueDate: '20 Aug 2026',
        amount: 4100,
        status: 'Paid'
      }

    ];

    this.filteredBills = [...this.bills];

  }

  filterBills() {

    this.filteredBills = this.bills.filter((bill) => {

      const search =
        bill.billNo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.equipment.toLowerCase().includes(this.searchText.toLowerCase());

      const status =
        this.selectedStatus === 'All Bills' ||
        bill.status === this.selectedStatus;

      return search && status;

    });

  }

  get totalBills() {

    return this.bills.length;

  }

  get paidBills() {

    return this.bills.filter(x => x.status === 'Paid').length;

  }

  get pendingBills() {

    return this.bills.filter(x => x.status === 'Pending').length;

  }

  get overdueBills() {

    return this.bills.filter(x => x.status === 'Overdue').length;

  }

  // viewBill(bill: Bill) {

  //   console.log(bill);

  //   alert("Opening Bill : " + bill.billNo);

  // }

  selectedBill:any=null;

showBill(bill:any){

this.selectedBill=bill;

}

closeBill(){

this.selectedBill=null;

}
downloadBill() {

  if (!this.selectedBill) {
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Electricity Management System', 15, 20);

  doc.setFontSize(14);
  doc.text('Electricity Bill', 15, 35);

  autoTable(doc, {

    startY: 45,

    head: [['Field', 'Value']],

    body: [

      ['Bill Number', this.selectedBill.billNo],

      ['Equipment', this.selectedBill.equipment],

      ['Category', this.selectedBill.category],

      ['Billing Month', this.selectedBill.month],

      ['Due Date', this.selectedBill.dueDate],

      ['Status', this.selectedBill.status],

      ['Amount', `₹ ${this.selectedBill.amount}`]

    ]

  });

  doc.save(`${this.selectedBill.billNo}.pdf`);

}
}

