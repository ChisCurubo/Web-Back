import AbstractRol from './AbstractTypes/AbstractRol';


export class Rol extends AbstractRol {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public override toString(): string {
    return `Rol {
        idRol: ${this.idRol},
        nombreRol: "${this.nombreRol}",
        descripcionRol: "${this.descripcionRol}",
        estadoRol: ${this.estadoRol},
        permisos: [${this.permisos.map(p => p.toString()).join(", ")}]
    }`;
}

}
