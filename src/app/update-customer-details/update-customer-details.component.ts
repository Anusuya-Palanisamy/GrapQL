import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { Customer } from '../models/Customer';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { AddImageComponent } from '../add-image/add-image.component';
import { RestService } from '../apipath/rest.service';
import { CustomerService } from '../services/Customer.service';
import { Observable } from 'rxjs';
import { UpdateMobileNumberComponent } from '../update-mobile-number/update-mobile-number.component';
import { AddAddressComponent } from '../add-address/add-address.component';
import { AddAddressService } from '../apipath/addAddress.service';
import { UpdateAddAddressComponent } from '../update-add-address/update-add-address.component';
import { SignInAddCustomerComponent } from '../sign-in-add-customer/sign-in-add-customer.component';
import { timeStamp } from 'console';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-update-customer-details',
  templateUrl: './update-customer-details.component.html',
  styleUrls: ['./update-customer-details.component.css'],
})
export class UpdateCustomerDetailsComponent implements OnInit {
  customer: any;

  user: string;
  emailId: any;
   // imagePath = "/assets/image/person.jpg";
  retrieveResonse: any;
  base64Data: any;
  retrievedImage:any;
  localValue: string | null;
  cart=false;
  imageButton=true;
  imageButtonEdit=false;
  addSignInData=true;
  addAddressData: any;
  updateRow=false;
  lp3: Number;
  addAddressValue:false;
  defaultImage=false;
  customerId:number;
  updateRowData1=false;

 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    private customerService: CustomerService,
    private addAddressService:AddAddressService,
    private restService: RestService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
   
}



ngOnInit():void{
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
     this.customerId=this.customer.id;
    console.log(this.customerId);
   
    //let lap= this.customer;
    //let lap2=lap.find((i: any[]) => i);
   this.lp3=this.customer.mobileNumber;

     //console.log( lap2);
     console.log( this.lp3);
     if(this.customer.mobileNumber!=null){
      this.defaultImage=true;
      this.updateRow=true;
      this.addSignInData=false;
     
     }
   
   

  });
  

   }
 this.retrievedImage= "/assets/image/person.jpg";

}
ngAfterViewInit(){
  this.restService
  .getImage(this.customerId)
  .then((res) => {
   
     if(res==null){
      this.retrievedImage= "/assets/image/person.jpg";
     }
   else{
     
    this.imageButton=false;
    this.imageButtonEdit=true;
    this.retrieveResonse = res;
    console.log(this.retrieveResonse);
    this.base64Data = this.retrieveResonse.image;
    console.log(this.base64Data);
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data.data;
    console.log('Retrivesd');
    console.log(this.retrievedImage);
    this.defaultImage=false;
   }
  })
  .catch((error: any) => {
    console.log(error);
  }),
  
  this.addAddressService.getAddressByCustomerId(this.LoginEmailId).subscribe((result: any) => {
    console.log(result);
    this.addAddressData=result;
    if( this.addAddressData.address.length==0){
      this.updateRowData1=false;

    }
    else{
      this.updateRowData1=true;
    }
  
  }); 
}

reload(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
this.router.onSameUrlNavigation = 'reload';
this.router.navigate(['./'], { relativeTo: this.route });
//this.correct=true;
 // this.router.navigate(['/myWishList']);
}

  update(id: number) {
   
    const dialogRef = this.dialog.open(DetailsComponent, {
      height: '480px',
      width: '330px',
      data: { id },
    });
    console.log({ id });
   
  }

  SignInData(id:number){
    const dialogRef = this.dialog.open(SignInAddCustomerComponent, {
      height: '590px',
      width: '450px'
  });
}

  updateNumber(id: number) {
   
    const dialogRef = this.dialog.open(UpdateMobileNumberComponent, {
      height: '300px',
      width: '330px',
      data: { id },
    });
    console.log({ id });
   
  }
  addAddress(){
    const dialogRef = this.dialog.open(AddAddressComponent, {
      height: '480px',
      width: '330px'  
    });

  }

  imageAdd(id: number) {
  //  this.retrievedImage = "";
    this.customerId = id;
    const dialogRef = this.dialog.open(AddImageComponent, {
      height: '400px',
      width: '400px',
      data: { id },
    });
  // this.ngOnInit();
  
  }
  getImageDetails(id: number) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    console.log('Inside the get DEtails');
    this.restService
      .getImage(id)
      .then((res) => {
        this.imageButton=false;
        this.imageButtonEdit=true;
        this.retrieveResonse = res;
        console.log(this.retrieveResonse);
        this.base64Data = this.retrieveResonse.image;
        console.log(this.base64Data);
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data.data;
        console.log('Retrivesd');
        console.log(this.retrievedImage);
        this.defaultImage=false;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  show() {
    this.router.navigate(['/view-laptop-customer']);
  }

  LoginEmailId = localStorage.CustomerName;
  remove(id:number){
    this.addAddressService.deleteCustomerAddAddressData(this.LoginEmailId,id).subscribe(
      (result) => {
        //console.log(result.length==0);
        alert("Address Removed Successfully");
       this.reload();
      },
      (error: any) => {console.log(error)
        
    
      }
      );

  }
  updateAddAddress(id:number){
    const dialogRef = this.dialog.open(UpdateAddAddressComponent, {
      height: '480px',
      width: '330px',
      data: { id },
    });
    console.log({ id });
  }

  
}
