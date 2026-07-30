import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../modules/bill';

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.scss']
})
export class MakepaymentComponent implements OnInit {

  constructor() { }

  


  // Bill Summary

  bill = {
    billNumber: 'BILL102',
    consumer: 'Ganesh Bhalke',
    meterNumber: 'EM1025487',
    billingMonth: 'July 2026',
    dueDate: '15 Aug 2026',
    status: 'Pending',
    amount: 2450
  };

  // Selected Payment Method

  paymentMethod = 'UPI';

  // Form Data

  upiId = '';

  card = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    holderName: ''
  };

  // Recent Payments

  transactions: Transaction[] = [
    {
      transactionId: 'TXN1001',
      date: '12 Jul 2026',
      method: 'UPI',
      amount: 2450,
      status: 'Success'
    },
    {
      transactionId: 'TXN1002',
      date: '15 Jun 2026',
      method: 'Credit Card',
      amount: 1950,
      status: 'Success'
    },
    {
      transactionId: 'TXN1003',
      date: '18 May 2026',
      method: 'Net Banking',
      amount: 2200,
      status: 'Success'
    }
  ];

  // Change Payment Method

  selectMethod(method: string) {
    this.paymentMethod = method;
  }

  // Pay Now

  payNow() {

    if (this.paymentMethod === 'UPI') {

      if (!this.upiId.trim()) {
        alert('Please Enter UPI ID');
        return;
      }

    }

    if (
      this.paymentMethod === 'Credit Card' ||
      this.paymentMethod === 'Debit Card'
    ) {

      if (
        !this.card.cardNumber ||
        !this.card.expiry ||
        !this.card.cvv ||
        !this.card.holderName
      ) {

        alert('Please Fill Card Details');
        return;

      }

    }

    alert('Payment Successful ✅');

    const newTransaction: Transaction = {

      transactionId: 'TXN' + Math.floor(Math.random() * 100000),

      date: new Date().toLocaleDateString(),

      method: this.paymentMethod,

      amount: this.bill.amount,

      status: 'Success'

    };

    this.transactions.unshift(newTransaction);

    this.bill.status = 'Paid';

    this.upiId = '';

    this.card = {
      cardNumber: '',
      expiry: '',
      cvv: '',
      holderName: ''
    };
    

  }
  showQRCode = false;

qrCodeImage =
  '/assets/images/UPI QR.jpeg';   // apna QR image yaha rakhna

  ngOnInit(): void {
  }

}
