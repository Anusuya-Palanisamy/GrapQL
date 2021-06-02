import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, LaptopDetails } from '../models/Laptop';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RestWishlistService {
  // private baseUrl = 'http://localhost:8080/api/v1/cart';

  newItems: Array<LaptopDetails> = [];

  constructor(private http: HttpClient) {}

  createWishlist(wishlist: Object): Observable<any> {
    return this.http.post('/api/createwishlist', wishlist);
  }

  getWishCustomerId(customerId: String): Observable<any> {
    return this.http.get(`/api/wishlistbycustomerid/${customerId}`);
  }
  deleteCustomerWishData(customerId: String,id:Number): Observable<any> {
    console.log('Entered cart Service for cart Display');
    return this.http.delete(`/api/wish/delete/${customerId}/${id}`,{ responseType: 'text' });
  }

  getAllWishList(): Observable<any> {
    return this.http.get('/api/wishlists');
  }
  
  
  /*getWishCustomer(customerId: String) {
    return this.http.get(`/api/wishlistbycustomerid/${customerId}`)
    .pipe(
      map((result:any[]) => {
        let productIds: any[]=[]
       
        result.forEach(itemdata=>productIds.push(itemdata.id))
       return productIds;
      }
      );
      productIds.subscribe(x => console.log(x));

      )
    
  }*/

  
  //console.log('emailId: ' + LoginEmailId);
  getWhislist(productIds:number):  void{
    const localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log(LoginEmailId);
    this.getWishCustomerId(LoginEmailId).pipe(
      map((result:any[]) => {
        let productIds: any[]=[]
        console.log(result);
        result.forEach(itemdata=>productIds.push(itemdata.id))
       return productIds;
      })
       
    )
  }
}
