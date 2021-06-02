import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GraphqlService } from '../apipath/graphql.service';
import { OrderService } from '../apipath/order.service';
import { RestCartService } from '../apipath/restCart.service';
import { RestWishlistService } from '../apipath/RestWishlist.service';
import { Laptop, LaptopDetails } from '../models/Laptop';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  items: Observable<LaptopDetails[]>;
  laptopList: any[];
  laptop: any[];
  formData: any;
  localValue: string | null;
  newItems:Array<LaptopDetails>;
  laptopDetails: Array<LaptopDetails> = [];
  go=false;
  add=true;
  wishlist: number[]=[];
  laptopData:any;
  laptopId:number;
  laptopDe: any[];

  laptopCart:any[];
  cartList: number[]=[];
  laptopRating:any[];
  laptopRatingData:any;
  OrderList: number[]=[];

  constructor(
    private auth: SocialAuthService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cartService: RestCartService,
    private wishlistService: RestWishlistService,
    private graphqlService: GraphqlService,
    private orderService: OrderService,
    public dialog: MatDialog,private elRef: ElementRef, private renderer: Renderer2
  ) {
   
    console.log('services called');
   
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
  }
 
addedWishlist=false;
 lp3: number[]=[];
 laptopId1: number[]=[];

ngOnInit(): void {
 
  
  this.loadProducts();
 
  this.loadWhislist();
  this.loadaddCart();
  
}

loadProducts()
{ this.graphqlService.getAllLaptopList().subscribe((result: any) => {
  //console.log(result);
  this.laptop = result.data;

  this.laptop = result.data['getLaptopList'];
  let lap4=this.laptop.find((i: any[]) => i);
  this.laptopId1=lap4.id;
 // console.log(this.laptopId1);
  this.laptopList = this.chunkArray(this.laptop, 3);
 console.log(this.laptopList);
});
}
chunkArray(myArray: any[], chunk_size: number): any[] {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  for (index = 0; index < arrayLength; index += chunk_size) {
    this.laptopList = myArray.slice(index, index + chunk_size);
    tempArray.push(this.laptopList);
  }
  return tempArray;
}

LoginEmailId = localStorage.CustomerName;
loadWhislist(){
  this.wishlistService.getWishCustomerId(this.LoginEmailId).subscribe((result) => {
   this.laptopDe= result.laptop;
      let productIds: any[]=[]
      console.log(result);
      console.log(this.laptopDe);
      Array.from(this.laptopDe).forEach(itemdata=>
        productIds.push(itemdata.id),
        console.log(productIds)
        )
     this.wishlist= productIds;
     console.log(this.wishlist);
    }),
  (error: any) => console.log(error);
}




loadaddCart(){
  this.cartService.getCartCustomerId(this.LoginEmailId).subscribe((result) => {
   this.laptopCart= result.laptop;
      let productIdCart: any[]=[]
      console.log(result);
      console.log(this.laptopCart);
      Array.from(this.laptopCart).forEach(itemdata=>
        productIdCart.push(itemdata.id),
        console.log(productIdCart)
        )
     this.cartList= productIdCart;
     console.log(this.cartList);
    }),
  (error: any) => console.log(error);
}


loadOrderRating(){
  this.orderService.getRatingByCustomerId(this.LoginEmailId).subscribe((result) => {
  
   this.laptopRating= result.laptop;
  
   this.laptopRatingData=result.laptop;
      let productIdOrder: any[]=[]
      console.log(result);
      console.log(this.laptopRating);
      Array.from(this.laptopRating).forEach(itemda=>
        productIdOrder.push(itemda.id),
        console.log(productIdOrder)
        )
     this.OrderList= productIdOrder;
     console.log(this.OrderList);
    }),
  (error: any) => console.log(error);

}
 
  signOut(): any {
    console.log(localStorage.removeItem('username'));
    localStorage.clear();
    this.router.navigate(['/add-customer']);
  }

 
 

}
