import AbstractDescuento from '../AbstractTypes/AbstractDescuento';

export  default class NullDescuento extends AbstractDescuento {

  constructor() {
    super({
      idDescuento: 0,
      nombreDescuento: "N/A",
      estadoDescuento: false,
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };

  public  override setIdDescuento(_id: number): void {
    return
}

public override setNombreDescuento(_nombre: string): void {
    return
}

public override setEstadoDescuento(_estado: boolean): void {
    return
}


  public toString(): string {
    return `NullDescuento {
        idDescuento: 0,
        nombreDescuento: "N/A",
        estadoDescuento: false
    }`;
}
}
