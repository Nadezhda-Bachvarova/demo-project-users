import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegularExpressions } from '../common/constants/Regex';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage='';
  isNotRobotChecked: boolean = false;
  
  userData: { username: string, password: string } = {
    username: "",
    password: ""
  };

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern(RegularExpressions.username)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSelectCheckboxOption(event: any): void {
    this.isNotRobotChecked = Boolean(event['target']['checked']);
  }

  onSubmitLoginUser() {
    this.userData.username = this.username.value;
    this.userData.password = this.password.value;
    localStorage.setItem("userData", JSON.stringify(this.userData));
    this.router.navigate(["/"]);
  }

}
