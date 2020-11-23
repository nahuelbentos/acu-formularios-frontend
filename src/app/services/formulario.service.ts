import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movil } from '../models/movil.model';
import { Instructor } from '../models/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http: HttpClient) { }


  getMoviles = () => this.http.get<Movil[]>(`${environment.url_ws}/wsGetMoviles`);

  getInstructores = () => this.http.get<Instructor[]>(`${environment.url_ws}/wsGetInstructoresActivos`);

}
