import { Component, OnInit, Inject, Optional } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

//Reactive Forms
import {
  Validators,
  FormGroup,
  FormBuilder,
  EmailValidator,
} from '@angular/forms';
import { Customer } from '../models/Customer';
import { GraphqlService } from '../apipath/graphql.service';
import { Router } from '@angular/router';

export class Address {
  city: String;
  state: String;
  country: String;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  dataSource = new MatTableDataSource();

  customer:  any[];
  action: string;
  local_data: any;
  user: any;
  name: String;
  formDetails: FormGroup;
  id: number;
  correct=false;
  wrong=false;
  localValue: string | null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    this.id = data.id;
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
  updateName() {
    console.log('name by update');
    this.graphqlService
      .updateAddress(
        this.LoginEmailId,
        this.id,
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
