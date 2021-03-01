import { Component, OnInit } from '@angular/core';
import { errorMensaje, mensajeConfirmacion } from '../../../utils/sweet-alert';
import { DataRadioButtonBoolean } from '../../../models/data-radiobutton-boolean.model';
import { DataRadioButton } from '../../../models/data-radiobutton.model';
import { FormularioService } from '../../../services/formulario.service';
import { map, mergeMap } from 'rxjs/operators';
import { Instructor } from 'src/app/models/instructor.model';
import { Movil } from 'src/app/models/movil.model';
import { Observable, from } from 'rxjs';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiarioMovil } from '../../../models/diario-movil.model';
import { getColFromInstructor, getColFromMovil, validarColeccion } from '../../../utils/utils';

@Component({
  selector: 'app-diario-movil',
  templateUrl: './diario-movil.component.html',
  styleUrls: ['./diario-movil.component.scss'],
})
export class DiarioMovilComponent implements OnInit {


  form: FormGroup;
  correct = 0;
  estadoLucesDelanteras: DataRadioButtonBoolean[] = [
    { key: 'lucesDelanterasCortasIzquierda', description: 'Cortas izquierda', value: null },
    { key: 'lucesDelanterasLargasIzquierda', description: 'Largas izquierda', value: null },
    { key: 'lucesDelanterasSenialeroIzquierdo', description: 'Señalero izquierdo', value: null },
    { key: 'lucesDelanterasCortasDerecha', description: 'Cortas derecha', value: null },
    { key: 'lucesDelanterasLargasDerecha', description: 'Largas derecha', value: null },
    { key: 'lucesDelanterasSenialeroDerecho', description: 'Señalero derecho', value: null },
  ];

  estadoLucesTraseras: DataRadioButtonBoolean[] = [
    { key: 'lucesTraserasPosicionIzquierda', description: 'Posición izquierda', value: null },
    { key: 'lucesTraserasSenialeroIzquierdo', description: 'Señalero izquierdo', value: null },
    { key: 'lucesTraserasPosicionDerecha', description: 'Posición derecha', value: null },
    { key: 'lucesTraserasSenialeroDerecho', description: 'Señalero derecho', value: null },
    { key: 'lucesTraserasReversa', description: 'Reversa', value: null },
    { key: 'lucesTraserasFreno', description: 'Freno', value: null },
  ];

  nivelesYObjetos: DataRadioButtonBoolean[] = [
    { key: 'nivelAgua', description: 'Nivel de agua', value: null },
    { key: 'nivelAceite', description: 'Nivel de aceite', value: null },
    { key: 'objetoAuxiliar', description: 'Auxiliar presente', value: null },
    { key: 'objetoBaliza', description: 'Baliza presente', value: null },
    { key: 'objetoExtintor', description: 'Extintor presente', value: null },
    { key: 'objetoConos', description: 'Conos presente', value: null },
    { key: 'combustible', description: 'Combustible (al menos medio tanque)', value: null },
  ];

  moviles: DataRadioButton[] = [ ];

  instructores: DataRadioButton[] = [ ];

  dataEstadoLucesDelanteras: DataRadioButtonBoolean[] = [];
  dataEstadoLucesTraseras: DataRadioButtonBoolean[] = [];
  dataNivelesYObjetos: DataRadioButtonBoolean[] = [];

  movilSelected: DataRadioButton = null;
  instructorSelected: DataRadioButton = null;

  get movilKilometraje(): AbstractControl { return this.form.get('movilKilometraje'); }
  get observaciones(): AbstractControl { return this.form.get('observaciones'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formularioService: FormularioService) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      movilKilometraje: ['', Validators.required],
      observaciones: [''],
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.formularioService
      .getInstructores()
      .pipe(map((instructores) => getColFromInstructor(instructores)))
      .subscribe((instructores) => (this.instructores = instructores));

    this.formularioService
      .getMoviles()
      .pipe(map((moviles) => getColFromMovil(moviles)))
      .subscribe((moviles) => (this.moviles = moviles));
  }

  getEstadoLucesDelanteras = (
    estadoLucesDelanteras: DataRadioButtonBoolean[]
  ) => (this.dataEstadoLucesDelanteras = estadoLucesDelanteras);

  getEstadoLucesTraseras = (estadoLucesTraseras: DataRadioButtonBoolean[]) =>
    (this.dataEstadoLucesTraseras = estadoLucesTraseras);

  getNivelesYObjetos = (nivelesYObjetos: DataRadioButtonBoolean[]) =>
    (this.dataNivelesYObjetos = nivelesYObjetos);

  getMovilSelected = (movil: DataRadioButton) => (this.movilSelected = movil);

  getInstructorSelected = (instructor: DataRadioButton) =>
    (this.instructorSelected = instructor);


  enviarFormulario(event): void {



    this.validarFormulario();

    console.log('dataEstadoLucesDelanteras:: ', this.dataEstadoLucesDelanteras);
    console.log('dataEstadoLucesTraseras:: ', this.dataEstadoLucesTraseras);
    console.log('dataNivelesYObjetos:: ', this.dataNivelesYObjetos);

    const diarioMovil = this.getDiarioMovil();
    console.log('diarioMovil:: ', diarioMovil);


    this.formularioService.guardarDiarioMovil( diarioMovil )
      .subscribe( () => mensajeConfirmacion("Excelente!", "Se envió el formulario correctamente")
        .then( () => this.router.navigate(['/formulario']) ))
  }


  getDiarioMovil = (): DiarioMovil => {

    const diarioMovil = new DiarioMovil();
    diarioMovil.movilId = parseInt(this.movilSelected.key.toString()) ;
    diarioMovil.instructorId = this.instructorSelected.key.toString() ;
    diarioMovil.movilKilometraje = this.movilKilometraje.value;
    diarioMovil.observaciones = this.observaciones.value;

    this.dataEstadoLucesDelanteras.forEach( item => {

      switch (item.key) {
        case 'lucesDelanterasCortasIzquierda':
          diarioMovil.lucesDelanterasCortasIzquierda = item.value;
          break;

        case 'lucesDelanterasLargasIzquierda':
          diarioMovil.lucesDelanterasLargasIzquierda = item.value;
          break;

        case 'lucesDelanterasSenialeroIzquierdo':
          diarioMovil.lucesDelanterasSenialeroIzquierdo = item.value;
          break;

        case 'lucesDelanterasCortasDerecha':
          diarioMovil.lucesDelanterasCortasDerecha = item.value;
          break;

        case 'lucesDelanterasLargasDerecha':
          diarioMovil.lucesDelanterasLargasDerecha = item.value;
          break;

        case 'lucesDelanterasSenialeroDerecho':
          diarioMovil.lucesDelanterasSenialeroDerecho = item.value;
          break;
      }

    });

    this.dataEstadoLucesTraseras.forEach( item => {

      switch (item.key) {
        case 'lucesTraserasPosicionIzquierda':
          diarioMovil.lucesTraserasPosicionIzquierda = item.value;
          break;
        case 'lucesTraserasPosicionDerecha':
          diarioMovil.lucesTraserasPosicionDerecha = item.value;
          break;
        case 'lucesTraserasSenialeroIzquierdo':
          diarioMovil.lucesTraserasSenialeroIzquierdo = item.value;
          break;
        case 'lucesTraserasSenialeroDerecho':
          diarioMovil.lucesTraserasSenialeroDerecho = item.value;
          break;
        case 'lucesTraserasReversa':
          diarioMovil.lucesTraserasReversa = item.value;
          break;
        case 'lucesTraserasFreno':
          diarioMovil.lucesTraserasFreno = item.value;
          break;
      }

    });

    this.dataNivelesYObjetos.forEach( item => {

      switch (item.key) {
        case 'nivelAgua':
          diarioMovil.nivelAgua = item.value;
          break;
        case 'nivelAceite':
          diarioMovil.nivelAceite = item.value;
          break;
        case 'objetoAuxiliar':
          diarioMovil.objetoAuxiliar = item.value;
          break;
        case 'objetoBaliza':
          diarioMovil.objetoBaliza = item.value;
          break;
        case 'objetoExtintor':
          diarioMovil.objetoExtintor = item.value;
          break;
        case 'objetoConos':
          diarioMovil.objetoConos = item.value;
          break;
        case 'combustible':
          diarioMovil.combustible = item.value;
          break;
      }

    });

    return diarioMovil;
  }

  validarFormulario = () => {

    validarColeccion(this.dataEstadoLucesDelanteras,'Debe seleccionar todos los valores de estado de luces delanteras.' );

    validarColeccion(this.dataEstadoLucesTraseras,'Debe seleccionar todos los valores de estado de luces traseras.' );

    validarColeccion(this.dataNivelesYObjetos,'Debe seleccionar todos los valores de niveles y objetos.' );

    if (this.movilSelected === null) {
      errorMensaje('Error', 'Debe seleccionar un móvil.');
      return;
    }

    if (this.instructorSelected === null) {
      errorMensaje('Error', 'Debe seleccionar su nombre.');
      return;
    }

    if(this.form.invalid){
      return;
    }
  }

  getValue = (key:string, item: DataRadioButtonBoolean): boolean => item.key === key && item.value;
}
