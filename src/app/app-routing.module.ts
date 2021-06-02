import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { ListLaptopComponent } from './list-laptop/list-laptop.component';
import { UpdateLaptopComponent } from './update-laptop/update-laptop.component';
import { AddLaptopComponent } from './add-laptop/add-laptop.component';
import { AddImageComponent } from './add-image/add-image.component';

import { CartDetailsComponent } from './cart-details/cart-details.component';
import { ShowCartComponent } from './show-cart/show-cart.component';

import { OrderDetailsComponent } from './order-details/order-details.component';

import { ListLaptopCustomerComponent } from './list-laptop-customer/list-laptop-customer.component';
import { ListLaptopGoogleComponent } from './list-laptop-google/list-laptop-google.component';

import { BuyLaptopComponent } from './buy-laptop/buy-laptop.component';
import { UpdateCustomerDetailsComponent } from './update-customer-details/update-customer-details.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { SignInAddCustomerComponent } from './sign-in-add-customer/sign-in-add-customer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer-login', pathMatch: 'full' },

  { path: 'admin-login', component: LoginComponent },
  { path: 'customer-login', component: LoginCustomerComponent },

  { path: 'view-customer', component: ListCustomerComponent },
  { path: 'view-laptop', component: ListLaptopComponent },
  { path: 'view-laptop-customer', component: ListLaptopCustomerComponent },
  { path: 'view-laptop-gmail', component: ListLaptopGoogleComponent },
  { path: 'add-image', component: AddImageComponent },

  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-laptop', component: AddLaptopComponent },

  {path: 'admin-add-Product', component: AddProductComponent },

  { path: 'details', component: DetailsComponent },

  {
    path: '',
    children: [
      {
        path: 'product',
        component: ProductListComponent,
      },
      {
        path: 'buy-laptop',
        children: [
          {
            path: '',
            component: BuyLaptopComponent,
          },
        ]
      }
    ]
  },
  

  { path: 'update-laptop', component: UpdateLaptopComponent },
  
  

  { path: 'cart-Details', component: CartDetailsComponent },
  { path: 'carts', component: ShowCartComponent },
  { path: 'myWishList', component: WishListComponent },

  { path: 'order-Details', component: OrderDetailsComponent },
  { path: 'order', component: OrderListComponent },
  

  {
    path: 'update-customer-Details',
    component: UpdateCustomerDetailsComponent,
  },
  {
    path: 'add-SignIn-Google-Details',
    component: SignInAddCustomerComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
