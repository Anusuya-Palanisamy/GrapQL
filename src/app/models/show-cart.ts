import { LaptopDetails } from './Laptop';

export class ShowCart {
  public cartId: string;
  public customerId: String;
  public items: LaptopDetails[] = new Array<LaptopDetails>();
  public valorTotal: number;
}
