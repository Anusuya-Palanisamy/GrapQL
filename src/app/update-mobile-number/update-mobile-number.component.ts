import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GraphqlService } from '../apipath/graphql.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-update-mobile-number',
  templateUrl: './update-mobile-number.component.html',
  styleUrls: ['./update-mobile-number.component.css']
})
export class UpdateMobileNumberComponent implements OnInit {
  dataSource = new MatTableDataSource();
  router: any;
  customer:  any[];
  action: string;
  local_data: any;
  user: any;
  name: String;
  id: number;
  correct=false;
  wrong=false;
  localValue: string | null;
  formNumber: FormGroup;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateMobileNumberComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    this.id = data.id;
     localStorage.getItem('CustomerName');
    this.localValue = localStorage.getItem('CustomerName');
    const LoginEmailId = localStorage.CustomerName;
    console.log('emailId: ' + LoginEmailId);
    console.log('services called');
  
}

  ngOnInit() {
    this.formNumber = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
     
    });
  }
  _keynumPress(event: any) {
    const pattern = /[+0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
  }

  updateMobileNum(){
    console.log('name by update');
    this.graphqlService
      .updateMobileNumber(
        this.id,
        this.formNumber.value.mobileNumber
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.user = data;
          this.correct=true;
        },
        (error: any) => {
          console.log(error);
          this.wrong=true;
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
