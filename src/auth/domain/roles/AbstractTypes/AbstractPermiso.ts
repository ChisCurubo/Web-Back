import { Permiso } from "../interface/PermisoInterface";

export default abstract class AbstractPermiso {
    protected idPermiso: number;
    protected nombrePermiso: string;
    protected descripcionPermiso: string;

    constructor(permisoAttributes: Permiso) {
        this.idPermiso = permisoAttributes.idPermiso;
        this.nombrePermiso = permisoAttributes.nombrePermiso;
        this.descripcionPermiso = permisoAttributes.descripcionPermiso;
    }

    public abstract isNull(): boolean;
    public abstract toString(): string;

    //Getters -----------------------------------
    public getIdPermiso(): number {
        return this.idPermiso;
    }

    public getNombrePermiso(): string {
        return this.nombrePermiso;
    }

    public getdescripcionPermiso(): string {
        return this.descripcionPermiso;
    }


    //Setters con validaciones -------------------
    public setIdPermiso(id: number): void {        
        if(this.validateNumber(id,0)){
            return
        }
        this.idPermiso = id;
    }

    public setNombrePermiso(nombre: string): void {
        if(this.validateString(nombre,3,10)){
            return
        }
        this.nombrePermiso = nombre;
    }

    public setdescripcionPermiso(descripcionPermiso: string): void {
        if(this.validateString(descripcionPermiso,2,25)){
            return
        }
        this.descripcionPermiso = descripcionPermiso;
    }


    //Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean => 
        value < min || isNaN(value);


    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === '' || value.length > max || value.length < min   
    
}
