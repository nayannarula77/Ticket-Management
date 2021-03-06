import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminviewticketComponent } from '../adminviewticket/adminviewticket.component';

export interface PeriodicElement {
  title: string;
  sno: number;
  group: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, title: 'Hydrogen', group:'IT'},
  {sno: 2, title: 'Helium', group: 'IT'},
  {sno: 3, title: 'Lithium', group: 'SALES'},
  {sno: 4, title: 'Beryllium', group: 'SALES'},
  {sno: 5, title: 'Boron', group: 'IT'},
  {sno: 6, title: 'Carbon', group: 'SALES'},
  {sno: 7, title: 'Nitrogen', group: 'IT'},
  {sno: 8, title: 'Oxygen', group: 'IT'},
  {sno: 9, title: 'Fluorine', group: 'SALES'},
  {sno: 10, title: 'Neon', group: 'SALES'},
];

@Component({
  selector: 'app-adminticket',
  templateUrl: './adminticket.component.html',
  styleUrls: ['./adminticket.component.css']
})
export class AdminticketComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['sno', 'title', 'group','view'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
 
  openDialog(): void {
    this.dialog.open(AdminviewticketComponent);
    }

}
