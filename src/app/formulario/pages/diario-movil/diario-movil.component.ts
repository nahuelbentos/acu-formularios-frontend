import { Component, OnInit } from '@angular/core';
import { errorMensaje } from '../../../utils/sweet-alert';
import { DataRadioButtonBoolean } from '../../../models/data-radiobutton-boolean.interface';
import { DataRadioButton } from '../../../models/data-radiobutton.interface';

@Component({
  selector: 'app-diario-movil',
  templateUrl: './diario-movil.component.html',
  styleUrls: ['./diario-movil.component.scss'],
})
export class DiarioMovilComponent implements OnInit {
  correct = 0;
  favoriteSeason: string;
  estadoLucesDelanteras: DataRadioButtonBoolean[] = [
    { description: 'Cortas izquierda', value: null },
    { description: 'Largas izquierda', value: null },
    { description: 'Señalero izquierdo', value: null },
    { description: 'Cortas derecha', value: null },
    { description: 'Largas derecha', value: null },
    { description: 'Señalero derecho', value: null },
  ];

  estadoLucesTraceras: DataRadioButtonBoolean[] = [
    { description: 'Posición izquierda', value: null },
    { description: 'Señalero izquierdo', value: null },
    { description: 'Posición derecha', value: null },
    { description: 'Señalero derecho', value: null },
    { description: 'Reversa', value: null },
    { description: 'Freno', value: null },
  ];

  nivelesYObjetos: DataRadioButtonBoolean[] = [
    { description: 'Nivel de agua', value: null },
    { description: 'Nivel de aceite', value: null },
    { description: 'Auxiliar presente', value: null },
    { description: 'Baliza presente', value: null },
    { description: 'Extintor presente', value: null },
    { description: 'Conos presente', value: null },
    { description: 'Combustible (al menos medio tanque)', value: null },
  ];

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

  dataEstadoLucesDelanteras: DataRadioButtonBoolean[] = [];
  dataEstadoLucesTraceras: DataRadioButtonBoolean[] = [];
  dataNivelesYObjetos: DataRadioButtonBoolean[] = [];

  movilSelected: DataRadioButton = null;
  instructorSelected: DataRadioButton = null;

  constructor() {}

  ngOnInit(): void {}

  getEstadoLucesDelanteras = (estadoLucesDelanteras: DataRadioButtonBoolean[])  => (this.dataEstadoLucesDelanteras = estadoLucesDelanteras);

  getEstadoLucesTraceras = (estadoLucesTraceras: DataRadioButtonBoolean[])  => (this.dataEstadoLucesTraceras = estadoLucesTraceras);

  getNivelesYObjetos = (nivelesYObjetos: DataRadioButtonBoolean[])  => (this.dataNivelesYObjetos = nivelesYObjetos);

  getMovilSelected = (movil: DataRadioButton)  => (this.movilSelected = movil);

  getInstructorSelected = (instructor: DataRadioButton)  => (this.instructorSelected = instructor);

  enviarFormulario(event): void{

    if (this.dataEstadoLucesDelanteras.find( item => item.value === null) || this.dataEstadoLucesDelanteras.length === 0){
      errorMensaje('Error', 'Debe seleccionar todos los valores de estado de luces delanteras.');
    }

    if (this.dataEstadoLucesTraceras.find( item => item.value === null) || this.dataEstadoLucesTraceras.length === 0){
      errorMensaje('Error', 'Debe seleccionar todos los valores de estado de luces traceras.');
    }

    if (this.movilSelected === null){
      errorMensaje('Error', 'Debe seleccionar un móvil.');
    }

    if (this.instructorSelected === null){
      errorMensaje('Error', 'Debe seleccionar su nombre.');
    }

  }
}
