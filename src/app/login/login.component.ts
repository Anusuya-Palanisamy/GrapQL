import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GraphqlService } from '../apipath/graphql.service';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: false;
  formLogin: FormGroup;
  i: number;
  data: Admin;
  admin: Admin[];
  correct=false;
  wrong=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private graphqlService: GraphqlService
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(this.formLogin.value);
    console.log(
      localStorage.setItem('username', this.formLogin.value.username)
    );
    this.graphqlService
      .loginAdminData(this.formLogin.value)
      .subscribe((result: any) => {
        console.log(result);
        this.admin = result.data['loginAdmin'];
        console.log(this.admin.length);
        if (this.admin.length != 0) {
          console.log('Login Successfully!');
          alert('Login Successfully!!!');
          this.correct=true;
          this.router.navigate(['/view-laptop']);
        } else {
          console.log('Login Failed!');
          alert('Incorrect Username and Password!!!');
          this.wrong=true;
          this.router.navigate(['/admin-login']);
        }
      });
    this.formLogin.reset();
  }
}
