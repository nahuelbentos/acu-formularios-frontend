import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { getColFromInstructor, validarColeccion } from '../../../utils/utils';
import { DataRadioButtonEnum } from '../../../models/classes/data-radiobutton-enum.model';
import { EvaluacionAlumno } from '../../../models/classes/evaluacion-alumno.model';
import { errorMensaje, mensajeConfirmacion } from '../../../utils/sweet-alert';
import { DataRadioButton } from '../../../models/classes/data-radiobutton.model';
import { FormularioService } from '../../../services/formulario.service';

@Component({
  selector: 'app-evaluacion-alumno',
  templateUrl: './evaluacion-alumno.component.html',
  styleUrls: ['./evaluacion-alumno.component.scss'],
})
export class EvaluacionAlumnoComponent implements OnInit {
  form: FormGroup;
  instructores: DataRadioButton[] = [];
  instructorSelected: DataRadioButton = null;

  numeroClases: DataRadioButton[] = [
    { key: 4, description: 'Clase 4' },
    { key: 8, description: 'Clase 8' },
    { key: 12, description: 'Clase 12' },
  ];
  numeroClaseSelected: DataRadioButton = null;

  valuesEnum = [0, 1, 2];

  maniobrasValuesEnum = [0, 1, 2, 3];

  titles: string[] = ['Sí, siempre', 'A veces', 'No lo ha logrado todavía'];
  titlesProgresoAlumno: string[] = [
    'Lo logra al primer intento',
    'Lo logra luego de algunos intentos',
    'No lo ha logrado todavía',
  ];
  titlesManiobras: string[] = [
    'Lo logra al primer intento',
    'Lo logra luego de algunos intentos',
    'No lo ha logrado todavía',
    'No corresponde',
  ];

  dataProgresoAlumno: DataRadioButtonEnum[] = [
    {
      description: 'Enciende el vehículo',
      value: null,
      key: 'progresoEnciendeVehiculo',
    },
    {
      description: 'Pone en marcha el vehículo',
      value: null,
      key: 'progresoMarchaVehiculo',
    },
    {
      description: 'Cambio en neutro previo al encendido',
      value: null,
      key: 'progresoEncendidoEnNeutro',
    },
  ];

  dataSeguridadInciarMarcha: DataRadioButtonEnum[] = [
    {
      description: 'Regula correctamente la butaca y apoyacabezas',
      value: null,
      key: 'seguridadCinturon',
      hasMargin: true,
    },
    {
      description: 'Usa cinturón de seguridad',
      value: null,
      key: 'seguridadRegulaButacaApoyaCabezas',
    },
    {
      description: 'Regula los 3 espejos',
      value: null,
      key: 'seguridadRegulaEspejos',
    },
  ];

  dataDominioAlumno: DataRadioButtonEnum[] = [
    {
      description: 'Domina el uso de pedales',
      value: null,
      key: 'dominaUsoPedales',
    },
    {
      description: 'Domina la administración de cambios',
      value: null,
      key: 'dominaAdministracionCambios',
    },
    {
      description: 'Domina el uso de los 3 espejos',
      value: null,
      key: 'dominaUsoEspejos',
    },
    {
      description: 'Tiene buena técnica de brazos',
      value: null,
      key: 'tieneBuenaTecnicaBrazos',
    },
    {
      description: 'Domina el vehículo en repecho',
      value: null,
      key: 'dominaVehiculoEnRepecho',
    },
    {
      description: 'Señaliza correctamente el cambio de carril',
      value: null,
      key: 'senializaCorrectamenteCambioCarril',
      hasMargin: true,
    },
  ];

  dataPrudenciaAlumno: DataRadioButtonEnum[] = [
    {
      description: 'Reconoce los sentidos de circulación',
      value: null,
      key: 'reconoceSentidosCirculacion',
    },
    {
      description: 'Circula manteniendo la derecha',
      value: null,
      key: 'circulaManteniendoDerecha',
    },
    {
      description: 'Mantiene distancia de seguridad',
      value: null,
      key: 'mantieneDistanciaSeguridad',
    },
    {
      description: 'Respeta todas las señales de tránsito',
      value: null,
      key: 'respetaTodasSenialesTransito',
    },
    {
      description: 'Señaliza las maniobras a realizar',
      value: null,
      key: 'senializaManiobrasARealizar',
    },
    {
      description: 'Respeta las sendas peatonales',
      value: null,
      key: 'respetaSendasPeatonales',
    },
    {
      description: 'Respeta los derechos de otros usuarios de la via',
      value: null,
      key: 'respetaOtrosUsuariosDeLaVia',
      hasMargin: true,
    },
    {
      description: 'Mantiene una velocidad adecuada',
      value: null,
      key: 'mantieneVelocidadAdecuada',
    },
    {
      description: 'Frena con suficiente anticipación',
      value: null,
      key: 'frenaConSuficienteAnticipacion',
    },
  ];

  dataGiros: DataRadioButtonEnum[] = [
    {
      description: 'Se ubica correctamente para realizarlo',
      value: null,
      key: 'giroUbicacionCorrectamente',
      hasMargin: true,
    },
    {
      description: 'Señaliza correctamente',
      value: null,
      key: 'giroSenializaCorrectamente',
    },
    {
      description: 'Ingresa correctamente a la nueva vía',
      value: null,
      key: 'giroIngresaCorrectamenteNuevaVia',
    },
    {
      description: 'Los realiza a la velocidad correcta',
      value: null,
      key: 'giroVelocidadCorrecta',
    },
  ];

  dataConduccionACU: DataRadioButtonEnum[] = [
    {
      description: 'Sale conduciendo del ACU',
      value: null,
      key: 'saleConduciendoACU',
    },
    {
      description: 'Vuelve conduciendo al ACU',
      value: null,
      key: 'vuelveConduciendoACU',
    },
  ];

  dataComportamientoAlumno: DataRadioButtonEnum[] = [
    {
      description: 'Evalúa y enfrenta adecuadamente las dificultades',
      value: null,
      key: 'evaluaEnfrentaAdecuadamenteDificultades',
      hasMargin: true,
    },
    {
      description: 'Tolerancia al stress en el tránsito',
      value: null,
      key: 'toleranciaStressTransito',
    },
    {
      description: 'Acepta las indicaciones del instructor',
      value: null,
      key: 'aceptaIndicacionesInstructor',
    },
  ];

  dataManiobras: DataRadioButtonEnum[] = [
    { description: 'Marcha atrás', value: null, key: 'marchaAtras' },
    { description: 'Slalom', value: null, key: 'slalom' },
    {
      description: 'Estac. lateral derecho',
      value: null,
      key: 'estacionamientoLateralDerecho',
    },
    {
      description: 'Estac. lateral izquierdo',
      value: null,
      key: 'estacionamientoLateralIzquierdo',
    },
    {
      description: 'Estac. en 45° derecho',
      value: null,
      key: 'estacionamient45GradosDerecho',
    },
    {
      description: 'Estac. en 45° izquierdo',
      value: null,
      key: 'estacionamient45GradosIzquierdo',
    },
  ];

  get alumnoNombreApellido(): AbstractControl {
    return this.form.get('alumnoNombreApellido');
  }
  get observaciones(): AbstractControl {
    return this.form.get('observaciones');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formularioService: FormularioService
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      alumnoNombreApellido: ['', Validators.required],
      observaciones: [''],
    });
  }

  ngOnInit(): void {
    this.formularioService
      .getInstructores()
      .pipe(map((instructores) => getColFromInstructor(instructores)))
      .subscribe((instructores) => (this.instructores = instructores));
  }

  getInstructorSelected = (instructor: DataRadioButton) =>
    (this.instructorSelected = instructor);

  getNumeroClaseSelected = (numeroClase: DataRadioButton) =>
    (this.numeroClaseSelected = numeroClase);

  getProgresoAlumno = (progresoAlumno: DataRadioButtonEnum[]) =>
    (this.dataProgresoAlumno = progresoAlumno);

  getSeguridadInciarMarcha = (seguridadInciarMarcha: DataRadioButtonEnum[]) =>
    (this.dataSeguridadInciarMarcha = seguridadInciarMarcha);

  getDominioAlumno = (dominioAlumno: DataRadioButtonEnum[]) =>
    (this.dataDominioAlumno = dominioAlumno);

  getPrudenciaAlumno = (prudenciaAlumno: DataRadioButtonEnum[]) =>
    (this.dataPrudenciaAlumno = prudenciaAlumno);

  getGiros = (giros: DataRadioButtonEnum[]) => (this.dataGiros = giros);

  getConduccionACU = (conduccionACU: DataRadioButtonEnum[]) =>
    (this.dataConduccionACU = conduccionACU);

  getComportamientoAlumno = (comportamientoAlumno: DataRadioButtonEnum[]) =>
    (this.dataComportamientoAlumno = comportamientoAlumno);

  getManiobras = (maniobras: DataRadioButtonEnum[]) =>
    (this.dataManiobras = maniobras);

  enviarFormulario(event): void {
    this.validarFormulario();

    const evaluacionAlumno = this.getEvaluacionAlumno();

    this.formularioService
      .guardarEvaluacionAlumno(evaluacionAlumno)
      .subscribe(() =>
        mensajeConfirmacion(
          'Excelente!',
          'Se envió el reporte correctamente'
        ).then(() => this.router.navigate(['/formulario']))
      );
  }

  getEvaluacionAlumno = (): EvaluacionAlumno => {
    const evaluacionAlumno = new EvaluacionAlumno();
    evaluacionAlumno.escInsId = this.instructorSelected.key.toString();
    evaluacionAlumno.alumnoNombreApellido = this.alumnoNombreApellido.value;
    evaluacionAlumno.observaciones = this.observaciones.value;
    evaluacionAlumno.numeroClase = parseInt(
      this.numeroClaseSelected.key.toString()
    );

    this.dataProgresoAlumno.forEach((item) => {
      switch (item.key) {
        case 'progresoEnciendeVehiculo':
          evaluacionAlumno.progresoEnciendeVehiculo = item.value;
          break;

        case 'progresoMarchaVehiculo':
          evaluacionAlumno.progresoMarchaVehiculo = item.value;
          break;

        case 'progresoEncendidoEnNeutro':
          evaluacionAlumno.progresoEncendidoEnNeutro = item.value;
          break;
      }
    });

    this.dataSeguridadInciarMarcha.forEach((item) => {
      switch (item.key) {
        case 'seguridadCinturon':
          evaluacionAlumno.seguridadCinturon = item.value;
          break;

        case 'seguridadRegulaButacaApoyaCabezas':
          evaluacionAlumno.seguridadRegulaButacaApoyaCabezas = item.value;
          break;

        case 'seguridadRegulaEspejos':
          evaluacionAlumno.seguridadRegulaEspejos = item.value;
          break;
      }
    });

    this.dataDominioAlumno.forEach((item) => {
      switch (item.key) {
        case 'dominaUsoPedales':
          evaluacionAlumno.dominaUsoPedales = item.value;
          break;

        case 'dominaAdministracionCambios':
          evaluacionAlumno.dominaAdministracionCambios = item.value;
          break;

        case 'dominaUsoEspejos':
          evaluacionAlumno.dominaUsoEspejos = item.value;
          break;

        case 'tieneBuenaTecnicaBrazos':
          evaluacionAlumno.tieneBuenaTecnicaBrazos = item.value;
          break;

        case 'dominaVehiculoEnRepecho':
          evaluacionAlumno.dominaVehiculoEnRepecho = item.value;
          break;

        case 'senializaCorrectamenteCambioCarril':
          evaluacionAlumno.senializaCorrectamenteCambioCarril = item.value;
          break;
      }
    });

    this.dataPrudenciaAlumno.forEach((item) => {
      switch (item.key) {
        case 'reconoceSentidosCirculacion':
          evaluacionAlumno.reconoceSentidosCirculacion = item.value;
          break;

        case 'circulaManteniendoDerecha':
          evaluacionAlumno.circulaManteniendoDerecha = item.value;
          break;

        case 'mantieneDistanciaSeguridad':
          evaluacionAlumno.mantieneDistanciaSeguridad = item.value;
          break;

        case 'respetaTodasSenialesTransito':
          evaluacionAlumno.respetaTodasSenialesTransito = item.value;
          break;

        case 'senializaManiobrasARealizar':
          evaluacionAlumno.senializaManiobrasARealizar = item.value;
          break;

        case 'respetaSendasPeatonales':
          evaluacionAlumno.respetaSendasPeatonales = item.value;
          break;

        case 'respetaOtrosUsuariosDeLaVia':
          evaluacionAlumno.respetaOtrosUsuariosDeLaVia = item.value;
          break;

        case 'mantieneVelocidadAdecuada':
          evaluacionAlumno.mantieneVelocidadAdecuada = item.value;
          break;

        case 'frenaConSuficienteAnticipacion':
          evaluacionAlumno.frenaConSuficienteAnticipacion = item.value;
          break;
      }
    });

    this.dataGiros.forEach((item) => {
      switch (item.key) {
        case 'giroUbicacionCorrectamente':
          evaluacionAlumno.giroUbicacionCorrectamente = item.value;
          break;

        case 'giroSenializaCorrectamente':
          evaluacionAlumno.giroSenializaCorrectamente = item.value;
          break;

        case 'giroIngresaCorrectamenteNuevaVia':
          evaluacionAlumno.giroIngresaCorrectamenteNuevaVia = item.value;
          break;

        case 'giroVelocidadCorrecta':
          evaluacionAlumno.giroVelocidadCorrecta = item.value;
          break;
      }
    });

    this.dataConduccionACU.forEach((item) => {
      switch (item.key) {
        case 'saleConduciendoACU':
          evaluacionAlumno.saleConduciendoACU = item.value;
          break;

        case 'vuelveConduciendoACU':
          evaluacionAlumno.vuelveConduciendoACU = item.value;
          break;
      }
    });

    this.dataComportamientoAlumno.forEach((item) => {
      switch (item.key) {
        case 'evaluaEnfrentaAdecuadamenteDificultades':
          evaluacionAlumno.evaluaEnfrentaAdecuadamenteDificultades = item.value;
          break;

        case 'toleranciaStressTransito':
          evaluacionAlumno.toleranciaStressTransito = item.value;
          break;

        case 'aceptaIndicacionesInstructor':
          evaluacionAlumno.aceptaIndicacionesInstructor = item.value;
          break;
      }
    });

    this.dataManiobras.forEach((item) => {
      switch (item.key) {
        case 'marchaAtras':
          evaluacionAlumno.marchaAtras = item.value;
          break;

        case 'slalom':
          evaluacionAlumno.slalom = item.value;
          break;

        case 'estacionamientoLateralDerecho':
          evaluacionAlumno.estacionamientoLateralDerecho = item.value;
          break;

        case 'estacionamientoLateralIzquierdo':
          evaluacionAlumno.estacionamientoLateralIzquierdo = item.value;
          break;

        case 'estacionamient45GradosDerecho':
          evaluacionAlumno.estacionamient45GradosDerecho = item.value;
          break;

        case 'estacionamient45GradosIzquierdo':
          evaluacionAlumno.estacionamient45GradosIzquierdo = item.value;
          break;
      }
    });

    return evaluacionAlumno;
  };

  validarFormulario = () => {
    validarColeccion(
      this.dataProgresoAlumno,
      'Debe seleccionar todos los valores del progreso del alumno.'
    );

    validarColeccion(
      this.dataSeguridadInciarMarcha,
      'Debe seleccionar todos los valores de uso de elementos de seguridad.'
    );

    validarColeccion(
      this.dataDominioAlumno,
      'Debe seleccionar todos los valores del dominio del alumno.'
    );

    validarColeccion(
      this.dataPrudenciaAlumno,
      'Debe seleccionar todos los valores de prudencia del alumno.'
    );

    validarColeccion(
      this.dataGiros,
      'Debe seleccionar todos los valores de los giros.'
    );

    validarColeccion(
      this.dataConduccionACU,
      'Debe seleccionar todos los valores de la sección "desde ACU".'
    );

    validarColeccion(
      this.dataComportamientoAlumno,
      'Debe seleccionar todos los valores del comportamiento del alumno.'
    );

    validarColeccion(
      this.dataManiobras,
      'Debe seleccionar todos los valores de la sección "Maniobras".'
    );

    if (this.instructorSelected === null) {
      return errorMensaje('Error', 'Debe seleccionar su nombre.');
    }

    if (this.form.invalid) {
      return;
    }
  };
}
