import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphqlService } from '../apipath/graphql.service';
import { Customer } from '../models/Customer';

@Component({
  selector: 'app-sign-in-add-customer',
  templateUrl: './sign-in-add-customer.component.html',
  styleUrls: ['./sign-in-add-customer.component.css']
})
export class SignInAddCustomerComponent implements OnInit {

  router: any;
  customer: Customer[];
  action: string;
  local_data: any;
  user: any;
  name: String;
  formDetails: FormGroup;
  id: number;
  localValue: string | null;
  correct=false;
  wrong=false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SignInAddCustomerComponent>,
   //@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    //this.id = data.id;
    
    let sess = sessionStorage.getItem('signInId');
    var signInId = sessionStorage.signInId;
    console.log(signInId);
  }

  ngOnInit() {
    this.formDetails = this.fb.group({
     
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      gender: [''],
      addressDetails: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
  }
  _keynumPress(event: any) {
    const pattern = /[+0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
  }
  
  signInId = sessionStorage.signInId;
  uploadSignInDetails() {
    console.log('name by update');
   // console.log(signInId);
    
    this.graphqlService
      .uploadSigInCustomer(
        this.signInId,
        this.formDetails.value.gender,
        this.formDetails.value.mobileNumber,
        this.formDetails.value.addressDetails,
        this.formDetails.value.city,
        this.formDetails.value.state,
        this.formDetails.value.pincode
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.user = data;
          this.correct=true;
        },
        (error: any) => {
          console.log(error);
          this.wrong=false;
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
