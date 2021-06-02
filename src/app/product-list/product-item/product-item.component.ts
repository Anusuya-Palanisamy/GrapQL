import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { map } from 'rxjs/internal/operators/map';
import { GraphqlService } from 'src/app/apipath/graphql.service';
import { RestCartService } from 'src/app/apipath/restCart.service';
import { RestWishlistService } from 'src/app/apipath/RestWishlist.service';
import { Laptop, LaptopDetails } from 'src/app/models/Laptop';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()  productItem: any;
  @Input() addedWishlist:boolean=false;
  @Input() addcartList=false;

  items: Observable<LaptopDetails[]>;
  laptopList: any[];
  laptop: any[];
  formData: any;
  localValue: string | null;
  newItems:Array<LaptopDetails>;
  laptopDetails: Array<LaptopDetails> = [];
  
  //add=true;
  
  laptopData:any;
  laptopId:number;
 

  constructor(
    private auth: SocialAuthService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cartService: RestCartService,
    private wishlistService: RestWishlistService,
    private graphqlService: GraphqlService,
    public dialog: MatDialog,private elRef: ElementRef, private renderer: Renderer2
  ) {
   
    console.log('services called');
   
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
  }
 

 lp3: number[]=[];
 laptopId1: number[]=[];
  lap:any;

ngOnInit(): void {
  this.formData = this.fb.group({
    brand: [''],
    processor: [''],
    memory: [''],
    screenSize: [''],
    graphices: [''],
  });
  
  this.loadProducts();
  
}

loadProducts()
{ this.graphqlService.getAllLaptopList().subscribe((result: any) => {
  //console.log(result);
  this.laptop = result.data;

  this.laptop = result.data['getLaptopList'];
  let lap4=this.laptop.find((i: any[]) => i);
  this.laptopId1=lap4.id;
  console.log(this.laptopId1);
  this.laptopList = this.chunkArray(this.laptop, 3);
 // console.log(this.laptopList);
});

}


 
 
 

  filterDataLaptop() {
    this.graphqlService
      .findLaptopData(this.formData.value)
      .subscribe((result: any) => {
        console.log(result);
        this.laptop = result.data['filterLaptop'];
      });
  }

  buyLaptop(id: number) {
    console.log('Entered into Buy Laptop');
    var itemData = JSON.stringify(id);
    sessionStorage.setItem('buyItem', itemData);
    var buySession = sessionStorage.buyItem;
    this.newItems = JSON.parse(buySession);
    console.log(this.newItems);
    console.log(buySession);
    this.router.navigate(['/buy-laptop']);
  }
  signOut(): any {
    console.log(localStorage.removeItem('username'));
    localStorage.clear();
    this.router.navigate(['/add-customer']);
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
  addCart(item:Laptop[]) {
    if(this.LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
    else{
  
      this.newItems=item;
     
    console.log(item);
    var cartData = {
      laptop: this.newItems,
      customerId: this.LoginEmailId,
    };
    this.cartService.createCart(cartData).subscribe(
      (data) => {
        this.addcartList=true;
       // this.add=false;
        console.log(data);
        alert('Product Added to your Cart');
      },
      (error: any) => console.log(error)
    );
  }
}


  addWishList(item: Laptop[]) {
   
    if(this.LoginEmailId==null){
      alert("Please Login your Id");
      this.router.navigate(['/customer-login']);
     

    }
   
    else{
   

    this.newItems=item;
    
    console.log(item);
    var cartData = {
      laptop: this.newItems,
      customerId: this.LoginEmailId,
    };
   
    this.wishlistService.createWishlist(cartData).subscribe(
      (data) => {

        console.log(data);
      
     //let elm = this.elRef.nativeElement.querySelector('#addToSummary');
       // this.renderer.setStyle(elm, 'color', 'red');
        alert('Product Added to wishList!');
      //  if(this.newItems.id==)
        this.addedWishlist=true;
      },
      (error: any) => console.log(error)
    );
    
  }
 
} 

remwish(id:number) {
  this.wishlistService.deleteCustomerWishData(this.LoginEmailId,id).subscribe(
    (result) => {
      console.log(result);
      this.addedWishlist=false;
      alert("Item Shoud be removed from tour wishlist!");
    },
    (error: any) => {console.log(error)
   
    }
    );

}

  remCart(id:number) {
    this.cartService.deleteCustomerCartData(this.LoginEmailId,id).subscribe(
      (result) => {
        console.log(result.length==0);
        this.addcartList=false;
        alert("Item Shoud be removed from ur cart!");
      // this.reload();
       
      },
      (error: any) => {console.log(error)
        
        this.router.navigate(['/cart-Details']);
      }
      );
  
  }

}
