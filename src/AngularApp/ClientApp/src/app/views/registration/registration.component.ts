import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/component-elements/InputText';
import { UserRegisterService } from 'src/app/services/UserRegisterService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserRegisterService]
})
export class RegistrationComponent implements OnInit {

  constructor(service: UserRegisterService) {

  }

  public emailInput: InputText = {
    label: 'Email',
    errorText: 'Invalid email.'
  };

  public loginInput: InputText = {
    label: 'Login',
    errorText: 'Invalid login.'
  };

  public passwordInput: InputText = {
    label: 'Password',
    errorText: 'Invalid password.'
  };

  public repitPasswordInput: InputText = {
    label: 'Repit password',
    errorText: 'Not match.'
  };

  public onRegisterClick(): void {
    console.log(this.emailInput.value);
    console.log(this.loginInput.value);
    console.log(this.passwordInput.value);
    console.log(this.repitPasswordInput.value);
  }

  ngOnInit() {
  }

}
