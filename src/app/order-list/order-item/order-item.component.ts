import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/apipath/order.service';
import { Laptop, LaptopDetails } from 'src/app/models/Laptop';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  
  @Input()  productItem: any;
  @Input() OrderId:any;
 // @Input() Address:any;
  @Input() customerDetails:any;
  @Input() OrederColrer:boolean=false;
  @Input() RaingData:any;
 

  newItems: Array<LaptopDetails> = [];
  item: LaptopDetails = new LaptopDetails();
  isDisabled = true;
  localValue: string | null;
  newLaptopList: any[];
  newItemList: any;
  value: string;
  showItem = true;
  OrderDetails: any;
  laptopRating:any[];
  laptopRatingData:any;
  cartList: any[];
  OrderList: number[]=[];
  
  form: FormGroup;
  //rating3: number;
  rat:number;
  ratValue:any;
  rating: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
  
  
}
stars: number[] = [1, 2, 3, 4, 5];


  ngOnInit() {
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
    
    //this.rating3 = 0;
    this.form = this.fb.group({
      rating: [''],
    })
    console.log(this.form.value.rating);
    this.ratValue = this.form.controls.rating.valueChanges;
    
    
  }

 /* loadOrderRating(){
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
  
  }*/

  LoginEmailId = localStorage.CustomerName;

  ratingData(star:any,item: Laptop[]){
    
    this.newItems=item;
    //this.LaptopNew=
//this.rating=this.form.value.rating
    
    console.log(this.newItems);
    console.log(this.LoginEmailId);
    var cartData = {
      customerId: this.LoginEmailId,
      laptop: this.newItems,
      rating:star
     
     
    };
    this.orderService.createRating(cartData).subscribe(
      (data) => {

        console.log(data);
        //alert('Product rating Added Sucessfully!');
        this.OrederColrer=true;
      
      },
      (error: any) => console.log(error)
    );
    
  
  }
  removeRating(star:any,item: Laptop[]){
    
    this.newItems=item;
    //this.LaptopNew=
//this.rating=this.form.value.rating
    
    console.log(this.newItems);
    console.log(this.LoginEmailId);
    var cartData = {
      customerId: this.LoginEmailId,
      laptop: this.newItems,
      rating:star
     
     
    };
    this.orderService.createRating(cartData).subscribe(
      (data) => {

        console.log(data);
        //alert('Product rating Added Sucessfully!');
        this.OrederColrer=true;
      
      },
      (error: any) => console.log(error)
    );
    
  
  }
 // LoginEmailId = localStorage.CustomerName;


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
