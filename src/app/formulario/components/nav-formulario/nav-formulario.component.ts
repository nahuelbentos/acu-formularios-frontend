import { Component, OnInit } from '@angular/core';
import { RutasNav } from '../../../models/interfaces/rutas-nav.interface';

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
    {
      link: 'resultado-examen-practico',
      titulo: 'Resultado de Exámenes Práctico',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
