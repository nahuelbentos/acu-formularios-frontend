import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { NavFormularioComponent } from './components/nav-formulario/nav-formulario.component';
import { SharedModule } from '../shared/shared.module';
import { DiarioMovilComponent } from './pages/diario-movil/diario-movil.component';
import { DesperfectoMovilComponent } from './pages/desperfecto-movil/desperfecto-movil.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavFormularioComponent, DiarioMovilComponent, DesperfectoMovilComponent],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class FormularioModule { }
