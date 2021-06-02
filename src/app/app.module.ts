import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

//Material Design Files
import { MyMaterialModule } from './material.module';

//Reactive Form Initilizer
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Customer
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { ListLaptopCustomerComponent } from './list-laptop-customer/list-laptop-customer.component';
import { ListLaptopGoogleComponent } from './list-laptop-google/list-laptop-google.component';

import { UpdateCustomerDetailsComponent } from './update-customer-details/update-customer-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';

import { DetailsComponent } from './details/details.component';
import { BuyLaptopComponent } from './buy-laptop/buy-laptop.component';
import { AddAddressComponent } from './add-address/add-address.component';

//Admin
import { LoginComponent } from './login/login.component';

//Laptop
import { AddLaptopComponent } from './add-laptop/add-laptop.component';
import { ListLaptopComponent } from './list-laptop/list-laptop.component';
import { UpdateLaptopComponent } from './update-laptop/update-laptop.component';
import { AddImageComponent } from './add-image/add-image.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { GraphQLModule } from './graphql.module';

//Server Path Added
import { GraphqlService } from './apipath/graphql.service';
import { RestService } from './apipath/rest.service';
import { CustomerService } from './services/Customer.service';
import { RestCartService } from './apipath/restCart.service';

import { FilterService } from './services/filterData.service';
import { ValueArrayPipe } from './exponential-strength.pipe';

import { SocialLoginModule } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

import { ShowCartComponent } from './show-cart/show-cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { RestWishlistService } from './apipath/RestWishlist.service';
import { SignInService } from './apipath/signinService.service';
import { SignInAddCustomerComponent } from './sign-in-add-customer/sign-in-add-customer.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { UpdateMobileNumberComponent } from './update-mobile-number/update-mobile-number.component';
import { AddAddressService } from './apipath/addAddress.service';
import { UpdateAddAddressComponent } from './update-add-address/update-add-address.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item/order-item.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddProductListComponent } from './add-product/add-product-list/add-product-list.component';





@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    ListCustomerComponent,
    ListLaptopCustomerComponent,
    ListLaptopGoogleComponent,
    DetailsComponent,
    BuyLaptopComponent,
    LoginComponent,
    LoginCustomerComponent,
    ListLaptopComponent,
    UpdateLaptopComponent,
    AddLaptopComponent,
    AddImageComponent,
    CartDetailsComponent,
    OrderDetailsComponent,
    UpdateCustomerDetailsComponent,
    UpdateMobileNumberComponent,
    ShowCartComponent,
    WishListComponent,
    AddAddressComponent,
    SignInAddCustomerComponent,
    ValueArrayPipe,
    UpdateAddAddressComponent,
    ProductListComponent,
    ProductItemComponent,
    OrderListComponent,
    OrderItemComponent,
    AddProductComponent,
    AddProductListComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpLinkModule,
    GraphQLModule,
    SocialLoginModule,
    RxReactiveFormsModule ,
    NgxStarRatingModule

    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '559388838491-p958jrrbm4i03otpvsv4gbqru74l4nd7.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    GraphqlService,
    CustomerService,
    RestService,
    RestCartService,
    RestWishlistService,
    FilterService,
    SignInService,
    AddAddressService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
