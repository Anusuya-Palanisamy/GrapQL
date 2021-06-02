import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, LaptopDetails } from '../models/Laptop';

@Injectable({
  providedIn: 'root',
})
export class RestCartService {
  // private baseUrl = 'http://localhost:8080/api/v1/cart';

  newItems: Array<LaptopDetails> = [];
  headers: HttpHeaders;
  //private apiUrl = '/api/';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'my-auth-Token',
    });
  }

  createCart(cart: Object): Observable<any> {
    return this.http.post('/api/create', cart);
  }

  getCartCustomerId(customerId: String): Observable<any> {
    console.log('Entered cart Service for cart Display');
    return this.http.get(`/api/cartCustomerId/${customerId}`);
  }
deleteCustomerCartData(customerId: String,id:Number): Observable<any> {
  console.log('Entered cart Service for cart Display');
  return this.http.delete(`/api/cart/deleteData/${customerId}/${id}`,{ responseType: 'text' });
}
  getAllCarts(): Observable<any> {
    return this.http.get('/api/carts');
  }
  
  getmailId(emailId:String):Observable<any>{
    console.log('emailID value');
    return this.http.get(`/api/getEmailId/${emailId}`);
    
  }
}
