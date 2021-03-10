import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminviewticketComponent } from '../adminviewticket/adminviewticket.component';

class Ticket{
  ticketId: number;
  status: string;
  priority: string;
  createdByUserId: {
    userId:number,
    name:string,
    email:string,
    password:string,
    type:string,
    groups:any
  };
  title: string;
  startDate: Date;
  dueDate: Date;
  description: string;
  comments: any
  attachments: any;
  category: {
      "categoryId": number,
      "name": string
  };
  user: {
    userId:number,
    name:string,
    email:string,
    password:string,
    type:string,
    groups:any
  };
  constructor(ticketId:number,status:string,priority:string,createdByUserId:any,title:string,startDate:Date,dueDate:Date,description:string,category:any,user:any){
    this.ticketId=ticketId;
    this.createdByUserId=createdByUserId;
    this.title=title;
    this.startDate=startDate;
    this.status=status;
    this.dueDate=dueDate;
    this.priority=priority;
    this.description=description;
    this.category=category;
    this.user=user;
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
  selector: 'app-memberhome',
  templateUrl: './memberhome.component.html',
  styleUrls: ['./memberhome.component.css']
})
export class MemberhomeComponent implements OnInit {
  isActive = true;
  selectedFile = null;
  collection:Ticket[]=[];
  dataSource:any;
  table!: MatTable<any>;

  constructor(public dialog: MatDialog, public router: Router, private http:HttpClient) {
  
    
    const headers = { 'email': 'admin@gmail.com'};

    console.log(headers);

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

  displayedColumns: string[] = ['sno', 'title','description', 'category','attachment1','attachment2','close','askfordetails'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
 
  logout(){
    sessionStorage.setItem("email","");
  }
  onFileSelected(event : any){
    console.log(event);
    this.selectedFile=event.target.files[0];
  }
upload(id:number){
  console.log(id);
  const headers ={
    'email' : 'member1@gmail.com'
  };
  const fd =new FormData();
  fd.append('file',this.selectedFile!);
    
  
  let url='http://localhost:8080/ticket/'+id+'/uploadAttachment';
  this.http.put(url,fd,{headers})
    .subscribe(
      res =>  {
        console.log(res);
      });
}
download(id:number){
  console.log(id);
}
ask(id:number){
  console.log(id);
  const headers ={
    'email' : 'member1@gmail.com'
  };
  let url="http://localhost:8080/ticket/"+ id  +"/askForDetail";
  console.log(url);
    let str = this.http.get<any>(url).subscribe(
      response=>{
       console.log(JSON.parse(response));
        
        
      }
    );
    this.router.navigate(["http://localhost:8080/ticket/"+ id  +"/askForDetail"]);
  
}
close(id:number){
  console.log(id);
  const headers ={
    'email' : 'member1@gmail.com'
  };
  let url="http://localhost:8080/ticket/"+ id  +"/close";
  console.log(url);
  
  this.http.put(url,{}).toPromise().then((data:any)=>{
    console.log(data)
  });
  


}

}
