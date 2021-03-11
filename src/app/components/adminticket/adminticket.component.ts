import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AdminviewticketComponent } from '../adminviewticket/adminviewticket.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

class Ticket {
  ticketId: number;
  status: string;
  priority: string;
  createdByUserId: {
    userId: number;
    name: string;
    email: string;
    password: string;
    type: string;
    groups: any;
  };
  title: string;
  startDate: Date;
  dueDate: Date;
  description: string;
  comments: any;
  attachments: any;
  category: {
    categoryId: number;
    name: string;
  };
  user: {
    userId: number;
    name: string;
    email: string;
    password: string;
    type: string;
    groups: any;
  };
  constructor(
    ticketId: number,
    status: string,
    priority: string,
    createdByUserId: any,
    title: string,
    startDate: Date,
    dueDate: Date,
    description: string,
    category: any,
    user: any
  ) {
    this.ticketId = ticketId;
    this.createdByUserId = createdByUserId;
    this.title = title;
    this.startDate = startDate;
    this.status = status;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.category = category;
    this.user = user;
  }
}

@Component({
  selector: 'app-adminticket',
  templateUrl: './adminticket.component.html',
  styleUrls: ['./adminticket.component.css'],
})
export class AdminticketComponent implements OnInit {
  isActive = true;
  collection: Ticket[] = [];
  dataSource: any;
  table!: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private http: HttpClient
  ) {
    let adminemail = sessionStorage.getItem('email') || '';
    const headers = { email: adminemail };

    console.log(headers);

    let url = 'http://localhost:8080/ticket';
    this.http
      .get<any>(url, { headers })
      .subscribe((response) => {
        console.log(response);
        this.collection = response;
        this.dataSource = new MatTableDataSource(this.collection);
        console.log(this.collection);
      });
  }

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'sno',
    'title',
    'description',
    'category',
    'status',
    'priority',
    'creator',
    'assignedto',
    'startdate',
    'duedate',
    'comment',
    'attachment1',
    'attachment2',
  ];

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  logout() {
    sessionStorage.setItem('email', '');
  }
}
