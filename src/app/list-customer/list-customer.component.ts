import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';

import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { DetailsComponent } from '../details/details.component';
import { Customer } from '../models/Customer';
import { GraphqlService } from '../apipath/graphql.service';
//import { FindComponent } from '../find/find.component';
import { FilterService } from '../services/filterData.service';
import { FormBuilder } from '@angular/forms';
import { AddLaptopComponent } from '../add-laptop/add-laptop.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  customer: Customer[];
  displayedColumns: string[] = [
    'sno',
    'id',
    'name',
    'email',
    'mobileNumber',
    'gender',
    'Address'
  ];
  dataSource = new MatTableDataSource<Customer>();
  filter: string;
  //customerType:String;
  showFiller = false;

  
  gender: 'Male' | 'Female' | 'Others' = 'Female';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user: any;
  name: String;
  deleteMessage = false;
  filterData: String;
  formData: any;
  localValue: string | null;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    public dialog: MatDialog,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.formData = this.fb.group({
      gender: [''],
      address: this.fb.group({
        state: [''],
      }),
    });
    this.localValue = localStorage.getItem('username');
    console.log(this.localValue);
  }

  ngAfterViewInit() {
    console.log('services called');
    this.graphqlService.getAllCustomers().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result.data['getAllCustomer'];
      console.log(this.dataSource.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(user: Customer): void {
    var Text;
    if (confirm('Press a button!')) {
      Text = 'You pressed OK!';
      this.graphqlService.deleteCustomerById(user.id).then(
        (data: any) => {
          console.log(data);
          this.deleteMessage = true;
        },
        (error: any) => console.log(error)
      );
    } else {
      Text = 'You pressed Cancel!';
    }
  }

  update(id: number) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      height: '300px',
      width: '350px',
      data: { id },
    });
    console.log({ id });
  }

  filterDataValue() {
    this.graphqlService
      .findCustomerData(this.formData.value)
      .subscribe((result: any) => {
        console.log(result);

        this.dataSource.data = result.data['filterData'];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    console.log(this.dataSource.filter);
  }

  laptoplist() {
    this.router.navigate(['/view-laptop']);
  }
  customerlist() {
    this.router.navigate(['/view-customer']);
  }
  addLaptop() {
    const dialogRef = this.dialog.open(AddLaptopComponent, {
      height: '570px',
      width: '390px',
    });
  }

}
