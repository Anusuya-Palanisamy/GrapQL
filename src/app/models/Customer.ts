import { Address } from './Address';

export type Customer = {
  id: number;
  firstName:String;
   lastName:String;
  emailId: String;
  password: String;
  address: [Address];
  addAddress: String;
};

export type Query = {
  getAllCustomer: Customer[];
};
