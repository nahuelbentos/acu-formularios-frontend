import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';

@Component({
  selector: 'app-nav-formulario',
  templateUrl: './nav-formulario.component.html',
  styleUrls: ['./nav-formulario.component.scss']
})
export class NavFormularioComponent implements OnInit {

   rol = 'reportes';
  routes: RutasNav[] = [
    {
      link: 'diario-movil',
      titulo: 'Diario Móvil',
    },
    {
      link: 'desperfecto-movil',
      titulo: 'Desperfecto Móvil',
    },
    {
      link: 'evaluacion-alumno',
      titulo: 'Evaluación Alumno',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
