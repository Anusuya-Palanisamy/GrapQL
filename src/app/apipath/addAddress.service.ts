import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AddAddressService {
 

  //newItems: Array<LaptopDetails> = [];

  constructor(private http: HttpClient) {}

  createAddress(AddAddress: Object): Observable<any> {
    return this.http.post('/api/createAddAddress', AddAddress);
  }

  getAddressByCustomerId(customerId: String): Observable<any> {
    return this.http.get(`/api/address/${customerId}`);
  }

  deleteCustomerAddAddressData(customerId: String,id:Number): Observable<any> {
    console.log('Entered cart Service for cart Display');
    return this.http.delete(`/api/addAddress/deleteAddress/${customerId}/${id}`,{ responseType: 'text' });
  }
  
}