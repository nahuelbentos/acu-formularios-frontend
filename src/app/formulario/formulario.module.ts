import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { NavFormularioComponent } from './components/nav-formulario/nav-formulario.component';
import { SharedModule } from '../shared/shared.module';
import { DiarioMovilComponent } from './pages/diario-movil/diario-movil.component';
import { DesperfectoMovilComponent } from './pages/desperfecto-movil/desperfecto-movil.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EvaluacionAlumnoComponent } from './pages/evaluacion-alumno/evaluacion-alumno.component';


@NgModule({
  declarations: [NavFormularioComponent, DiarioMovilComponent, DesperfectoMovilComponent, EvaluacionAlumnoComponent],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class FormularioModule { }
