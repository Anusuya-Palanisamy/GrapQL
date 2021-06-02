import { Component, OnInit } from '@angular/core';
import { LaptopDetails, Laptop } from '../models/Laptop';
import { ActivatedRoute, Router } from '@angular/router';
import { RestCartService } from '../apipath/restCart.service';
import { BuyLaptopComponent } from '../buy-laptop/buy-laptop.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  newItems: Array<LaptopDetails> = [];
  item: LaptopDetails = new LaptopDetails();
  isDisabled = true;
  localValue: string | null;
  newItemList: any;
  newLaptopList: any[];
  value: string;
  showItem = true;
  correct=false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private cartService: RestCartService
  ) {
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
    var cartSession = sessionStorage.cart;
    
  }

  reload(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.route });
  //this.correct=true;
   // this.router.navigate(['/myWishList']);
}


  ngOnInit() {
    this.localValue = localStorage.getItem('CustomerName');
    var LoginEmailId = localStorage.CustomerName;
    if(LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
    else{
    this.cartService.getCartCustomerId(LoginEmailId).subscribe(
      (result) => {
        console.log(result);
        if(result==null){
          this.value = 'Your Cart is Empty ';
          this.showItem = false;
        }
        else{
          
        this.newLaptopList = result.laptop;
        if(this.newLaptopList.length==0){
          this.value = 'Your Cart is Empty ';
          this.showItem = false;
        }
        else{
        console.log('second');
        console.log(this.newLaptopList);
        this.newItemList = this.chunkArray(this.newLaptopList, 3);
        console.log('second item');
        console.log(this.newItemList);
        this.isDisabled = false;
        }
        }
      },
     
      (error: any) => console.log(error)
    );
  }
}

  
  checkout(id: number) {
    console.log('Entered into Buy Laptop');
    var itemData = JSON.stringify(id);
    sessionStorage.setItem('buyItem', itemData);
    var buySession = sessionStorage.buyItem;
    this.newItems = JSON.parse(buySession);
    console.log(this.newItems);
    console.log(buySession);
    if(this.LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
else{
    this.cartService.deleteCustomerCartData(this.LoginEmailId,id).subscribe(
      (result) => {
        console.log(result);
      },
      (error: any) => console.log(error)
      );
    this.router.navigate(['/buy-laptop']);
  }
}

  LoginEmailId = localStorage.CustomerName;
  remCart(id:number) {
    this.cartService.deleteCustomerCartData(this.LoginEmailId,id).subscribe(
      (result) => {
        console.log(result.length==0);
       // alert("Item Shoud be removed from ur cart!");
       this.reload();
       
      },
      (error: any) => {console.log(error)
        
        this.router.navigate(['/cart-Details']);
      }
      );
  
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
