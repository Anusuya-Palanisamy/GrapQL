import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  city: String;
  state: String;
  country: String;

  constructor() {}
}
