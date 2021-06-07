import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataRadioButton } from '../../../models/classes/data-radiobutton.model';

@Component({
  selector: 'app-radio-group-custom',
  templateUrl: './radio-group-custom.component.html',
  styleUrls: ['./radio-group-custom.component.scss']
})
export class RadioGroupCustomComponent implements OnInit {

  itemSelected: DataRadioButton;

  @Input() data: DataRadioButton[];
  @Input() title: string;
  @Input() required: boolean;

  @Output() getItemSelected: EventEmitter<DataRadioButton> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateItemSelected = (item: DataRadioButton )  => this.getItemSelected.emit( item );
}
