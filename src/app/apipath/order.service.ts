import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, LaptopDetails } from '../models/Laptop';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // private baseUrl = 'http://localhost:8080/api/v1/cart';

  newItems: Array<LaptopDetails> = [];

  constructor(private http: HttpClient) {}

  createOrder(order: Object): Observable<any> {
    return this.http.post('/api/createOrder', order);
  }

  getOrderByCustomerId(customerId: String): Observable<any> {
    return this.http.get(`/api/Orderbycustomerid/${customerId}`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get('/api/Orders');
  }

  /* Rating */

  createRating(rat: Object): Observable<any> {
    return this.http.post('/api/rating', rat);
  }

  getRatingByCustomerId(customerId: String): Observable<any> {
    return this.http.get(`/api/ratingCustomerId/${customerId}`);
  }

  
}
