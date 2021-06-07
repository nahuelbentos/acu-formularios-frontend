export class DiarioMovil{
  constructor(
    public  id?: number,
    public  instructorId?: string,
    public  desperfecto?:string,
    public  fechaCreacion?: Date,
    public  lucesDelanterasCortasIzquierda?: boolean,
    public  lucesDelanterasLargasIzquierda?: boolean,
    public  lucesDelanterasSenialeroIzquierdo?: boolean,
    public  lucesDelanterasCortasDerecha?: boolean,
    public  lucesDelanterasLargasDerecha?: boolean,
    public  lucesDelanterasSenialeroDerecho?: boolean,
    public  lucesTraserasPosicionIzquierda?: boolean,
    public  lucesTraserasPosicionDerecha?: boolean,
    public  lucesTraserasSenialeroIzquierdo?: boolean,
    public  lucesTraserasSenialeroDerecho?: boolean,
    public  lucesTraserasReversa?: boolean,
    public  lucesTraserasFreno?: boolean,
    public  movilId?: number,
    public  movilKilometraje?: number,
    public  nivelAgua?: boolean,
    public  nivelAceite?: boolean,
    public  objetoAuxiliar?: boolean,
    public  objetoBaliza?: boolean,
    public  objetoExtintor?: boolean,
    public  objetoConos?: boolean,
    public  combustible?: boolean,
    public  observaciones?: string,
  ){}
}