import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { AccountService } from 'src/app/services/AccountService';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { RegisterUserModel } from 'src/app/models/RegisterUserModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AccountService]
})
export class RegistrationComponent extends BaseView implements OnInit {

  constructor(private service: AccountService) {
    super();
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

    // there is should be validation!!!

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
          response => { console.log(response); },
          error => { console.log(error); }
      )
    );
  }

  ngOnInit() {
  }

}
