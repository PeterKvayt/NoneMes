import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/componentClasses/InputText';
import { InputPassword } from 'src/app/componentClasses/InputPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginInput: InputText = {
    label: 'Login',
    errorText: 'Invalid login.'
  };

  public passwordInput: InputPassword = {
    label: 'Password',
    errorText: 'Invalid password.'
  };

  public ngOnInit(): void {

  }
}
