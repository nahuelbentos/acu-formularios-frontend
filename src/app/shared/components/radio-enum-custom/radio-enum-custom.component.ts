import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataRadioButtonEnum } from '../../../models/data-radiobutton-enum.model';


@Component({
  selector: 'app-radio-enum-custom',
  templateUrl: './radio-enum-custom.component.html',
  styleUrls: ['./radio-enum-custom.component.scss']
})
export class RadioEnumCustomComponent implements OnInit {

  @Input() data: DataRadioButtonEnum[];
  @Input() valuesEnum: number[]; //MotivoReprobacionCalle | MotivoReprobacionPista | ProgresoAlumno | ProgresoInicial | ProgresoManiobras | ResultadoExamen ;
  @Input() title: string;
  @Input() titleOptions: string[];
  @Input() required: boolean;

  @Output() getData: EventEmitter<DataRadioButtonEnum[] | DataRadioButtonEnum> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateData = ( value: number )  =>  (this.getData.emit(  this.data.length > 1 ? this.data : { ...this.data[0], value } ));

}
