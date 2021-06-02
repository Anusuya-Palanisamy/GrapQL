import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from './apipath/signinService.service';
import { GraphqlService } from './apipath/graphql.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInAddCustomerComponent } from './sign-in-add-customer/sign-in-add-customer.component';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'customer-FrontApp';
  user: SocialUser;
  name:String;
  emailId: string;
  localValue: string | null;
  correct=false;

  constructor(
    private route: ActivatedRoute,
    private auth: SocialAuthService, private router: Router,
    private graphqlService:GraphqlService, public dialog: MatDialog,
    private signInService:SignInService) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
    this.localValue = localStorage.getItem('CustomerName');

    var LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
  }

  


 /* SignIn(platform: string): any {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.auth.signIn(platform).then((response) => {
      console.log("Login Entered");
      console.log(platform );
      console.log("Login response Details:");
      console.log(response ); 
      this.name=response.name; 
      this.emailId=response.email;
      console.log(this.name);
      this.user = response;
      var cartData = {
        emailId: this.emailId,
        name: this.name,
      };
      this.signInService.createSiginCustomer(cartData).subscribe(
        (result) => {
          console.log(result);
          console.log("Id Got It");
          console.log(result.id);
          localStorage.setItem('CustomerName',  this.emailId);

          var LoginEmailId = localStorage.CustomerName;
          console.log('emailId: ' + LoginEmailId);
          this.router.navigate(['/product']);
      const dialogRef = this.dialog.open(SignInAddCustomerComponent, {
        height: '300px',
        width: '350px',
        data: result.id ,
      })
        }, (error: any) => console.log(error)
        );
        
      
    });
     
   
  }*/
  
  reload(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./customer-login'], { relativeTo: this.route });
  
}

  SignOut(): void {
    localStorage.removeItem('username');
    this.auth.signOut();
    console.log(localStorage.removeItem('username'));
    alert("Signout the Session Successfully!");
    localStorage.clear();
    this.reload();
    this.correct=true;
    //this.router.navigate(['/customer-login']);
    console.log('Signout');
  
    
  }

  homepage() {
    this.router.navigate(['/product']);
  }
  accountDetails() {
    this.router.navigate(['/update-customer-Details']);
   // console.log(this.laptopList);
  }
  myCart() {
    this.router.navigate(['/cart-Details']);
  }

  orders() {
    this.router.navigate(['/order']);
  }
  showWishList() {
    this.router.navigate(['/myWishList']);
  }
}
