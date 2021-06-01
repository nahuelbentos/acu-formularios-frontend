import { Instructor } from '../models/instructor.model';
import { DataRadioButton } from '../models/data-radiobutton.model';
import { Movil } from '../models/movil.model';
import { DataRadioButtonBoolean } from '../models/data-radiobutton-boolean.model';
import { errorMensaje } from './sweet-alert';
import { DataRadioButtonEnum } from '../models/data-radiobutton-enum.model';

export const  getColFromInstructor = (col: Instructor[]) =>
  col.map((item) => new DataRadioButton(item.EscInsId, item.EscInsNom));

export const getColFromMovil = (col: Movil[]) =>
    col.map((item) => new DataRadioButton(item.MovCod, item.MovCod.toString()));

export const validarColeccion = (coleccion: any[], mensaje: string ) => {
  if ( coleccion.find((item) => item.value === null) || coleccion.length === 0) {
    errorMensaje('Error', mensaje);
    return;
  }
}
