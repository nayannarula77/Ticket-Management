import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';


class Categories {
  name: string;
  categoryId: number;
  constructor(name:string,categoryId:number){
    this.name=name;
    this.categoryId=categoryId;
  }
}




@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})



export class AdmincategoryComponent implements OnInit {

  

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required)
  })

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  collection: Categories[] = [
    {categoryId: 1, name: 'Hydrogen'},
    {categoryId: 2, name: 'Helium'},
    {categoryId: 3, name: 'Lithium'},
    {categoryId: 4, name: 'Beryllium'},
    {categoryId: 5, name: 'Boron'},
    {categoryId: 6, name: 'Carbon'},
    {categoryId: 7, name: 'Nitrogen'},
    {categoryId: 8, name: 'Oxygen'},
    {categoryId: 9, name: 'Fluorine'},
    {categoryId: 10, name: 'Neon'},
  ];

  searchtext:string ="";
  constructor(private http:HttpClient) {

    let url="http://localhost:8080/category";
    this.http.get(url).toPromise().then(
      data=>{
        console.log(data);

        

      }
    )

   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['categoryId', 'name'];
 
  dataSource=new MatTableDataSource(this.collection);
  
  add(){
  
    
    let url="http://localhost:8080/category";

    this.http.post(url, {
      name:this.formGroup.value.name
    }).toPromise().then((data:any)=>{
      console.log(data)
    });
  
  this.dataSource.data.push({categoryId:this.collection.length+1,name:this.formGroup.value.name});  
  this.table.renderRows();
  
  }

  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
 
}
