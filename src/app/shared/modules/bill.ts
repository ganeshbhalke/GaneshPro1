

 export interface Bill {

  billNo: string;
  equipment: string;
  category: string;
  month: string;
  dueDate: string;
  amount: number;
  status: string;

}

export interface Transaction{
  transactionId: string;
  date: string;
  method: string;
  amount: number;
  status: string;
}

export interface PaymentHistory {

  id: number;
  transactionId: string;
  billNo: string;
  date: string;
  method: string;
  amount: number;
  status: string;

}


export interface Connection {

  consumerName: string;
  connectionNumber: string;
  meterNumber: string;
  connectionType: string;
  load: string;
  category: string;
  status: string;

  state: string;
  city: string;
  area: string;
  pinCode: string;
  fullAddress: string;

  connectionDate: string;
  lastBillDate: string;
  nextBillDate: string;
  meterReading: string;

}