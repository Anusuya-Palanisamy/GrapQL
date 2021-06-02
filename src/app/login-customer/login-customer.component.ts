import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../models/Customer';
import { Router } from '@angular/router';
import { GraphqlService } from '../apipath/graphql.service';
import { CustomerService } from '../services/Customer.service';
import { ListLaptopCustomerComponent } from '../list-laptop-customer/list-laptop-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SignInService } from '../apipath/signinService.service';
import { SignInAddCustomerComponent } from '../sign-in-add-customer/sign-in-add-customer.component';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css'],
})
export class LoginCustomerComponent implements OnInit {
  submitted: false;
  formCustomerLogin: FormGroup;
  i: number;
  admin: Customer[];
  emailIdValue: String;
  user: SocialUser;
  name:String;
  emailId: string;
  city: string;
  id: any;
  correct=false;
  wrong=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private graphqlService: GraphqlService,
    private customerService: CustomerService,
    private auth: SocialAuthService, 
   
    private signInService:SignInService
  ) {}

  ngOnInit() {
    this.formCustomerLogin = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  loginCustomer(emailId: String) {
    console.log(this.formCustomerLogin.value);

    localStorage.setItem('CustomerName', this.formCustomerLogin.value.emailId);

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);

    this.emailIdValue = this.formCustomerLogin.value.emailId;
    console.log(this.formCustomerLogin.value.emailId);
    console.log(this.emailIdValue);
    // console.log(this.customerService.setEmailIdValue(this.emailIdValue));

    this.graphqlService
      .loginCustomerData(this.formCustomerLogin.value)
      .subscribe((result: any) => {
        console.log(result);
        this.admin = result.data['loginCustomer'];
        console.log(this.admin.length);
        if (this.admin.length != 0) {
          console.log('Login Successfully!');
          this.correct=true;
         // alert('Login Successfully!!!');
          // console.log({ emailId });
          this.router.navigate(['/product']);
        } else {
          console.log('Login Failed!');
        //  alert('Incorrect Username and Password!!!');
        this.wrong=true;
          this.router.navigate(['/customer-login']);
        }
      });
  }
  SignIn(platform: string): any {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.auth.signIn(platform).then((response) => {
      console.log("Login Entered");
      console.log(platform );
      console.log("Login response Details:");
      console.log(response ); 
      this.name=response.name; 
      this.emailId=response.email;
      this.city=response.lastName;
      console.log(this.name);
      this.user = response;
      var cartData = {
        emailId: this.emailId,
        firstName: this.name,
       address:{}

      };
      this.signInService.createSiginCustomer(cartData).subscribe(
        (result) => {
          console.log(result);
          console.log("Id Got It");
          console.log(result.id);
          this.id=result.id;
          sessionStorage.setItem('signInId',  result.id);

          var signInId = sessionStorage.signInId;
          console.log(signInId);
          localStorage.setItem('CustomerName',  this.emailId);

          var LoginEmailId = localStorage.CustomerName;
          console.log('emailId: ' + LoginEmailId);
          this.router.navigate(['/product']);
      /*const dialogRef = this.dialog.open(SignInAddCustomerComponent, {
        height: '590px',
        width: '450px',
        
      
      })*/
        }, (error: any) => console.log(error)
        );
        
      
    });
     
   
  }
  
  
}
