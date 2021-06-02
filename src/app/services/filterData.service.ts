import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {
  // private subject = new Subject<any>();

  customerType: Subject<String>;

  constructor() {
    this.customerType = new Subject<String>();
  }

  filterValue(type: String) {
    console.log('Filter Service Called');
    this.customerType.next(type);
  }
}
