import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputPassword } from 'src/app/componentClasses/InputPassword';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent implements OnInit {

  @Input() item: InputPassword;

  @Output() valueChange = new EventEmitter<InputPassword>();

  public onValueChange(value: string): void {
    this.item.value = value;
    this.valueChange.emit(this.item);
  }

  public ngOnInit(): void {
    this.item.valid = this.item.valid === undefined ? true : this.item.valid;
  }

}
