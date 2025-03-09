import AbstractPermiso from "../AbstractTypes/AbstractPermiso";

export default class NullPermiso extends AbstractPermiso {
    public override isNull(): boolean {
        return true;
    }
    constructor() {
        super({
        idPermiso: 0,
        nombrePermiso: '',
        tipo: '',
        estadoPermiso: false
        });
    }

    public override setIdPermiso(_id: number): void { return }
    public override setNombrePermiso(_nombre: string): void { return }
    public override setTipo(_tipo: string): void { return }
    public override setEstadoPermiso(_estado: boolean): void { return }

    public toString(): string {
        return `NullPermiso {
            idPermiso: 0,
            nombrePermiso: "N/A",
            tipo: "N/A",
            estadoPermiso: false
        }`;
    }
}