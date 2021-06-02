import { Component, OnInit } from '@angular/core';
import { LaptopDetails } from '../models/Laptop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestCartService } from '../apipath/restCart.service';
import { BuyLaptopComponent } from '../buy-laptop/buy-laptop.component';
import { RestWishlistService } from '../apipath/RestWishlist.service';
import { ShowCart } from '../models/show-cart';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {

  newItems: Array<LaptopDetails> = [];
  item: LaptopDetails = new LaptopDetails();
  isDisabled = true;
  showItem = true;
  localValue: string | null;
  value: string;
  newItemList: any;
  newLaptopList: any[];
  correct=false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private wishlistService: RestWishlistService
  ) {
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
  }
  reload(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.route });
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
    this.wishlistService.getWishCustomerId(LoginEmailId).subscribe(
      (result) => {
        console.log(result);
        if(result==null){
          this.value = 'Your WishList is Empty ';
          this.showItem = false;
        }
        else{
        this.newLaptopList = result.laptop;
        if(this.newLaptopList.length==0){
          this.value = 'Your WishList is Empty ';
          this.showItem = false;
        }
        else{
        console.log('second');
       // console.log(this.newLaptopList);
      
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
    this.router.navigate(['/buy-laptop']);
  }

  LoginEmailId = localStorage.CustomerName;
  remwish(id:number) {
      this.wishlistService.deleteCustomerWishData(this.LoginEmailId,id).subscribe(
        (result) => {
          console.log(result);
          //alert("Item Shoud be removed from tour wishlist!");
          this.reload();
       
        },
        (error: any) => {console.log(error)
       
        }
        );
        //this.correct=true;
      
 
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
