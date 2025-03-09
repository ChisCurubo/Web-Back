import { Permiso } from "../interface/PermisoInterface";

export default abstract class AbstractPermiso {
    protected idPermiso: number;
    protected nombrePermiso: string;
    protected tipo: string;
    protected estadoPermiso: boolean;

    constructor(permisoAttributes: Permiso) {
        this.idPermiso = permisoAttributes.idPermiso;
        this.nombrePermiso = permisoAttributes.nombrePermiso;
        this.tipo = permisoAttributes.tipo;
        this.estadoPermiso = permisoAttributes.estadoPermiso;
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

    public getTipo(): string {
        return this.tipo;
    }

    public getEstadoPermiso(): boolean {
        return this.estadoPermiso;
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

    public setTipo(tipo: string): void {
        if(this.validateString(tipo,2,25)){
            return
        }
        this.tipo = tipo;
    }

    public setEstadoPermiso(estado: boolean): void {
        this.estadoPermiso = estado;
    }

    //Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean => 
        value < min || isNaN(value);


    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === '' || value.length > max || value.length < min   
    
}
