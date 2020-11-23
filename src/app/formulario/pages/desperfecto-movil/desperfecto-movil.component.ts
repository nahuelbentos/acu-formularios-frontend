import { Component, OnInit } from '@angular/core';
import { DataRadioButton } from 'src/app/models/data-radiobutton.model';
import { errorMensaje } from 'src/app/utils/sweet-alert';
import { FormularioService } from '../../../services/formulario.service';

@Component({
  selector: 'app-desperfecto-movil',
  templateUrl: './desperfecto-movil.component.html',
  styleUrls: ['./desperfecto-movil.component.scss']
})
export class DesperfectoMovilComponent implements OnInit {


  moviles: DataRadioButton[] = [
    { key: 235, description: '235' },
    { key: 236, description: '236' },
    { key: 237, description: '237' },
    { key: 238, description: '238' },
    { key: 239, description: '239' },
    { key: 240, description: '240' },
    { key: 241, description: '241' },
    { key: 242, description: '242' },
  ];

  instructores: DataRadioButton[] = [
    { key: 'AR', description: 'Adrián Rodríguez' },
    { key: 'AM', description: 'Adrián Machín' },
    { key: 'GA', description: 'Gonzalo Andreatta' },
    { key: 'JN', description: 'José Noble' },
    { key: 'JM', description: 'Jorge Martínez' },
  ];


  movilSelected: DataRadioButton = null;
  instructorSelected: DataRadioButton = null;

  getMovilSelected = (movil: DataRadioButton)  => (this.movilSelected = movil);

  getInstructorSelected = (instructor: DataRadioButton)  => (this.instructorSelected = instructor);

  constructor(private formularioService: FormularioService) { }

  ngOnInit(): void {
  }


  enviarFormulario(event): void{



    if (this.movilSelected === null){
      errorMensaje('Error', 'Debe seleccionar un móvil.');
    }

    if (this.instructorSelected === null){
      errorMensaje('Error', 'Debe seleccionar su nombre.');
    }

  }

}
