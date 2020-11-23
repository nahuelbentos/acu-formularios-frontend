import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';

@Component({
  selector: 'app-nav-formulario',
  templateUrl: './nav-formulario.component.html',
  styleUrls: ['./nav-formulario.component.scss']
})
export class NavFormularioComponent implements OnInit {

   rol = 'formularios';
  routes: RutasNav[] = [
    {
      link: 'diario-movil',
      titulo: 'Diario Móvil',
    },
    {
      link: 'desperfecto-movil',
      titulo: 'Desperfecto Móvil',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}