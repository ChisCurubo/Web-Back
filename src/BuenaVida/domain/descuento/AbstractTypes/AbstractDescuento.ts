import { Descuento } from "../interface/DescuentosInterface";

export default abstract class AbstractDescuento {
    protected idDescuento: number;
    protected nombreDescuento: string;
    protected estadoDescuento: boolean;

    constructor(descuentoAttributes: Descuento) {
        this.idDescuento = descuentoAttributes.idDescuento;
        this.nombreDescuento = descuentoAttributes.nombreDescuento;
        this.estadoDescuento = descuentoAttributes.estadoDescuento;
    }

    public abstract isNull(): boolean;
    public abstract toString(): string;

    //Getters -----------------------------------
    public getIdDescuento(): number {
        return this.idDescuento;
    }

    public getNombreDescuento(): string {
        return this.nombreDescuento;
    }

    public getEstadoDescuento(): boolean {
        return this.estadoDescuento;
    }

    //Setters con validaciones -------------------
    public setIdDescuento(id: number): void {
        if(this.validateNumber(id,0)){
            return
        }
        this.idDescuento = (id);
    }

    public setNombreDescuento(nombre: string): void {
        if(this.validateString(nombre, 2, 25)) {
            return
        }
        this.nombreDescuento = nombre.trim();
    }

    public setEstadoDescuento(estado: boolean): void {
        this.estadoDescuento = estado;
    }

    //Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean => 
        value < min || isNaN(value);


    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === '' || value.length > max || value.length < min    
}
