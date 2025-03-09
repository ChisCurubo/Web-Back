import AbstractPermiso from '../AbstractTypes/AbstractPermiso';
import AbstractRol from '../AbstractTypes/AbstractRol';
import NullPermiso from './NullPermiso';


export default class NullRol extends AbstractRol {
  public override isNull(): boolean {
    return true;
  }
  constructor() {
    super({
      idRol: 0,
      nombreRol: '',
      descripcionRol: '',
      estadoRol: false,
      permisos: [new NullPermiso()]
    });
  }

  public override setIdRol(_id: number): void { return}
  public override setNombreRol(_nombre: string): void { return }
  public override setDescripcionRol(_descripcion: string): void { return }
  public override setEstadoRol(_estado: boolean): void { return }
  public override setPermisos(_permisos: AbstractPermiso[]): void { return }

  public toString(): string {
      return `NullRol {
          idRol: 0,
          nombreRol: "N/A",
          descripcionRol: "N/A",
          estadoRol: false,
          permisos: [${this.permisos.map(p => p.toString()).join(", ")}]
      }`;
  }
}
