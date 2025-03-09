import { Categoria } from "../interface/CategoriaInterface";

export default abstract class AbstractCategoria {
    protected idCategoria: number;
    protected nombreCategoria: string;
    protected descripcion: string;

    constructor(categoriaAttributes: Categoria) {
        this.idCategoria = categoriaAttributes.idCategoria;
        this.nombreCategoria = categoriaAttributes.nombreCategoria;
        this.descripcion = categoriaAttributes.descripcion;
    }

    public abstract isNull(): boolean;
    public  abstract toString(): string ;

    //Getters -----------------------------------
    public getIdCategoria(): number {
        return this.idCategoria;
    }

    public getNombreCategoria(): string {
        return this.nombreCategoria;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    //Setters con validaciones -------------------
    public setIdCategoria(id: number): void {
        if(this.validateNumber(id,0)){
            return
        }
        this.idCategoria = id;
    }

    public setNombreCategoria(nombre: string): void {
        if(this.validateString(nombre, 5, 30)) {
            return
        }
        this.nombreCategoria = nombre;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    //Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean => 
        value < min || isNaN(value);

    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === '' || value.length > max || value.length < min  

}
