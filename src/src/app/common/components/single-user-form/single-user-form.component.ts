import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegularExpressions } from '../../constants/Regex';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from 'src/services/users.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //condition true
    const isSubmitted = form && form.submitted;
    //false
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted) && control.errors);
  }
}

@Component({
  selector: 'app-single-user-form',
  templateUrl: './single-user-form.component.html',
  styleUrls: ['./single-user-form.component.css']
})
export class SingleUserFormComponent implements OnInit {
  @Input() userId: string;
  @Input() dialogRef: MatDialogRef<any>;
  @Input() updateUser: boolean;

  today: any = new Date();
  birthDate = null;
  yearsDiff = 0;

  private _user: any;
  get user(): any { return this._user; }
  @Input()
  set user(value: any) {
    this._user = value;
    if (this._user != null) {

      //patch userData from input if edit user
      this.nameFormControl.patchValue(this._user[0]['name']);
      this.usernameFormControl.patchValue(this._user[0]['username']);
      this.emailFormControl.patchValue(this._user[0]['email']);
      this.phoneFormControl.patchValue(this._user[0]['phone']);
      this.websiteFormControl.patchValue(this._user[0]['website']);
      // this.ageFormControl.patchValue(this._user[0]['age']);
      // this.dateOfBirthFormControl.patchValue(this._user[0]['dateOfBirth']);
      this.cityFormControl.patchValue(this._user[0]['address']['city']);
      this.zipcodeFormControl.patchValue(this._user[0]['address']['zipcode']);
      this.streetFormControl.patchValue(this._user[0]['address']['street']);
      this.suiteFormControl.patchValue(this._user[0]['address']['suite']);
      this.companyFormControl.patchValue(this._user[0]['company']['name']);
      this.catchPhraseFormControl.patchValue(this._user[0]['company']['catchPhrase']);
    }
  }

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3), 
    Validators.maxLength(70),
    Validators.pattern(RegularExpressions.textOnly)   
    ]);
   usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3), 
    Validators.maxLength(50)  
    ]);
    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(RegularExpressions.email)
    ]);
    phoneFormControl = new FormControl('', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(30),
    ]);
    websiteFormControl = new FormControl('', [
      Validators.required, 
      Validators.maxLength(60),
      Validators.pattern(RegularExpressions.website)
    ]); 
    ageFormControl = new FormControl('', [
      Validators.min(18), 
      Validators.max(118), 
      Validators.pattern(RegularExpressions.numbersOnly)
    ]); 
    dateOfBirthFormControl = new FormControl(''); 
    cityFormControl = new FormControl('', [
      Validators.required
    ]);
    zipcodeFormControl = new FormControl('', [
      Validators.required
    ]);
    streetFormControl = new FormControl('', [
      Validators.required
    ]);
    suiteFormControl = new FormControl('', [
      Validators.required
    ]);
    companyFormControl = new FormControl('', [
      Validators.required
    ]);
    catchPhraseFormControl = new FormControl('', [
      Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

    userForm = this.formBuilder.group({
      name: this.nameFormControl.value,
      username: this.usernameFormControl.value,
      email: this.emailFormControl.value,
      age: this.ageFormControl.value,
      birthDate: this.dateOfBirthFormControl.value,
      phone: this.phoneFormControl.value,
      address: {
        city: this.cityFormControl.value,
        zipcode: this.zipcodeFormControl.value,
        street: this.streetFormControl.value,
        suite: this.suiteFormControl.value,
      },
      company: {
        name: this.companyFormControl.value,
        catchPhrase: this.catchPhraseFormControl.value
      }
    })

  onDateChange() {
    if (this.birthDate) {
      this.yearsDiff = this.today.getFullYear() - new Date(this.birthDate).getFullYear();

      if (Number(this.ageFormControl?.value) !== this.yearsDiff) {
        // console.log('INVALID date!!!!!!');
        // console.log('It is should be --> ', this.today.getFullYear() - Number(this.ageFormControl?.value));
        this.dateOfBirthFormControl.setErrors({ 'incorrect': true });
      }
    }
  }

  onSubmitUser() {
    const userData = {
      ...this.userForm.value
    };

    if (this.user?.id) {
      // update User
      this.usersService.updateUserData(this._user[0]['id'].toString(), userData)
      // .subscribe(response => {
      //   // User Saved!
      // }, (error: HttpErrorResponse) => {
      //   // User Save Failed!
      //   console.log(error.error);
      // });

      this.onCloseDialog();
      window.location.reload();
    } else {
      // add new User
      this.usersService.addUserInUsers(userData)
      // .subscribe(response => {
      //   // User Added!
      // }, (error: HttpErrorResponse) => {
      //   // User add Failed!
      //   console.log(error.error);
      // });

      this.onCloseDialog();
      window.location.reload();
    }
  }

}

