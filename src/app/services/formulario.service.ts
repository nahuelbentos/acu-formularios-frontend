import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movil } from '../models/movil.model';
import { Instructor } from '../models/instructor.model';
import { DiarioMovil } from '../models/diario-movil.model';
import { DesperfectoMovil } from '../models/desperfecto-movil.model';
import { EvaluacionAlumno } from '../models/evaluacion-alumno.model';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http: HttpClient) { }


  getMoviles = () => this.http.get<Movil[]>(`${environment.url_ws}/wsGetMoviles`);

  getInstructores = () => this.http.get<Instructor[]>(`${environment.url_ws}/wsGetInstructoresActivos`);

  guardarDesperfectoMovil = ( desperfectoMovil : DesperfectoMovil) => this.http.post(`${environment.url_backend}/desperfectomovil`, desperfectoMovil );

  guardarDiarioMovil = (diarioMovil : DiarioMovil) => this.http.post(`${environment.url_backend}/diariomovil`, diarioMovil );

  guardarEvaluacionAlumno = (evaluacionAlumno : EvaluacionAlumno) => this.http.post(`${environment.url_backend}/evaluacionalumno`, evaluacionAlumno );

}
