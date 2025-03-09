import AbstractCategoria from '../AbstractTypes/AbstractCategoria';

export default class NullCategoria extends AbstractCategoria {
  constructor() {
    super({
      idCategoria: 0,
      nombreCategoria: "N/A",
      descripcion: "Sin descripción",
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };

  public override setIdCategoria(_id: number): void {
    return
  }

  public override setNombreCategoria(_nombre: string): void {
      return
  }

  public override setDescripcion(_descripcion: string): void {
      return
  }

  public toString(): string {
      return `NullCategoria {
          idCategoria: 0,
          nombreCategoria: "N/A",
          descripcion: "Sin descripción"
      }`;
  }


}
