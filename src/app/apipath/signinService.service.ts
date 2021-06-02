import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, LaptopDetails } from '../models/Laptop';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
 
  
  constructor(private http: HttpClient) {}

  createSiginCustomer(customer:any): Observable<any> {
    return this.http.post('/api/SignIn',customer);
  }

  getWishCustomerId(customerId: String): Observable<any> {
    return this.http.get(`/api/wishlistbycustomerid/${customerId}`);
 
}
}