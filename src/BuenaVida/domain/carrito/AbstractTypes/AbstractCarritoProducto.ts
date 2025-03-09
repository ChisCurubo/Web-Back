import AbstractProducto from "../../producto/AbstractTypes/AbstractProducto";
import CarritoProducto from "../interface/CarritoProductoInterface";

export default abstract class AbstractCarritoProducto {
    protected idCarritoProducto: number;
    protected idProducto: AbstractProducto[];
    protected horaCarritoProducto: Date[];

    constructor(carritoProductoInterface: CarritoProducto) {
        this.idCarritoProducto = carritoProductoInterface.idCarritoProducto;
        this.idProducto = carritoProductoInterface.idProducto;
        this.horaCarritoProducto = carritoProductoInterface.horaCarritoProducto;
    }

    public abstract isNull(): boolean;

    public  abstract toString(): string ;
      

    //Getters -----------------------------------
    public getIdCarritoProducto(): number {
        return this.idCarritoProducto;
    }

    public getIdProducto(): AbstractProducto[] {
        return this.idProducto;
    }

    public getHoraCarritoProducto(): Date[] {
        return this.horaCarritoProducto;
    }

    //Setters con validaciones -------------------
    public setIdCarritoProducto(id: number): void {
        if(this.validateNumber(id,0)){
            return
        }
        this.idCarritoProducto =id;
    }

    public setIdProducto(productos: AbstractProducto[]): void {
        if(this.validateArray(productos)){
            return
        }
        this.idProducto = productos;
    }

    public setHoraCarritoProducto(horas: Date[]): void {
        if(this.validateArray(horas)){
            return
        }
        if(this.validateDateArray(horas)){
            return
        }
        this.horaCarritoProducto =horas;
    }

    //Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean => 
        value < min || isNaN(value);

    /**
     * Validates whether a given array of dates contains any invalid date.
     * 
     * @param {Date[]} values - Array of dates to be validated.
     * @returns {boolean} - `true` if at least one date is invalid, otherwise `false`.
     */
    private readonly validateDateArray = (values: Date[]): boolean => {
        return values.some(date => isNaN(date.getTime()));
    };
      

    private readonly validateArray = (productos: AbstractProducto[]| Date[] ): boolean =>  !Array.isArray(productos) ;
 

    
}
