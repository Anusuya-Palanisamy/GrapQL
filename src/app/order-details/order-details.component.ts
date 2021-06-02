import { Component, OnInit } from '@angular/core';
import { Laptop, LaptopDetails } from '../models/Laptop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from '../apipath/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  newItems: Array<LaptopDetails> = [];
  item: LaptopDetails = new LaptopDetails();
  isDisabled = true;
  localValue: string | null;
  newLaptopList: any[];
  newItemList: any;
  value: string;
  showItem = true;
  starRating = 0; 
  form: FormGroup;
  rating3: number;
  rat:number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
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
        if(result==null){
          this.value = 'Your Order is Empty ';
          this.showItem = false;
        }
        else{
        this.newLaptopList = result.laptop;
       
        console.log('second');
        
        console.log(this.newLaptopList);
        this.newItemList = this.chunkArray(this.newLaptopList, 3);
        console.log('second item');
        console.log(this.newItemList);
        this.isDisabled = false;
        }
      
      },
     
      (error: any) => console.log(error)
    );
  }
}

  ngOnInit() {
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
    
    this.rating3 = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
    console.log(this.form.value.rating);
    
  }

//  LoginEmailId = localStorage.CustomerName;

  rating(item: Laptop[]){
    this.localValue = localStorage.getItem('CustomerName');
    var LoginEmailId = localStorage.CustomerName;
    this.newItems=item;
    
    console.log(this.newItems);
    console.log(LoginEmailId);
    var cartData = {
      customerId: LoginEmailId,
      laptop: this.newItems,
     
       rating:this.form.value.rating
    };
    this.orderService.createRating(cartData).subscribe(
      (data) => {

        console.log(data);
        //alert('Product rating Added Sucessfully!');
      
      },
      (error: any) => console.log(error)
    );
    
  
  }

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
    this.router.navigate(['/view-laptop-customer']);
  }
}
