import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';


class Categories {
  name: string;
  sno: number;
  constructor(name:string,sno:number){
    this.name=name;
    this.sno=sno;
  }
}




@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})



export class AdmincategoryComponent implements OnInit {

  

  name = new FormControl('');

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  collection: Categories[] = [
    {sno: 1, name: 'Hydrogen'},
    {sno: 2, name: 'Helium'},
    {sno: 3, name: 'Lithium'},
    {sno: 4, name: 'Beryllium'},
    {sno: 5, name: 'Boron'},
    {sno: 6, name: 'Carbon'},
    {sno: 7, name: 'Nitrogen'},
    {sno: 8, name: 'Oxygen'},
    {sno: 9, name: 'Fluorine'},
    {sno: 10, name: 'Neon'},
  ];

  searchtext:string ="";
  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['sno', 'name'];
 
  dataSource=new MatTableDataSource(this.collection);
  
  add(){
    
  
  this.dataSource.data.push({sno:this.collection.length+1,name:this.name.value});  
  this.table.renderRows();
  
  }

  applyFilter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
 
}
