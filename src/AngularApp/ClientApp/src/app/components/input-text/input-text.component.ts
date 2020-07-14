import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { InputText } from '../../component-elements/InputText';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: []
})
export class InputTextComponent implements OnInit {

  @Input() item: InputText;

  @Output() valueChange = new EventEmitter<InputText>();

  public onValueChange(value: string): void {
    this.item.value = value;
    this.valueChange.emit(this.item);
  }

  public ngOnInit(): void {
    this.item.valid = this.item.valid === undefined ? true : this.item.valid;
  }

}
