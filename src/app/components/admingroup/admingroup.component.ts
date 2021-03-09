import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminviewgroupComponent } from '../adminviewgroup/adminviewgroup.component';

class Group {
  name: string;
  sno: number;
  category: string;
  constructor(name:string,sno:number,category:string){
    this.name=name;
    this.sno=sno;
    this.category=category;
  }
}

class Categories {
  name: string;
  categoryId: number;
  groups:any;
  ticket:any;
  constructor(name:string,categoryId:number){
    this.name=name;
    this.categoryId=categoryId;
  }
}


@Component({
  selector: 'app-admingroup',
  templateUrl: './admingroup.component.html',
  styleUrls: ['./admingroup.component.css']
})
export class AdmingroupComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
   
  })


  categories:Categories[]=[];

  name = new FormControl('');
  category=new FormControl('');

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  collection: Group[] = [
    {sno: 1, name: 'Hydrogen', category:"IT"},
    {sno: 2, name: 'Helium', category:"IT"},
    {sno: 3, name: 'Lithium', category:"SALES"},
    {sno: 4, name: 'Beryllium', category:"IT"},
    {sno: 5, name: 'Boron', category:"SALES"},
    {sno: 6, name: 'Carbon', category:"SALES"},
    {sno: 7, name: 'Nitrogen', category:"IT"},
    {sno: 8, name: 'Oxygen', category:"IT"},
    {sno: 9, name: 'Fluorine', category:"SALES"},
    {sno: 10, name: 'Neon', category:"IT"},
  ];

  searchtext:string ="";


  constructor(public dialog: MatDialog, private http:HttpClient) {


    let url="http://localhost:8080/category";
    this.http.get<any>(url).subscribe(
      response=>{
        console.log(response);
        this.categories=response;
      }
    )


   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['sno', 'name','category', 'view'];
 
  dataSource=new MatTableDataSource(this.collection);
  
  add(){
    
  
  this.dataSource.data.push({sno:this.collection.length+1,name:this.formGroup.value.name,category:this.formGroup.value.category});  
  this.table.renderRows();
  
  }

  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  openViewGroupDialog(){
    this.dialog.open(AdminviewgroupComponent);
  }






}
