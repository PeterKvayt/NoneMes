import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { AccountService } from 'src/app/services/AccountService';
import { SignInUserModel } from 'src/app/models/SignInUserModel';
import { Router } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/services/AuthenticationGuardService';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AccountService]
})
export class SignInComponent extends BaseView implements OnInit {

  constructor(
    private service: AccountService,
    public router: Router,
    private authService: AuthenticationGuardService) {
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

  public rememberMe = false;

  public ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.redirect('messages');
    }
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
        (response: string) => {
          sessionStorage.setItem('authToken', response);
          this.redirect('messages'); },
        error => { console.log(error); }
      )
    );
  }
}
