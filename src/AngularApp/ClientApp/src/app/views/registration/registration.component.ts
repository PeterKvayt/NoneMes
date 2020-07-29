import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { AccountService } from 'src/app/services/AccountService';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { RegisterUserModel } from 'src/app/models/RegisterUserModel';
import { Router } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/services/AuthenticationGuardService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AccountService]
})
export class RegistrationComponent extends BaseView implements OnInit {

  constructor(
    private service: AccountService,
    public router: Router,
    private authService: AuthenticationGuardService) {
    super(router);
  }

  public emailInput: InputText = {
    label: 'Email',
    errorText: 'Invalid email.'
  };

  public firstNameInput: InputText = {
    label: 'Name',
    errorText: 'Invalid name.'
  };

  public lastNameInput: InputText = {
    label: 'Last name',
    errorText: 'Invalid last name.'
  };

  public patronymicInput: InputText = {
    label: 'Patronymic',
    errorText: 'Invalid patronymic.'
  };

  public passwordInput: InputPassword = {
    label: 'Password',
    errorText: 'Invalid password.'
  };

  public confirmPasswordInput: InputPassword = {
    label: 'Repit password',
    errorText: 'Not match.'
  };

  public onRegisterClick(): void {

    if (this.validateRegisterUserModel()) {
      const user: RegisterUserModel = {
        email: this.emailInput.value,
        firstName: this.firstNameInput.value,
        lastName: this.lastNameInput.value,
        patronymic: this.patronymicInput.value === undefined ? '' : this.patronymicInput.value,
        password: this.passwordInput.value,
        passwordConfirm: this.confirmPasswordInput.value
      };

      this.subscriptions.add(
        this.service.register(user)
          .subscribe(
            () => { this.redirect(''); },
            error => { console.log(error); }
        )
      );
    }
  }

  private validateRegisterUserModel(): boolean {
    if (!this.emailInput.value) {
      this.emailInput.valid = false;
      return false;
    } else {
      this.emailInput.valid = true;
    }

    if (!this.firstNameInput.value) {
      this.firstNameInput.valid = false;
      return false;
    } else {
      this.firstNameInput.valid = true;
    }

    if (!this.lastNameInput.value) {
      this.lastNameInput.valid = false;
      return false;
    } else {
      this.lastNameInput.valid = true;
    }

    if (this.passwordInput.value !== undefined && this.passwordInput.value.length >= 6) {
      this.passwordInput.valid = true;
    } else {
      this.passwordInput.valid = false;
      return false;
    }

    if (this.confirmPasswordInput.value !== undefined && this.confirmPasswordInput.value === this.passwordInput.value) {
      this.confirmPasswordInput.valid = true;
    } else {
      this.confirmPasswordInput.valid = false;
      return false;
    }

    return true;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
    this.redirect('messages');
    }
  }

}
