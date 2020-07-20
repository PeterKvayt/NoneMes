import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { AccountService } from 'src/app/services/AccountService';
import { SignInUserModel } from 'src/app/models/SignInUserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AccountService]
})
export class SignInComponent extends BaseView implements OnInit {

  constructor(
    private service: AccountService,
    public router: Router) {
    super(router);
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
        response => { this.redirect('messages'); },
        error => { console.log(error); }
      )
    );
  }
}
