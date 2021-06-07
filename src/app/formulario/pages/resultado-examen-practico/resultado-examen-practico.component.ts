import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  enumToArray,
  getColFromArrayString,
  getColFromInstructor,
  getMotivosReprobacionCalle,
  getMotivosReprobacionPista,
  validarColeccion,
  validarItem,
} from '../../../utils/utils';
import { DataRadioButtonEnum } from '../../../models/classes/data-radiobutton-enum.model';
import { DataRadioButton } from '../../../models/classes/data-radiobutton.model';
import { FormularioService } from '../../../services/formulario.service';
import { DataRadioButtonBoolean } from '../../../models/classes/data-radiobutton-boolean.model';
import { ResultadoExamen } from '../../../models/enums/resultado-examen.enum';
import { errorMensaje, mensajeConfirmacion } from '../../../utils/sweet-alert';
import { ResultadoExamenPractico } from '../../../models/classes/resultado-examen-practico.model';

@Component({
  selector: 'app-resultado-examen-practico',
  templateUrl: './resultado-examen-practico.component.html',
  styleUrls: ['./resultado-examen-practico.component.scss'],
})
export class ResultadoExamenPracticoComponent implements OnInit {
  form: FormGroup;

  verSeccion = false;
  instructores: DataRadioButton[] = [];
  instructorSelected: DataRadioButton = null;
  titlesResultado: string[] = [
    'Aprobado',
    'Reprobado en Pista',
    'Reprobado en Calle',
  ];
  valuesEnum = [0, 1, 2];

  get alumnoNombreApellido(): AbstractControl {
    return this.form.get('alumnoNombreApellido');
  }

  get detallePerdida(): AbstractControl {
    return this.form.get('detallePerdida');
  }

  alumnoDeOtroInstructor: DataRadioButtonBoolean[] = [
    { key: 'alumno', description: null, value: null },
  ];

  isAlumnoDeOtroInstructor: boolean;

  instructorDelAlumnoSelected: DataRadioButton = null;

  resultadosExamen: DataRadioButtonEnum[] = [
    { description: 'Resultado', value: null, key: 'resultadoExamen' },
  ];

  resultadoExamen: DataRadioButtonEnum;

  motivoReprobacionPista: DataRadioButton[] = [];
  motivoReprobacionPistaSelected: DataRadioButton = null;
  motivoReprobacionCalle: DataRadioButton[] = [];
  motivoReprobacionCalleSelected: DataRadioButton = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formularioService: FormularioService
  ) {
    this.buildForm();

    // Cambiar a una tabla MotivosReprobacion -> MotivoReprobacion(id: number, motivo: string, esPista: boolean)
    this.motivoReprobacionCalle = getColFromArrayString(
      getMotivosReprobacionCalle()
    );
    this.motivoReprobacionPista = getColFromArrayString(
      getMotivosReprobacionPista()
    );
  }

  ngOnInit(): void {
    this.formularioService
      .getInstructores()
      .pipe(map((instructores) => getColFromInstructor(instructores)))
      .subscribe((instructores) => (this.instructores = instructores));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      alumnoNombreApellido: ['', Validators.required],
      detallePerdida: [null],
    });
  }

  getInstructorSelected = (instructor: DataRadioButton) =>
    (this.instructorSelected = instructor);

  getAlumnoDeOtroInstructor = (
    alumnoDeOtroInstructor: DataRadioButtonBoolean
  ) => (this.isAlumnoDeOtroInstructor = alumnoDeOtroInstructor.value);

  getInstructorDelAlumnoSelected = (instructor: DataRadioButton) =>
    (this.instructorDelAlumnoSelected = instructor);

  getResultadoExamen = (resultadoExamen: DataRadioButtonEnum) => {
    this.verSeccion = resultadoExamen.value !== ResultadoExamen.Aprobado;
    this.resultadoExamen = resultadoExamen;
  };

  getMotivoReprobacionPistaSelected = (motivoReprobacion: DataRadioButton) =>
    (this.motivoReprobacionPistaSelected = motivoReprobacion);

  getMotivoReprobacionCalleSelected = (motivoReprobacion: DataRadioButton) =>
    (this.motivoReprobacionCalleSelected = motivoReprobacion);

  enviarFormulario(event): void {
    console.log(this.motivoReprobacionCalleSelected);
    console.log(this.motivoReprobacionPistaSelected);
    console.log(this.resultadoExamen?.value);

    const isValid =this.validarFormulario();

    if( isValid ){

      const resultadoExamenPractico = this.getResultadoExamenPractico();
      this.formularioService
        .guardarResultadoExamenPractico(resultadoExamenPractico)
        .subscribe(() =>
          mensajeConfirmacion(
            'Excelente!',
            'Se envió el reporte correctamente'
          ).then(() => this.router.navigate(['/formulario']))
        );

    }
  }

  validarFormulario = (): boolean => {
    let error = validarItem(
      this.instructorSelected,
      'Debe seleccionar su nombre.'
    );
    if (error) {
      return false;
    }

    if (this.isAlumnoDeOtroInstructor && !this.instructorDelAlumnoSelected) {
      errorMensaje(
        'Error',
        'Debe seleccionar el nombre del instructor del alumno.'
      );
      return false;
    }

    error = !(this.resultadoExamen?.value >= 0) &&  validarItem(
      this.resultadoExamen?.value,
      'Debe seleccionar el resultado del examen.'
    );

    if (error) {
      return false;
    }

    switch (this.resultadoExamen.value) {
      case ResultadoExamen.ReprobadoPista:
        if (this.motivoReprobacionPistaSelected === null) {
          errorMensaje(
            'Error',
            'Debe seleccionar el motivo de reprobación en pista.'
          );
          return false;
        }
        break;
      case ResultadoExamen.ReprobadoCalle:
        if (this.motivoReprobacionCalleSelected === null) {
          errorMensaje(
            'Error',
            'Debe seleccionar el motivo de reprobación en pista.'
          );
          return false;
        }
        if (this.detallePerdida.value === null) {
          errorMensaje('Error', 'Debe agregar el motivo de la reprobación.');
          return false;
        }
        break;
    }

    if (this.form.invalid) {
      errorMensaje('Error', 'El nombre y apellido del alumno es requerido.');
      return false;
    }

    return true;
  };

  getResultadoExamenPractico = () => {
    const resultadoExamenPractico = new ResultadoExamenPractico();
    resultadoExamenPractico.escInsId = this.instructorSelected.key.toString();
    resultadoExamenPractico.alumnoNombreApellido = this.alumnoNombreApellido.value;
    resultadoExamenPractico.esAlumnoOtroInstructor = (this.isAlumnoDeOtroInstructor) ? true : false;
    resultadoExamenPractico.instructorAlumnoId = this.instructorDelAlumnoSelected?.key.toString();
    resultadoExamenPractico.resultado = this.resultadoExamen.value;

    if ( this.resultadoExamen.value === ResultadoExamen.Aprobado){
      resultadoExamenPractico.motivoReprobacionPista = null;
      resultadoExamenPractico.motivoReprobacionCalle = null;
    }else{
      resultadoExamenPractico.motivoReprobacionPista = +this.motivoReprobacionPistaSelected?.key;
      resultadoExamenPractico.motivoReprobacionCalle = +this.motivoReprobacionCalleSelected?.key;
      resultadoExamenPractico.detalleMotivoPerdida = this.detallePerdida.value;
    }


    console.log( resultadoExamenPractico );


    return resultadoExamenPractico;
  };
}
