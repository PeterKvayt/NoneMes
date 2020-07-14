import { Component, OnInit } from '@angular/core';
import { InputText } from 'src/app/component-elements/InputText';

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

  public passwordInput: InputText = {
    label: 'Password',
    errorText: 'Invalid password.'
  };

  public ngOnInit(): void {

  }
}
