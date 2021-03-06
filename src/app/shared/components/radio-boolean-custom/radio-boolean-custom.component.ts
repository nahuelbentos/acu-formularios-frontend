import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataRadioButtonBoolean } from '../../../models/classes/data-radiobutton-boolean.model';

@Component({
  selector: 'app-radio-boolean-custom',
  templateUrl: './radio-boolean-custom.component.html',
  styleUrls: ['./radio-boolean-custom.component.scss']
})
export class RadioBooleanCustomComponent implements OnInit {

  @Input() data: DataRadioButtonBoolean[];
  @Input() title: string;
  @Input() showDescription: boolean = true;
  @Input() titleRight: string;
  @Input() titleWrong: string;
  @Input() required: boolean;

  @Output() getData: EventEmitter<DataRadioButtonBoolean[] | DataRadioButtonBoolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateData = ( value: boolean )  =>  (this.getData.emit(  this.data.length > 1 ? this.data : { ...this.data[0], value } ));


}
