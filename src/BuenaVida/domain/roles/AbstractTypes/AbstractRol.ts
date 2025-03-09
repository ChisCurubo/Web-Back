import { Rol } from "../interface/RolInterface";
import AbstractPermiso from "./AbstractPermiso";

export default abstract class AbstractRol {
  protected idRol: number;
  protected nombreRol: string;
  protected descripcionRol: string;
  protected estadoRol: boolean;
  protected permisos: AbstractPermiso[];

  constructor(rolAttributes: Rol) {
    this.idRol = rolAttributes.idRol;
    this.nombreRol = rolAttributes.nombreRol;
    this.descripcionRol = rolAttributes.descripcionRol;
    this.estadoRol = rolAttributes.estadoRol;
    this.permisos = rolAttributes.permisos;
  }

  public abstract isNull(): boolean;
  public abstract toString(): string;

  //Getters -----------------------------------
  public getIdRol(): number {
    return this.idRol;
  }

  public getNombreRol(): string {
    return this.nombreRol;
  }

  public getDescripcionRol(): string {
    return this.descripcionRol;
  }

  public getEstadoRol(): boolean {
    return this.estadoRol;
  }

  public getPermisos(): AbstractPermiso[] {
    return this.permisos;
  }

  //Setters con validaciones -------------------
  public setIdRol(id: number): void {
    if(this.validateNumber(id,0)){
      return
    }
    this.idRol = id;
  }

  public setNombreRol(nombre: string): void {
    if(this.validateString(nombre, 2, 25)){
      return
    }
    this.nombreRol = nombre;
  }

  public setDescripcionRol(descripcion: string): void {
    this.descripcionRol = descripcion;
  }

  public setEstadoRol(estado: boolean): void {
    this.estadoRol = estado;
  }

  public setPermisos(permisos: AbstractPermiso[]): void {
    if(this.validateArray(permisos)){
      return
    }
    this.permisos = permisos;
  }

  //Validación ---------------------
  private readonly validateArray = (permisos : AbstractPermiso[]): boolean => 
    !Array.isArray(permisos) ;


  private readonly validateNumber = (value: number, min: number = 1): boolean => 
    value < min || isNaN(value);


  private readonly validateString = (value: string, min: number, max: number): boolean =>
      value === '' || value.length > max || value.length < min   

}
