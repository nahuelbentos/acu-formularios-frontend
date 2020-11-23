import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/formulario',
        pathMatch: 'full',
      },
      {
        path: 'formulario',
        loadChildren: () => import('./formulario/formulario.module').then((m) => m.FormularioModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
