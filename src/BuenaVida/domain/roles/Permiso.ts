import AbstractPermiso from './AbstractTypes/AbstractPermiso';


export class Permiso extends AbstractPermiso {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public override toString(): string {
    return `Permiso {
        idPermiso: ${this.idPermiso},
        nombrePermiso: "${this.nombrePermiso}",
        tipo: "${this.tipo}",
        estadoPermiso: ${this.estadoPermiso}
    }`;
}

}
