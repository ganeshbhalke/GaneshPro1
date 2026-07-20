import { Component, OnInit } from '@angular/core';
import { ElectricityService } from '../../service/electricity.service';
import { IElectricity } from '../../modules/electricity';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.scss']
})
export class ElectricityComponent implements OnInit {

  loading = true;

  electricity: IElectricity[] = [];
  filteredElectricity: IElectricity[] = [];

  searchText = '';
  selectedCategory = 'All';

  categories: string[] = [];

  // Pagination
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 3;

  // Sorting
  sortOption = '';

  constructor(
    private electricityService: ElectricityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {

    this.loading = true;

    this.electricityService.getElectricity().subscribe({

      next: (data: any) => {

        this.electricity = Object.keys(data || {}).map(key => ({
          id: key,
          ...data[key]
        }));

        this.filteredElectricity = [...this.electricity];

       this.totalPages = Math.ceil(
  this.filteredElectricity.length / this.itemsPerPage
);

        this.categories = [
          'All',
          'Solar Panel',
          'Solar Inverter',
          'Electric Motor',
          'Transformer',
          'Battery',
          'Generator',
          'Circuit Breaker',
          'Switch Gear',
          'Power Cable',
          'Electrical Wire',
          'Distribution Board',
          'Control Panel',
          'Capacitor Bank',
          'Relay',
          'Contactor',
          'MCB',
          'MCCB',
          'ELCB',
          'VFD',
          'UPS',
          'Lighting',
          'Energy Meter',
          'Earthing Equipment',
          'Substation Equipment'
        ];

        this.loading = false;

      },

      error: () => {

        this.loading = false;

        Swal.fire(
          'Error',
          'Unable to load records.',
          'error'
        );

      }

    });

  }

// ================= Search =================

searchProduct(): void {

  let data = [...this.electricity];

  // Search
  if (this.searchText.trim()) {

    data = data.filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())
    );

  }

  // Category Filter
  if (this.selectedCategory !== 'All') {

    data = data.filter(item =>
      item.category === this.selectedCategory
    );

  }

  this.filteredElectricity = data;

  this.currentPage = 1;

 this.totalPages = Math.ceil(
  this.filteredElectricity.length / this.itemsPerPage
);

this.currentPage = 1;

}


// ================= Category Filter =================

filterCategory(): void {

  this.searchProduct();

}


// ================= Sorting =================

sortData(event: any): void {

  const value = event.target.value;

  switch (value) {

    case 'az':

      this.filteredElectricity.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      break;

    case 'za':

      this.filteredElectricity.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

      break;

    case 'category':

      this.filteredElectricity.sort((a, b) =>
        a.category.localeCompare(b.category)
      );

      break;

    default:

      this.filteredElectricity = [...this.electricity];
      this.searchProduct();

  }

}


// ================= Refresh =================

refreshData(): void {

  this.searchText = '';

  this.selectedCategory = 'All';

  this.currentPage = 1;

  this.getAllData();

}


// ================= Pagination =================

nextPage(): void {

  if (this.currentPage < this.totalPages) {

    this.currentPage++;

  }

}

previousPage(): void {

  if (this.currentPage > 1) {

    this.currentPage--;

    
  }
  

}



get paginatedData(): IElectricity[] {

  const startIndex = (this.currentPage - 1) * this.itemsPerPage;

  const endIndex = startIndex + this.itemsPerPage;

  return this.filteredElectricity.slice(startIndex, endIndex);

}


// ================= Navigation =================

readMore(id: string): void {

  this.router.navigate(['/details', id]);

}

edit(id: string): void {

  this.router.navigate(['/edit', id]);

}


// ================= Delete =================

delete(id: string): void {

  Swal.fire({

    title: 'Delete Equipment?',

    text: 'This action cannot be undone.',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#198754',

    cancelButtonColor: '#dc3545',

    confirmButtonText: 'Delete'

  }).then(result => {

    if (result.isConfirmed) {

      this.electricityService.deleteElectricity(id).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Deleted Successfully',

            timer: 1500,

            showConfirmButton: false

          });

          this.getAllData();

        },

        error: () => {

          Swal.fire(

            'Error',

            'Unable to delete record.',

            'error'

          );

        }

      });

    }

  });

}


// ================= PDF Export =================

exportPDF(): void {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Electricity Equipment Report', 14, 20);

  const tableData = this.filteredElectricity.map(item => [

    item.title,

    item.category,

    item.voltage,

    item.power

  ]);

  autoTable(doc, {

    head: [[

      'Title',

      'Category',

      'Voltage',

      'Power'

    ]],

    body: tableData,

    startY: 30,

    theme: 'grid',

    headStyles: {

      fillColor: [13,110,253]

    }

  });

  doc.save('Electricity_Report.pdf');

}

// ================= Excel Export =================

exportExcel(): void {

  const data = this.filteredElectricity.map(item => ({

    Title: item.title,

    Category: item.category,

    Voltage: item.voltage,

    Power: item.power,

    Description: item.description

  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = {

    Sheets: {

      Equipment: worksheet

    },

    SheetNames: ['Equipment']

  };

  const excelBuffer = XLSX.write(workbook, {

    bookType: 'xlsx',

    type: 'array'

  });

  const file = new Blob(

    [excelBuffer],

    {

      type:
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

    }

  );

  FileSaver.saveAs(file, 'Electricity_Report.xlsx');

}



  

}
