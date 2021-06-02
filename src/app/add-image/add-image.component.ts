import { Component, OnInit, Optional, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { RestService } from '../apipath/rest.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  id: any;
  formDetails: any;
  imageSrc: string;
  file: File;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: string;
  correct=false;
  wrong=false;
  userInfoFormGroup: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddImageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private restService: RestService,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.userInfoFormGroup = this.fb.group({
      image:['', [ 
                           RxwebValidators.image({maxWidth:300,maxHeight:250 }),
                           RxwebValidators.extension({extensions:["jpeg","gif","jfif"]})
                           ]       
                      ], 
  });
  }

  reload(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/update-customer-Details'], { relativeTo: this.route });
  
  }

  uploadFileEvt(imgFile: any) {
    this.file = imgFile.target.files[0];
    console.log(this.file.name);
  }

  updateImage() {
    const imageload = new FormData();
    
   imageload.append('imageFile', this.file, this.file.name);
    this.restService
      .addImage(imageload, this.id)
      .then((data: any) => {
        console.log(data);
        this.correct=true;
      })
      .catch((error: any) => {
        console.log(error);
        this.wrong=true;
      });
  }
  imageload(imageload: any, id: any) {
    throw new Error('Method not implemented.');
  }

 

  getImageDetails() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.restService
      .getImage(this.id)
      .then((res) => {
        this.retrieveResonse = res;
        console.log(this.retrieveResonse);
        this.base64Data = this.retrieveResonse.image;
        console.log(this.base64Data);
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  //  this.reload();
    

  }
}
