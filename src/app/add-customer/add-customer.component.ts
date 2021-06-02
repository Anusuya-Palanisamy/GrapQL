import { Component, OnInit } from '@angular/core';

//Reactive Forms
import {
  Validators,
  FormGroup,
  FormBuilder,
  EmailValidator,
} from '@angular/forms';
import { Customer } from '../models/Customer';
import { GraphqlService } from '../apipath/graphql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../apipath/rest.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SignInService } from '../apipath/signinService.service';
import { SignInAddCustomerComponent } from '../sign-in-add-customer/sign-in-add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { RestCartService } from '../apipath/restCart.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  name: string;
  emailId: string;
  city: string;
  user: any;
  id: number;
  correct=false;
  customer: any;
  email: String[];
  emailData: any;
 
  invalidData=true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private graphqlService: GraphqlService,
    private auth: SocialAuthService, 
    public dialog: MatDialog,
    private signInService:SignInService,
   private restCartService:RestCartService
  ) {
   
  }



  ngOnInit(): void {
   
    
    this.submitted = false;
    this.form = this.fb.group({
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
     
      gender: [''],
      address: this.fb.group({
        addressDetails: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      }),
    });
    this.graphqlService.getAllCustomers().subscribe((result: any) => {
      console.log("Console Entered");
      this.email = result.data['getAllCustomer'];
      console.log(result);
      console.log(this.email );
    });
   
  }
  _keynumPress(event: any) {
    const pattern = /[+0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
  }
  _keystrPress(event: any) {
    const pattern = /[a-zA-z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
  }
  emailAlredyExist = "";
  emailCheckUnique() {
   /*console.log(this.email);
   console.log(this.form.value.emailId);
   for(let i=0;this.email.length>i;i++){
   console.log(this.email[i]);
   }*/
      for(let i=0;this.email.length>i;i++){
     
    if (this.form.value.emailId==this.email[i]) {
      this.invalidData=false;
      this.emailAlredyExist = "Email Alredy Exist";
    }
    else{
      this.emailAlredyExist = "";
    }
  }
  /*this.restCartService.getmailId(this.form.value.emailId).subscribe(res => {
    this.emailData = res;
    if (this.emailData.length > 0) {
      this.emailAlredyExist = "Email Alredy Exist";
    }
    else{
      this.emailAlredyExist = "";
    }
  });*/
 
  }

 


  addCustomer() {
    this.graphqlService
      .createCustomers(this.form.value)
      .then((data: any) => {
        //alert('Customer created successfully.');
        console.log(data);
        this.correct=true;
      })
      .catch((error: any) => {
        console.log(JSON.stringify(error));
      });
    this.form.reset();
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
         /* const dialogRef = this.dialog.open(SignInAddCustomerComponent, {
            height: '590px',
            width: '450px',
          }) */ 
        },
         (error: any) => console.log(error)
        );
        
      
    });
  }

}
