
import { Carrito } from "../interface/CarritoInterface";
import AbstractCarritoProducto from "./AbstractCarritoProducto";

export default abstract class AbstractCarrito {
  protected idCarrito: number;
  protected statusCarrito: boolean;
  protected carritoProducto: AbstractCarritoProducto;
  protected totalCarrito: number;
  protected fechaCarrito: Date;

  constructor(carritoAttributes: Carrito) {
    this.idCarrito = carritoAttributes.idCarrito;
    this.statusCarrito = carritoAttributes.statusCarrito;
    this.totalCarrito =carritoAttributes.totalCarrito;
    this.carritoProducto = carritoAttributes.carritoProducto;
    this.fechaCarrito =carritoAttributes.fechaCarrito;
  }

  public abstract isNull: () => boolean;
  
  public abstract toString(): string;
  

  //Getters -----------------------------------------
  public getIdCarrito(): number {
    return this.idCarrito;
  }

  public getStatusCarrito(): boolean {
    return this.statusCarrito;
  }

  public getCarritoProducto(): AbstractCarritoProducto {
    return this.carritoProducto;
  }

  public getTotalCarrito(): number {
    return this.totalCarrito;
  }

  public getFechaCarrito(): Date {
    return this.fechaCarrito;
  }

  //Setters con validaciones --------------------------------
  public setIdCarrito(id: number): void {
    if(this.validateNumber(id,0)){
      return
    }
    this.idCarrito = id;
  }

  public setStatusCarrito(status: boolean): void {
    this.statusCarrito = status;
  }

  public setCarritoProducto(carritoProducto: AbstractCarritoProducto): void {
    this.carritoProducto = (carritoProducto);
  }

  public setTotalCarrito(total: number): void {
    if(this.validateNumber(total,0)){
      return
    }
    this.totalCarrito = (total);
  }

  public setFechaCarrito(fecha: Date): void {
    if(this.validateDate(fecha)){
      return
    }
    this.fechaCarrito = fecha;
  }

  //Validación ---------------------------------------
  
  private readonly validateNumber = (value: number, min: number = 1): boolean => 
    value < min || isNaN(value);
  
  private readonly validateDate = (value: Date): boolean => 
    isNaN(value.getTime());
}
