import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { UserRegisterService } from 'src/app/services/UserRegisterService';
import { InputPassword } from 'src/app/componentClasses/InputPassword';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserRegisterService]
})
export class RegistrationComponent extends BaseView implements OnInit {

  constructor(private service: UserRegisterService) {
    super();
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

    // there is should be validation!!!

    const user: User = {
      email: this.emailInput.value,
      password: this.passwordInput.value
    };

    this.subscriptions.add(
      this.service.register(user)
      //   .subscribe(
      //     response => {},
      //     error => {console.log(error)}
      // )
    );
  }

  ngOnInit() {
  }

}
