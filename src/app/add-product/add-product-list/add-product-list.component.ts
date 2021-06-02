import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddImageComponent } from 'src/app/add-image/add-image.component';
import { RestService } from 'src/app/apipath/rest.service';
import { UpdateLaptopComponent } from 'src/app/update-laptop/update-laptop.component';

@Component({
  selector: 'app-add-product-list',
  templateUrl: './add-product-list.component.html',
  styleUrls: ['./add-product-list.component.css']
})
export class AddProductListComponent implements OnInit {
  @Input()  productItem: any;
  
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

  constructor(
    public dialog: MatDialog,
    private restService: RestService,
  ) { }

  ngOnInit(): void {
  }
  ngAfterviewInit()
  {

   
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
