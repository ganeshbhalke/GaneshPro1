import { Component, OnInit } from '@angular/core';
import { PaymentHistory } from '../../modules/bill';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor() { }

   // Summary Cards

  totalPayments = 25;
  successfulPayments = 23;
  pendingPayments = 1;
  totalPaid = 18450;


  searchText: string = '';


  selectedStatus: string = 'All Status';


  selectedDate: string = '';


  paymentHistory: PaymentHistory[] = [

    {
      id: 1,
      transactionId: 'TXN102541',
      billNo: 'BILL102',
      date: '2026-07-30',
      method: 'UPI',
      amount: 499,
      status: 'Success'
    },

    {
      id: 2,
      transactionId: 'TXN102542',
      billNo: 'BILL103',
      date: '2026-07-25',
      method: 'Credit Card',
      amount: 850,
      status: 'Success'
    },

    {
      id: 3,
      transactionId: 'TXN102543',
      billNo: 'BILL104',
      date: '2026-07-18',
      method: 'Net Banking',
      amount: 720,
      status: 'Pending'
    },
    {
      id: 4,
      transactionId: 'TXN109322',
      billNo: 'BILL105',
      date: '2026-07-19',
      method: 'UPI',
      amount: 5499,
      status: 'Pending'
    }


  ];

  filteredPayments: PaymentHistory[] = [...this.paymentHistory];


  searchPayments() {

    this.filteredPayments = this.paymentHistory.filter(payment => {

      const matchesSearch =
        payment.transactionId
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'All Status'
          ? true
          : payment.status === this.selectedStatus;

      const matchesDate =
        this.selectedDate === ''
          ? true
          : payment.date === this.selectedDate;

      return matchesSearch && matchesStatus && matchesDate;

    });

  }

  // View Receipt

  viewReceipt(payment: PaymentHistory) {

    alert(
      `Receipt\n\nTransaction : ${payment.transactionId}\nBill : ${payment.billNo}\nAmount : ₹${payment.amount}`
    );

  }

  // Download Receipt

  downloadReceipt(payment: PaymentHistory) {

    alert(
      `Downloading Receipt : ${payment.transactionId}`
    );

  }
  ngOnInit(): void {
  }

}
