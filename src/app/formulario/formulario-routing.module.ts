import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavFormularioComponent } from './components/nav-formulario/nav-formulario.component';
import { DiarioMovilComponent } from './pages/diario-movil/diario-movil.component';
import { DesperfectoMovilComponent } from './pages/desperfecto-movil/desperfecto-movil.component';


const routes: Routes = [
  {


    path: '',
    component: NavFormularioComponent,

    children: [

      {
        path: 'diario-movil',
        component: DiarioMovilComponent,
        data: { titulo: 'Control Diario de Móviles' },
      },
      {
        path: 'desperfecto-movil',
        component: DesperfectoMovilComponent,
        data: { titulo: 'Reporte de Desperfectos de Móviles' },
      },



    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
