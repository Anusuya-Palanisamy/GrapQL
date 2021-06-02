import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GraphqlService } from '../apipath/graphql.service';

@Component({
  selector: 'app-update-add-address',
  templateUrl: './update-add-address.component.html',
  styleUrls: ['./update-add-address.component.css']
})
export class UpdateAddAddressComponent implements OnInit {
  
  formDetails: FormGroup;
  //id: number;
  correct=false;
  wrong=false;
  localValue: string | null;
  customer: any[];
  user: any;
  addressid: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateAddAddressComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    this.addressid = data.id;
     localStorage.getItem('CustomerName');
    this.localValue = localStorage.getItem('CustomerName');
    const LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
    console.log('services called');
    if(LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
else{
    this.graphqlService.viewCustomer(LoginEmailId).subscribe((result: any) => {
      console.log(result);
      this.customer = result.data['findemail'];
      console.log(this.customer);
    });
  }
}

  ngOnInit() {
    this.formDetails = this.fb.group({
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
  LoginEmailId = localStorage.CustomerName;
  updateAddress() {
    console.log('name by update');
    this.graphqlService
      .updateAddress(
        this.LoginEmailId,
        this.addressid,
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
          this.wrong=true;
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
