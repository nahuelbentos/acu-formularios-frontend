export class UsuarioSesion {
  constructor(
    public nombres: string,
    public apellidos?: string,
    public emailPersonal?: string,
    public CI?: string,
    public token?: string,
    public email?: string,
    public userName?: string,
    public rol?: string
  ) {}
}
