import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movil } from '../models/classes/movil.model';
import { Instructor } from '../models/classes/instructor.model';
import { DiarioMovil } from '../models/classes/diario-movil.model';
import { DesperfectoMovil } from '../models/classes/desperfecto-movil.model';
import { EvaluacionAlumno } from '../models/classes/evaluacion-alumno.model';
import { ResultadoExamenPractico } from '../models/classes/resultado-examen-practico.model';

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

  guardarResultadoExamenPractico = (resultadoExamenPractico : ResultadoExamenPractico) => this.http.post(`${environment.url_backend}/resultadoexamenpractico`, resultadoExamenPractico );

}
