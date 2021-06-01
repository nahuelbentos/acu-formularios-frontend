import { Component, OnInit } from '@angular/core';
import { DataRadioButton } from 'src/app/models/data-radiobutton.model';
import { errorMensaje } from 'src/app/utils/sweet-alert';
import { FormularioService } from '../../../services/formulario.service';
import { map } from 'rxjs/operators';
import { Instructor } from 'src/app/models/instructor.model';
import { Movil } from 'src/app/models/movil.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesperfectoMovil } from '../../../models/desperfecto-movil.model';
import { mensajeConfirmacion } from '../../../utils/sweet-alert';
import { Router } from '@angular/router';

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
      .pipe(map((instructores) => this.getColFromInstructor(instructores)))
      .subscribe((instructores) => (this.instructores = instructores));

    this.formularioService
      .getMoviles()
      .pipe(map((moviles) => this.getColFromMovil(moviles)))
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


  getColFromInstructor = (col: Instructor[]) =>
    col.map((item) => new DataRadioButton(item.EscInsId, item.EscInsNom));
  getColFromMovil = (col: Movil[]) =>
    col.map((item) => new DataRadioButton(item.MovCod, item.MovCod.toString()));

}
