import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GraphqlService } from '../apipath/graphql.service';
import { OrderService } from '../apipath/order.service';
import { Laptop, LaptopDetails } from '../models/Laptop';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  newItems: Array<LaptopDetails> = [];
  item: LaptopDetails = new LaptopDetails();
  isDisabled = true;
  localValue: string | null;
  newLaptopList: any[];
  newItemList: any;
  value: string;
  showItem = false;
  starRating = 0; 
  form: FormGroup;
  rating3: number;
  rat:number;
  orderId: any;
  OrderDetails: any;
  laptopRating:any[];
  laptopRatingData:any;
  cartList: any[];
  OrderList: number[]=[];
  customer: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private graphqlService: GraphqlService,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
  
    this.localValue = localStorage.getItem('CustomerName');
    var LoginEmailId = localStorage.CustomerName;

    if(LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
else{
    this.orderService.getOrderByCustomerId(LoginEmailId).subscribe(
      (result) => {
        console.log(result);
        this.OrderDetails=result;
        console.log("Orser Result");
       console.log( this.OrderDetails);
    
        if(result==null){
          this.value = 'Your Order is Empty ';
          this.showItem = true;
        }
        else{
          this.orderId=result.id;
          console.log( this.orderId);
        this.newLaptopList = result.laptop;
       
        console.log('second');
        
        console.log(this.newLaptopList);
        this.newItemList = this.chunkArray(this.newLaptopList, 3);
        console.log('second item');
        console.log(this.newItemList);
        this.isDisabled = false;
        }
        this.graphqlService.viewCustomer(LoginEmailId).subscribe((result: any) => {
          console.log(result);
          this.customer = result.data['findemail'];
          console.log(this.customer);
        }
        );
      },
     
      (error: any) => console.log(error)
    );
    this.loadOrderRating();
  }
}

  ngOnInit() {
  
    
  }
  LoginEmailId = localStorage.CustomerName;
loadOrderRating(){
  this.orderService.getRatingByCustomerId(this.LoginEmailId).subscribe((result) => {
  
   this.laptopRating= result.laptop;
  
   this.laptopRatingData=result.laptop;
      let productIdOrder: any[]=[]
      console.log(result);
      console.log(this.laptopRating);
      Array.from(this.laptopRating).forEach(itemdat=>
        productIdOrder.push(itemdat.id),
        console.log(productIdOrder)
        )
     this.OrderList= productIdOrder;
     console.log(this.OrderList);
    }),
  (error: any) => console.log(error);

}

//  LoginEmailId = localStorage.CustomerName;


  checkout(id: number) {
    console.log('Entered into Buy Laptop');
    var itemData = JSON.stringify(id);
    sessionStorage.setItem('buyItem', itemData);
    var buySession = sessionStorage.buyItem;
    this.newItems = JSON.parse(buySession);
    console.log(this.newItems);
    console.log(buySession);
    this.router.navigate(['/buy-laptop']);
  }

  chunkArray(myArray: any[], chunk_size: number): any[] {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      this.newItemList = myArray.slice(index, index + chunk_size);
      tempArray.push(this.newItemList);
    }
    return tempArray;
  }

  signOut(): any {
    console.log(localStorage.removeItem('username'));
    localStorage.clear();
    this.router.navigate(['/add-customer']);
  }
  show() {
    this.router.navigate(['/product']);
  }
}
