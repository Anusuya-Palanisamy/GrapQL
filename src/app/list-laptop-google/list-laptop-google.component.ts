import { Component, OnInit } from '@angular/core';
import { Laptop } from '../models/Laptop';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyLaptopComponent } from '../buy-laptop/buy-laptop.component';

@Component({
  selector: 'app-list-laptop-google',
  templateUrl: './list-laptop-google.component.html',
  styleUrls: ['./list-laptop-google.component.css'],
})
export class ListLaptopGoogleComponent implements OnInit {
  laptopList: any[];
  laptop: any[];
  formData: any;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private auth: SocialAuthService,
    private router: Router,
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    public dialog: MatDialog
  ) {
    console.log('services called');
    this.graphqlService.getAllLaptopList().subscribe((result: any) => {
      console.log(result);
      this.laptop = result.data;

      this.laptop = result.data['getLaptopList'];
      console.log(this.laptop);
      this.laptopList = this.chunkArray(this.laptop, 3);
      console.log(this.laptopList);
    });
  }

  ngOnInit(): void {
    this.formData = this.fb.group({
      brand: [''],
      processor: [''],
      memory: [''],
      screenSize: [''],
      graphices: [''],
    });
    this.auth.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  filterDataLaptop() {
    this.graphqlService
      .findLaptopData(this.formData.value)
      .subscribe((result: any) => {
        console.log(result);

        this.laptop = result.data['filterLaptop'];
      });
  }

  buyLaptop(laptop: Laptop) {
    alert('Please Register your Details...');
    this.auth.signOut();
    console.log('Gmail SignOut successfully');
    this.router.navigate(['/add-customer']);
  }
  signOut(): any {
    this.auth.signOut();
    console.log('Gmail SignOut successfully');
    this.router.navigate(['/add-customer']);
  }

  chunkArray(myArray: any[], chunk_size: number): any[] {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      this.laptopList = myArray.slice(index, index + chunk_size);
      tempArray.push(this.laptopList);
    }
    return tempArray;
  }
}
