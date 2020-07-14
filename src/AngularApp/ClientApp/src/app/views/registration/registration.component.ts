import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/component-elements/InputText';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

  ngOnInit() {
  }

}
