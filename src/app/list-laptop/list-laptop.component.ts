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
  selector: 'app-list-laptop',
  templateUrl: './list-laptop.component.html',
  styleUrls: ['./list-laptop.component.css'],
})
export class ListLaptopComponent implements OnInit {
  laptopList: any[];
  laptop: any[];
  //  dataSource =new MatTableDataSource<Laptop>();
  title: string;
  id: number;
  formData: any;
  localValue: string | null;

  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

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
  updateLaptop(id: number) {
    const dialogRef = this.dialog.open(UpdateLaptopComponent, {
      height: '300px',
      width: '350px',
      data: { id },
    });
  }
  imageAdd(id: number) {
    const dialogRef = this.dialog.open(AddImageComponent, {
      height: '300px',
      width: '350px',
      data: { id },
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

  getImageDetails(id: number) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.restService
      .getImage(id)
      .then((res) => {
        this.retrieveResonse = res;
        console.log(this.retrieveResonse);
        this.base64Data = this.retrieveResonse.image;
        console.log(this.base64Data);
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data.data;
        console.log('Retrivesd');
        console.log(this.retrievedImage);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

}
