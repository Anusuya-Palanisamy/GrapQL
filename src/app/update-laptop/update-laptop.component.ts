import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GraphqlService } from '../apipath/graphql.service';

@Component({
  selector: 'app-update-laptop',
  templateUrl: './update-laptop.component.html',
  styleUrls: ['./update-laptop.component.css'],
})
export class UpdateLaptopComponent implements OnInit {
  formDetails: FormGroup;
  id: number;
  laptop: any;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateLaptopComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.formDetails = this.fb.group({
      price: ['', Validators.required],
    });
  }

  updatePrice() {
    console.log('name by update');
    this.graphqlService
      .updateLaptop(this.id, this.formDetails.value.price)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.laptop = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
