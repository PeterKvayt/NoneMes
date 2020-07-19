import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { AccountService } from 'src/app/services/AccountService';
import { SignInUserModel } from 'src/app/models/SignInUserModel';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AccountService]
})
export class SignInComponent extends BaseView implements OnInit {

  constructor(private service: AccountService) {
    super();
  }

  public signInInput: InputText = {
    label: 'Email',
    errorText: 'Invalid email.'
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

    // There is should be validation

    const user: SignInUserModel = {
      email: this.signInInput.value,
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
