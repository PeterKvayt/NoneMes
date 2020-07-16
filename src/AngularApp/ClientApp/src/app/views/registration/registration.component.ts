import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { UserRegisterService } from 'src/app/services/UserRegisterService';
import { InputPassword } from 'src/app/componentClasses/InputPassword';

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

  public passwordInput: InputPassword = {
    label: 'Password',
    errorText: 'Invalid password.'
  };

  public repitPasswordInput: InputPassword = {
    label: 'Repit password',
    errorText: 'Not match.'
  };

  public onRegisterClick(): void {
    
  }

  ngOnInit() {
  }

}
