import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../../services/formulario.service';
import { map } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesperfectoMovil } from '../../../models/classes/desperfecto-movil.model';
import { mensajeConfirmacion, errorMensaje } from '../../../utils/sweet-alert';
import { Router } from '@angular/router';
import { DataRadioButton } from '../../../models/classes/data-radiobutton.model';
import { getColFromInstructor, getColFromMovil } from '../../../utils/utils';

@Component({
  selector: 'app-desperfecto-movil',
  templateUrl: './desperfecto-movil.component.html',
  styleUrls: ['./desperfecto-movil.component.scss']
})
export class DesperfectoMovilComponent implements OnInit {


  form: FormGroup;

  moviles: DataRadioButton[] = [];
  instructores: DataRadioButton[] = [];


  movilSelected: DataRadioButton = null;
  instructorSelected: DataRadioButton = null;

  getMovilSelected = (movil: DataRadioButton)  => (this.movilSelected = movil);

  getInstructorSelected = (instructor: DataRadioButton)  => (this.instructorSelected = instructor);


  get movilKilometraje(): AbstractControl { return this.form.get('movilKilometraje'); }
  get desperfecto(): AbstractControl { return this.form.get('desperfecto'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formularioService: FormularioService) {
      this.buildForm();
    }


  private buildForm(): void {
    this.form = this.fb.group({
      movilKilometraje: ['', Validators.required],
      desperfecto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formularioService
      .getInstructores()
      .pipe(map((instructores) => getColFromInstructor(instructores)))
      .subscribe((instructores) => (this.instructores = instructores));

    this.formularioService
      .getMoviles()
      .pipe(map((moviles) => getColFromMovil(moviles)))
      .subscribe((moviles) => (this.moviles = moviles));
  }


  enviarFormulario(event): void{
    if (this.movilSelected === null){
      errorMensaje('Error', 'Debe seleccionar un móvil.');
      return;
    }

    if (this.instructorSelected === null){
      errorMensaje('Error', 'Debe seleccionar su nombre.');
      return;
    }

    if(this.form.invalid){
      return;
    }

    const desperfectoMovil = new DesperfectoMovil();
    desperfectoMovil.movilId = parseInt(this.movilSelected.key.toString()) ;
    desperfectoMovil.instructorId = this.instructorSelected.key.toString() ;
    desperfectoMovil.movilKilometraje = this.movilKilometraje.value;
    desperfectoMovil.desperfecto = this.desperfecto.value;

    this.formularioService.guardarDesperfectoMovil( desperfectoMovil )
      .subscribe( () => mensajeConfirmacion("Excelente!", "Se envió el reporte correctamente")
        .then( () => this.router.navigate(['/formulario']) ))



  }


}
