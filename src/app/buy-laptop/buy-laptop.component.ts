import { Component, OnInit, Optional, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GraphqlService } from '../apipath/graphql.service';
import { FormBuilder } from '@angular/forms';
import { Laptop, LaptopDetails } from '../models/Laptop';
import { Customer } from '../models/Customer';
import { DetailsComponent } from '../details/details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAddressComponent } from '../add-address/add-address.component';
import { OrderService } from '../apipath/order.service';
import { SignInAddCustomerComponent } from '../sign-in-add-customer/sign-in-add-customer.component';
import { UpdateMobileNumberComponent } from '../update-mobile-number/update-mobile-number.component';
import { AddAddressService } from '../apipath/addAddress.service';
import { UpdateAddAddressComponent } from '../update-add-address/update-add-address.component';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-buy-laptop',
  templateUrl: './buy-laptop.component.html',
  styleUrls: ['./buy-laptop.component.css'],
})
export class BuyLaptopComponent implements OnInit {
  laptop: Laptop[];
  laptoplist: any = [];
  localValue: string | null;
  customer: any;
  isLinear = true;
  inboundClick = true;
  outboundClick = true;
  newItems:any;
  newItemList: any;
  addSignInData=true;
  addAddressData: any;
  updateRow=false;
  lp3: any;
  

  //Address: 'Address1' | 'address2' = 'address2';

  form: any;
  isLoading: boolean;
  updateRowData1=false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private addAddressService:AddAddressService,
    private orderService: OrderService,
    private graphqlService: GraphqlService
  ) {
    localStorage.getItem('CustomerName');
    this.localValue = localStorage.getItem('CustomerName');
    const LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
    console.log('Buy Item Session page Entered');

    sessionStorage.getItem('buyItem');
    var buySession = sessionStorage.buyItem;
    console.log(buySession);

    if(LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
    else{
     
      this.graphqlService
      .getLaptopListById(buySession)
      .subscribe((result: any) => {
        console.log(result);
        this.laptop = result.data['getLaptopById'];
        console.log(this.laptop);
      });
        this.graphqlService.viewCustomer(LoginEmailId).subscribe((result: any) => {
          console.log(result);
          this.customer = result.data['findemail'];
          console.log(this.customer);
         
          //let lap= this.customer;
          //let lap2=lap.find((i: any[]) => i);
         this.lp3=this.customer.mobileNumber;
    
           //console.log( lap2);
           console.log( this.lp3);
           if(this.customer.mobileNumber!=null){
            this.addSignInData=false;
            this.updateRow=true;
           
           }
         
         
      
        }),
        this.addAddressService.getAddressByCustomerId(LoginEmailId).subscribe((result: any) => {
          console.log(result);
          this.addAddressData=result;
        
          if(  this.addAddressData.address.length==0){
            this.updateRowData1=false;
      
          }
          else{
            this.updateRowData1=true;
          }
        
        
        });
      }
}

  ngOnInit(): void {
    this.form = this.fb.group({
      address:['']
    })
  
  }
 
  LoginEmailId = localStorage.CustomerName;
  addOrder(item: Laptop) {
    //this.orderService.addOrderItem(item);
    
    this.newItems=item;
    
    console.log(item);
    console.log("Entered to the Orders");
    console.log(this.form.value.address);
    var cartData = {
      laptop: this.newItems,
      customerId: this.LoginEmailId,
      address:this.form.value.address,
      mobileNumber:this.lp3
     
    };
    this.orderService.createOrder(cartData).subscribe(
      (data) => {
        console.log(data);
        //alert('Product Added');
      },
      (error: any) => console.log(error)
    );
  }
  conform() {
    alert(
      'Your Order can be Placed Successfully!!!   You can excerpt delivery by after 7 days!!!   Thank you!!!'
    );
    this.router.navigate(['/product']);
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
update(id: number) {
   
  const dialogRef = this.dialog.open(DetailsComponent, {
    height: '480px',
    width: '330px',
    data: { id },
  });
  console.log({ id });
 
}
reload(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
this.router.onSameUrlNavigation = 'reload';
this.router.navigate(['./'], { relativeTo: this.route });

}
//LoginEmailId = localStorage.CustomerName;
remove(id:number){
  this.addAddressService.deleteCustomerAddAddressData(this.LoginEmailId,id).subscribe(
    (result) => {
      //console.log(result.length==0);
     // alert("Item Shoud be removed from ur cart!");
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
addAddress(){
  const dialogRef = this.dialog.open(AddAddressComponent, {
    height: '480px',
    width: '330px'  
  });

}
}
