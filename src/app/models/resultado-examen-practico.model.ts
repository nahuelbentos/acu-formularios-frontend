import { ResultadoExamen } from './resultado-examen.enum';
import { MotivoReprobacionPista } from './motivo-reprobacion-pista.enum';
import { MotivoReprobacionCalle } from './motivo-reprobacion-calle.enum';

export class ResultadoExamenPractico{
  constructor(
    public  id: number,
    public  alumnoNombreApellido: string,
    public  detalleMotivoPerdida: string,
    public  escInsId: string,
    public  esAlumnoOtroInstructor: boolean,
    public  fechaCreacion: Date,
    public  instructorAlumnoId: string,
    public  motivoReprobacionPista: MotivoReprobacionPista,
    public  motivoReprobacionCalle: MotivoReprobacionCalle,
    public  resultado: ResultadoExamen,
  ){}
}
