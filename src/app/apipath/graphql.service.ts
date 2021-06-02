import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { catchError, retry } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Customer, Query } from 'src/app/models/Customer';
import { Admin } from 'src/app/models/Admin';
import { Laptop } from '../models/Laptop';

const GET_Customers = gql`
  query getAllCustomer {
    getAllCustomer
  }
`;
const GET_CustomerAddAddress = gql`
  query createAddress($id: ID, $addAddress: String) {
    createAddress(id: $id, addAddress: $addAddress) {
      id
      firstName
      lastName
      emailId
      password
      mobileNumber
      gender
      addAddress
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;

const GET_LoginAdmin = gql`
  query loginAdmin($input: AdminInput) {
    loginAdmin(input: $input) {
      username
      password
    }
  }
`;
const GET_LoginCustomer = gql`
  query loginCustomer($input: CustomerLoginInput) {
    loginCustomer(input: $input) {
      emailId
      password
    }
  }
`;

const GET_LaptopList = gql`
  query getLaptopList {
    getLaptopList {
      id
      brand
      price
      processor
      memory
      screenSize
      details
      graphices
      quan
      rating
      productRating
      mobileNumber
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;

const GET_LaptopListById = gql`
  query getLaptopById($id: ID) {
    getLaptopById(id: $id) {
      id
      brand
      price
      processor
      memory
      screenSize
      details
      graphices
      quan
      rating
      mobileNumber
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;
/*const GET_Type = gql`
  query findType($type: String) {
    findType(type: $type) {
      id
      name
      emailId
      password
      type
      mobileNumber
      gender
      addAddress
      address {
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;*/
const GET_FilterInput = gql`
  query filterData($input: FilterInput) {
    filterData(input: $input) {
      id
      firstName
      lastName
      emailId
      password
      mobileNumber
      gender
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;
const GET_FilterLaptopInput = gql`
  query filterLaptop($input: FilterLaptopInput) {
    filterLaptop(input: $input) {
      brand
      price
      processor
      memory
      screenSize
      details
      graphices

    }
  }
`;
const UPDATE_Customers = gql`
  mutation updateCustomer(
    $id: ID
    $mobileNumber: String
   
    $addressDetails: String
    $city: String
    $state:String
    $pincode: Long
  ) {
    updateCustomer(
      id: $id
      mobileNumber: $mobileNumber
     
      addressDetails: $addressDetails
      city: $city
      state:$state
      pincode: $pincode
    ) {
      id
      mobileNumber
      address {
        addressDetails
        city
        pincode
      }
    }
  }
`;
const UPDATE_MobilNumber = gql`
  mutation updateMobileNumber(
    $id: ID
    $mobileNumber: String
    
  ) {
    updateMobileNumber(
      id: $id
      mobileNumber: $mobileNumber
     
    ) {
      id
      mobileNumber
      address {
        addressid
        addressDetails
        city
        pincode
      }
    }
  }
`;
const UPDATE_Address = gql`
  mutation updateAddress(
    $emailId:String
    $addressid: ID
    $addressDetails: String
    $city: String
    $state:String
    $pincode: Long
  ) {
    updateAddress(
      emailId:$emailId
      addressid: $addressid
      addressDetails: $addressDetails
      city: $city
      state:$state
      pincode: $pincode
    ) {
      id
      mobileNumber
      address {
        addressid
        addressDetails
        city
        pincode
      }
    }
  }
`;
const UPLOAD_SignInCustomers = gql`
  mutation addsignCustomer(
    $id: ID
    $gender: String
    $mobileNumber: String
    $addressDetails: String
    $city: String
    $state: String
    $pincode: Long
  ) {
    addsignCustomer(
      id: $id
      gender:$gender
      mobileNumber: $mobileNumber
      addressDetails: $addressDetails
      city: $city
      state:$state
      pincode: $pincode
    ) {
      id
      firstName
      lastName
      emailId
      password
      mobileNumber
      gender
     
      address {
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;

const UPDATE_Laptop = gql`
  mutation updateLaptop($id: ID, $price: String) {
    updateLaptop(id: $id, price: $price) {
      id
      brand
      price
      processor
      memory
      screenSize
      details
      graphices
      quan
      rating
      mobileNumber
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;

const DELETE_Customers = gql`
  mutation deleteCustomer($id: ID) {
    deleteCustomer(id: $id)
  }
`;
const CREATE_Customers = gql`
  mutation createCustomer($input: CustomerInput) {
    createCustomer(input: $input) {
      address {
        city
      }
      emailId
      id
      firstName
      lastName
    }
  }
`;
const CREATE_CustomerSignIn = gql`
  mutation createSignIn($input: CustomerSignIn) {
    createSignIn(input: $input) {
      address {
        city
      }
      emailId
      id
      firstName
    
    }
  }
`;
const CREATE_Laptops = gql`
  mutation createLaptop($input: LaptopInput) {
    createLaptop(input: $input) {
      id

      brand
      price
      processor
      memory
      screenSize
      details
      graphices
      quan
      rating
      mobileNumber
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;

const view_customer = gql`
  query findemail($emailId: String) {
    findemail(emailId: $emailId) {
      id
      firstName
      lastName
      emailId
      password
      mobileNumber
      gender
    
      address {
        addressid
        addressDetails
        city
        state
        pincode
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo, httpLink: HttpLink) {}

  getAllCustomers(): any {
    return this.apollo.watchQuery<Query>({
      query: GET_Customers,
    }).valueChanges;
  }
  addAddressCustomers(id: number, addAddress: String): any {
    return this.apollo.watchQuery<Query>({
      query: GET_CustomerAddAddress,
      variables: {
        id,
        addAddress,
      },
    }).valueChanges;
  }

  

  findCustomerData(input: Customer): any {
    console.log('GraphQL Service filterLaptop');
    return this.apollo.watchQuery<Query>({
      query: GET_FilterInput,
      variables: {
        input,
      },
    }).valueChanges;
  }

  findLaptopData(input: Customer): any {
    console.log('GraphQL Service FilterData');
    return this.apollo.watchQuery<Query>({
      query: GET_FilterLaptopInput,
      variables: {
        input,
      },
    }).valueChanges;
  }

  loginAdminData(input: Admin): any {
    console.log('GraphQL Service ');
    return this.apollo.watchQuery<Query>({
      query: GET_LoginAdmin,
      variables: {
        input,
      },
    }).valueChanges;
  }

  loginCustomerData(input: Admin): any {
    console.log('GraphQL Service ');
    return this.apollo.watchQuery<Query>({
      query: GET_LoginCustomer,
      variables: {
        input,
      },
    }).valueChanges;
  }
 
  
  getAllLaptopList(): any {
    return this.apollo.watchQuery<Query>({
      query: GET_LaptopList,
    }).valueChanges;
  }
  getLaptopListById(id: Number): any {
    return this.apollo.watchQuery<Query>({
      query: GET_LaptopListById,
      variables: {
        id,
      },
    }).valueChanges;
  }

  updateCustomer(
    id: Number,
    mobileNumber: String,
   
    addressDetails: String,
    city: String,
    state:String,
    pincode: number
  ): any {
    console.log(id);
    return this.apollo.mutate({
      mutation: UPDATE_Customers,
      variables: {
        id,
        mobileNumber,
        
        addressDetails,
        city,
        state,
        pincode,
      },
    });
  }
  updateMobileNumber(
    id: Number,
    mobileNumber: String,
   
  ): any {
    console.log(id);
    return this.apollo.mutate({
      mutation: UPDATE_MobilNumber,
      variables: {
        id,
        mobileNumber,
      },
    });
  }
  updateAddress(
    emailId:String,
    addressid: Number,
  
    addressDetails: String,
    city: String,
    state:String,
    pincode: number
  ): any {
    console.log(addressid);
    return this.apollo.mutate({
      mutation: UPDATE_Address,
      variables: {
        emailId,
        addressid,
        addressDetails,
        city,
        state,
        pincode,
      },
    });
  }
  uploadSigInCustomer(
    id: Number,
    gender:String,
    mobileNumber: String,
    addressDetails: String,
    city: String,
    state:String,
    pincode: Number
  ): any {
    console.log(id);
    return this.apollo.mutate({
      mutation: UPLOAD_SignInCustomers,
      variables: {
        id,
        gender,
        mobileNumber,
        addressDetails,
        city,
        state,
        pincode,
      },
    });
  }
  
  updateLaptop(id: Number, price: number): any {
    return this.apollo.mutate({
      mutation: UPDATE_Laptop,
      variables: {
        id,
        price,
      },
    });
  }
  deleteCustomerById(id: Number): any {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: DELETE_Customers,
        variables: {
          id,
        },
      })
      .toPromise();
  }

  createCustomers(input: Customer): any {
    console.log(input);
    return this.apollo
      .mutate({
        mutation: CREATE_Customers,
        variables: {
          input,
        },
      })
      .toPromise();
  }
  createCustomerSign(input: Customer): any {
    console.log(input);
    return this.apollo
      .mutate({
        mutation: CREATE_CustomerSignIn,
        variables: {
          input,
        },
      })
      .toPromise();
  }
  
  createLaptop(input: Laptop): any {
    console.log(input);
    return this.apollo
      .mutate({
        mutation: CREATE_Laptops,
        variables: {
          input,
        },
      })
      .toPromise();
  }

  viewCustomer(emailId: String): any {
    return this.apollo.watchQuery<Query>({
      query: view_customer,
      variables: {
        emailId,
      },
    }).valueChanges;
  }
}
