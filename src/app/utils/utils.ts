import { Instructor } from '../models/instructor.model';
import { DataRadioButton } from '../models/data-radiobutton.model';
import { Movil } from '../models/movil.model';
import { DataRadioButtonBoolean } from '../models/data-radiobutton-boolean.model';
import { errorMensaje } from './sweet-alert';
import { DataRadioButtonEnum } from '../models/data-radiobutton-enum.model';

export const getMotivosReprobacionPista = () => [
  'Marcha atrás',
  'Slalom',
  'Estac. lateral derecho',
  'Estac. lateral izquierdo',
  'Estac. en 45º derecho',
  'Cartel de PARE',
  'Otro',
];

export const getMotivosReprobacionCalle = () => [
  'Mal ingreso a rotonda',
  'No respetó derecha',
  'Olvidó señalero',
  'Otro',
];

export const getColFromArrayString = (col: string[]) =>
  col.map((item) => new DataRadioButton(item, item));

export const getColFromInstructor = (col: Instructor[]) =>
  col.map(
    ({ EscInsId, EscInsNom }) => new DataRadioButton(EscInsId, EscInsNom)
  );

export const getColFromMovil = (col: Movil[]) =>
  col.map(({ MovCod }) => new DataRadioButton(MovCod, MovCod.toString()));

export const validarColeccion = (coleccion: any[], mensaje: string) => {
  if (coleccion.find(({ value }) => value === null) || coleccion.length === 0) {
    errorMensaje('Error', mensaje);
    return;
  }
};

export const stringIsNumber = (value) => isNaN(Number(value)) === false;

export const enumToArray = (enumme: any) =>
  Object.keys(enumme)
    .filter(stringIsNumber)
    .map((key) => enumme[key]);
