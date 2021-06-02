import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestService } from '../apipath/rest.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-add-laptop',
  templateUrl: './add-laptop.component.html',
  styleUrls: ['./add-laptop.component.css'],
})
export class AddLaptopComponent implements OnInit {
  submitted = false;
  formLaptop: FormGroup;

  formDetails: any;
  imageSrc: string;
  file: File;
  id: number;
  correct=false;
  wrong=false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddLaptopComponent>,
    private fb: FormBuilder,
    private restService: RestService,
    private graphqlService: GraphqlService,
   
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.formLaptop = this.fb.group({
      //image: [{ value: '', disabled: false }, Validators.required],
      // file: { value:'', disabled: false },

      brand: ['', Validators.required],
      processor: ['', Validators.required],
      price: ['', Validators.required],
      memory: [''],
      /*image:['', [ 
       
        RxwebValidators.extension({extensions:["jpeg","gif","jfif"]})
        ]       
   ], */
      screenSize: [''],
      graphices: ['', Validators.required],
      details: ['', Validators.required],
      quan: ['', Validators.required],
    });
  }

  addLaptopDetails() {
    this.graphqlService
      .createLaptop(this.formLaptop.value)
      .then((data: any) => {
        this.correct=true;
      //  alert('Laptop Details created successfully.');
        console.log(data);
      })
      .catch((error: any) => {
        //alert('Not Upload Laptop Details!');
        this.wrong=true;
        console.log(JSON.stringify(error));
      });

    this.formLaptop.reset();

  }
  uploadFileEvt(imgFile: any) {
    this.file = imgFile.target.files[0];
    console.log(this.file.name);
  }

  addLaptopUpload(){
    const imageload = new FormData();
    
    imageload.append('imageFile', this.file, this.file.name);
  this.restService.addLaptop(imageload, this.formLaptop.value)
  .then((data: any) => {
    console.log(data);
    this.correct=true;
  })
  .catch((error: any) => {
    console.log(error);
    this.wrong=true;
  });
}
imageload(imageload: any, Laptop: any) {
  throw new Error('Method not implemented.');
}



  dialogClear(): void {
    this.dialogRef.close();
  }
}
