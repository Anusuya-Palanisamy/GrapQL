import { Component, OnInit, Optional, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAddressService } from '../apipath/addAddress.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  id: number;

  form: any;
  user: any;
  localValue: string | null;
  customer: any[];
  formDetail: FormGroup;
  correct=false;
  wrong=false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private addAddressService:AddAddressService,
    public dialogRef: MatDialogRef<AddAddressComponent>,
   // @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    //this.id = data.id;
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

  reload(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.route });
  
  }
  ngOnInit(): void {
    this.formDetail = this.fb.group({
      addressDetails: ['', Validators.required],
      city:['', Validators.required],
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
  addAdressData() {
    var cartData = {
      customerId: this.LoginEmailId,
      addressData:this.formDetail.value
    };
    console.log('name by update');
    this.addAddressService
      .createAddress(cartData)
      .subscribe(
        (data: any) => {
          this.correct=true;
          console.log(data);
          this.user = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    
  }

  onNoClick(): void {
    this.dialogRef.close();
   // this.reload();
   // this.router.navigateByUrl("/buy-laptop");
  }
}
