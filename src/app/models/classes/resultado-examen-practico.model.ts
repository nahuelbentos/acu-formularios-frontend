import { MotivoReprobacionPista } from '../enums/motivo-reprobacion-pista.enum';
import { MotivoReprobacionCalle } from '../enums/motivo-reprobacion-calle.enum';
import { ResultadoExamen } from '../enums/resultado-examen.enum';


export class ResultadoExamenPractico{
  constructor(
    public  id?: number,
    public  escInsId?: string,
    public  alumnoNombreApellido?: string,
    public  esAlumnoOtroInstructor?: boolean,
    public  instructorAlumnoId?: string,
    public  resultado?: ResultadoExamen,
    public  motivoReprobacionPista?: MotivoReprobacionPista,
    public  motivoReprobacionCalle?: MotivoReprobacionCalle,
    public  detalleMotivoPerdida?: string,
    public  fechaCreacion?: Date,
  ){}
}
