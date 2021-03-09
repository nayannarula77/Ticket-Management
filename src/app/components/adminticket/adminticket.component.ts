import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminviewticketComponent } from '../adminviewticket/adminviewticket.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

class Ticket{
        ticketId: number;
        status: string;
        priority: string;
        createdByUserId: number;
        title: string;
        startDate: Date;
        dueDate: Date;
        description: string;
        comments: any;
        attachments: any;
        category: {
            "categoryId": number,
            "name": string
        };
        user: any;
        constructor(ticketId:number,status:string,priority:string,createdByUserId:number,title:string,startDate:Date,dueDate:Date,description:string,category:any){
          this.ticketId=ticketId;
          this.createdByUserId=createdByUserId;
          this.title=title;
          this.startDate=startDate;
          this.status=status;
          this.dueDate=dueDate;
          this.priority=priority;
          this.description=description;
          this.category=category;
        }
}


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

  collection:Ticket[]=[];
  dataSource:any;
  table!: MatTable<any>;

  constructor(public dialog: MatDialog, public router: Router, private http:HttpClient) {

    const headers = { 'email': 'member3@gmail.com'};
    let url="http://localhost:8080/ticket";
    this.http.get<any>(url,{headers}).subscribe(
      response=>{
        console.log(response);
        this.collection=response;
        this.dataSource=new MatTableDataSource(this.collection);
        console.log(this.collection);
        //this.table.renderRows();
      }
    )


   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['sno', 'title','description', 'category','status', 'priority', 'creator', 'assignedto','comment','attachment'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
 
  openDialog(): void {
    this.dialog.open(AdminviewticketComponent);
    }

}
