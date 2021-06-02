import { Customer } from './Customer';
import { Laptop } from './Laptop';

export class Cart {
  public id: string;
  public customerId: Customer['emailId'];
  public items: Laptop[] = new Array<Laptop>();
  public laptop: Laptop;
}

