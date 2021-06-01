import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataRadioButtonBoolean } from 'src/app/models/data-radiobutton-boolean.model';
import { DataRadioButton } from 'src/app/models/data-radiobutton.model';
import { FormularioService } from 'src/app/services/formulario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { getColFromInstructor, getMotivosReprobacionPista } from 'src/app/utils/utils';
import { ResultadoExamen } from '../../../models/resultado-examen.enum';
import { enumToArray, getColFromArrayString, getMotivosReprobacionCalle } from '../../../utils/utils';
import { DataRadioButtonEnum } from '../../../models/data-radiobutton-enum.model';

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

  alumnoDeOtroInstructor: DataRadioButtonBoolean[] = [
    { key: 'alumno', description: null, value: null },
  ];

  instructorDelAlumnoSelected: DataRadioButton = null;

  resultadosExamen: DataRadioButtonEnum[]   = [
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
    this.motivoReprobacionCalle = getColFromArrayString( getMotivosReprobacionCalle() );
    this.motivoReprobacionPista = getColFromArrayString( getMotivosReprobacionPista() );
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
      detallePerdida: [''],
    });
  }

  getInstructorSelected = (instructor: DataRadioButton) =>
    (this.instructorSelected = instructor);

  getAlumnoDeOtroInstructor = (
    alumnoDeOtroInstructor: DataRadioButtonBoolean[]
  ) => (this.alumnoDeOtroInstructor = alumnoDeOtroInstructor);

  getInstructorDelAlumnoSelected = (instructor: DataRadioButton) =>
    (this.instructorDelAlumnoSelected = instructor);

  getResultadoExamen = (resultadoExamen: DataRadioButtonEnum) => {
    this.verSeccion = (resultadoExamen.value !== ResultadoExamen.Aprobado);
    this.resultadoExamen = resultadoExamen
  };


  getMotivoReprobacionPistaSelected = (motivoReprobacion: DataRadioButton) =>
  (this.motivoReprobacionPistaSelected = motivoReprobacion);

  getMotivoReprobacionCalleSelected = (motivoReprobacion: DataRadioButton) =>
  (this.motivoReprobacionCalleSelected = motivoReprobacion);

  enviarFormulario(event): void {
    console.log('Resultado examen enum: ', ResultadoExamen);
    console.log('Resultado examen: ', this.resultadoExamen);
    console.log('Motivo de reprobacion pista: ', this.motivoReprobacionPistaSelected);
    console.log('Motivo de reprobacion calle: ', this.motivoReprobacionCalleSelected);

    /* Datos
    Instructor
    Nombre alumno
    esAlumnoOtroInstructor
    ElOtroInstructor
    ResultadoExamen
      Si es Reprobado:
        => En pista: => MotivoReprobacionPista
        => En calle: => -MotivoReprobacionCalle
                        - Detalle de motivo de p'erdida
    */

  /* Validaciones
  1) Si es alumno de otro instructor =>
    Tiene que agregar seleccionar el otro instructor
  2) Si el resultado examen es Reprobado =>
    Tiene que seleccionar las secciones subyacentes


  */

    // this.validarFormulario();
    //const evaluacionAlumno = this.getEvaluacionAlumno();
    // console.log('evaluacionAlumno:: ', evaluacionAlumno);
    // this.formularioService.guardarEvaluacionAlumno( evaluacionAlumno )
    //   .subscribe( () => mensajeConfirmacion("Excelente!", "Se envió el formulario correctamente")
    //     .then( () => this.router.navigate(['/formulario']) ))
  }
}
