import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  //emailIdValue: String;
  emailIdValue = new Subject();
  public subscriber$ = this.emailIdValue.asObservable();

  userData(data: String) {
    this.emailIdValue.next(data);
  }

  /*emailIdValue: BehaviorSubject<String>;

  constructor() {
    this.emailIdValue = new BehaviorSubject<String>('Data ');
  }

  userData(value: String) {
    console.log('customer Service dsfs');
    this.emailIdValue.next(value);
  }
  /* setEmailIdValue(data: String) {
    this.emailIdValue = data;
    console.log(this.emailIdValue);
  }
  getEmailIdValue() {
    console.log(this.emailIdValue);
    return this.emailIdValue;
  }*/
}
