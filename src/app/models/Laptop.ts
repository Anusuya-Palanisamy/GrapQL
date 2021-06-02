import { Binary } from '@angular/compiler';

export type Laptop = {
  id: number;
  brand: String;
  Laptop: Binary;
  processor: String;
  price: number;
  memory: String;
  screenSize: String;
  graphices: String;
  details: String;
  quan: number;
};
export type Query = {
  getLaptopList: Laptop[];
};

export class LaptopDetails {
  id: number;
  brand: String;
  Laptop: Binary;
  processor: String;
  price: number;
  memory: String;
  screenSize: String;
  graphices: String;
  details: String;
  quan: number;
}
