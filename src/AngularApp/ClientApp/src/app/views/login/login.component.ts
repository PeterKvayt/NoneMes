import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { AccountService } from 'src/app/services/AccountService';
import { SignInUserModel } from 'src/app/models/SignInUserModel';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService]
})
export class LoginComponent extends BaseView implements OnInit {

  constructor(private service: AccountService) {
    super();
  }

  public loginInput: InputText = {
    label: 'Login',
    errorText: 'Invalid login.'
  };

  public passwordInput: InputPassword = {
    label: 'Password',
    errorText: 'Invalid password.'
  };

  public rememberMe: boolean;

  public ngOnInit(): void {
    this.rememberMe = false;
  }

  public onSignInClick(): void {

    // There is shoul be validation

    const user: SignInUserModel = {
      email: this.loginInput.value,
      password: this.passwordInput.value,
      rememberMe: this.rememberMe
    };

    this.subscriptions.add(
      this.service.signIn(user).subscribe(
        response => { console.log(response); },
        error => { console.log(error); }
      )
    );
  }
}
