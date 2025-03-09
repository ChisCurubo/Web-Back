import AbstractPermiso from "../AbstractTypes/AbstractPermiso";

export default class NullPermiso extends AbstractPermiso {
    public override isNull(): boolean {
        return true;
    }
    constructor() {
        super({
        idPermiso: 0,
        nombrePermiso: '',
        descripcionPermiso: ''
        });
    }

    public override setIdPermiso(_id: number): void { return }
    public override setNombrePermiso(_nombre: string): void { return }


    public toString(): string {
        return `NullPermiso {
            idPermiso: 0,
            nombrePermiso: "N/A",
            descripcion: "N/A",
        }`;
    }
}