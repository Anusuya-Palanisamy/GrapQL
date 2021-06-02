import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { Laptop } from '../models/Laptop';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateLaptopComponent } from '../update-laptop/update-laptop.component';
import { AddLaptopComponent } from '../add-laptop/add-laptop.component';
import { AddImageComponent } from '../add-image/add-image.component';
import { RestService } from '../apipath/rest.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  laptopList: any[];
  laptop: any[];
  //  dataSource =new MatTableDataSource<Laptop>();
  title: string;
  id: number;
  formData: any;
  localValue: string | null;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private restService: RestService,
    private graphqlService: GraphqlService,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    

  ) {
    this.title = 'View or Update Your Profile';
    console.log('services called');
    this.graphqlService.getAllLaptopList().subscribe((result: any) => {
      console.log(result);
      this.laptop = result.data;

      this.laptop = result.data['getLaptopList'];
      console.log(this.laptop);
      this.laptopList = this.chunkArray(this.laptop, 3);
      console.log(this.laptopList);
    });
    this.localValue = localStorage.getItem('username');
    console.log(this.localValue);
  }

  ngOnInit(): void {
    this.formData = this.fb.group({
      brand: [''],
      processor: [''],
      memory: [''],
      screenSize: [''],
      graphices: [''],
    });
  }
  
  addLaptop() {
    const dialogRef = this.dialog.open(AddLaptopComponent, {
      height: '570px',
      width: '390px',
    });
  }

  filterDataLaptop() {
    this.graphqlService
      .findLaptopData(this.formData.value)
      .subscribe((result: any) => {
        console.log(result);

        this.laptop = result.data['filterLaptop'];
      });
  }
  laptoplist() {
    this.router.navigate(['/view-laptop']);
  }
  customerlist() {
    this.router.navigate(['/view-customer']);
  }

  chunkArray(myArray: any[], chunk_size: number): any[] {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      this.laptopList = myArray.slice(index, index + chunk_size);
      tempArray.push(this.laptopList);
    }
    return tempArray;
  }


}
