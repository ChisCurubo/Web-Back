import AbstractCarrito from "../../carrito/AbstractTypes/AbstractCarrito";
import AbstractFavoritos from "../../favorito/AbstractTypes/AbstractFavoritos";
import AbstractRol from "../../roles/AbstractTypes/AbstractRol";
import { Usuario } from "../interface/UsuarioInterface";

export default abstract class AbstractUsuario {
  protected ci: string;
  protected nombreUsuario: string;
  protected apellidoUsuario: string;
  protected correoUsuario: string;
  protected contrasenaUsuario: string;
  protected estadoUsuario: boolean;
  protected rolUsuario: AbstractRol;
  protected carrito: AbstractCarrito[];
  protected favoritos: AbstractFavoritos[];

  constructor(usuarioAttributes: Usuario) {
    this.ci = usuarioAttributes.ci;
    this.nombreUsuario =usuarioAttributes.nombreUsuario;
    this.apellidoUsuario = usuarioAttributes.apellidoUsuario;
    this.correoUsuario = usuarioAttributes.correoUsuario;
    this.contrasenaUsuario = usuarioAttributes.contrasenaUsuario; 
    this.estadoUsuario = usuarioAttributes.estadoUsuario;
    this.rolUsuario = usuarioAttributes.rolUsuario;
    this.carrito = usuarioAttributes.carrito;
    this.favoritos = usuarioAttributes.favoritos;
  }

  public abstract isNull(): boolean;
  public abstract toString(): string;

  //Getters -----------------------------------
  public getCi(): string {
    return this.ci;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  public getApellidoUsuario(): string {
    return this.apellidoUsuario;
  }

  public getCorreoUsuario(): string {
    return this.correoUsuario;
  }

  public getContrasenaUsuario(): string {
    return this.contrasenaUsuario;
  }

  public getEstadoUsuario(): boolean {
    return this.estadoUsuario;
  }

  public getRolUsuario(): AbstractRol {
    return this.rolUsuario;
  }

  public getCarrito(): AbstractCarrito[] {
    return this.carrito;
  }

  public getFavoritos(): AbstractFavoritos[] {
    return this.favoritos;
  }

  //Setters con validaciones -------------------
  public setCi(ci: string): void {
    if(this.validateCi(ci)) {
      console.error('El CI debe contener solo números.')
      return
  }
    this.ci = ci;
  }

  public setNombreUsuario(nombre: string): void {
    if(this.validateString(nombre, 2, 30)) {
      console.error(`Verificar Nombre del usuario`)
      return
  }
    this.nombreUsuario = nombre;
  }

  public setApellidoUsuario(apellido: string): void {
    if(this.validateString(apellido, 2, 25)) {
      console.error(`Verificar Apellido del usuario`)
      return
  }
    this.apellidoUsuario = apellido;
  }

  public setCorreoUsuario(correo: string): void {
    if(this.validateEmail(correo)) {
      console.error('Correo no valido')
      return
  }
    this.correoUsuario = correo;
  }

  // TODO: Verificar contraseñas encriptadas
  public setContrasenaUsuario(contrasena: string): void {
    this.contrasenaUsuario = contrasena; 
  }

  public setEstadoUsuario(estado: boolean): void {
    this.estadoUsuario = estado;
  }

  public setRolUsuario(rol: AbstractRol): void {
    this.rolUsuario = rol;
  }

  public setCarrito(carrito: AbstractCarrito[]): void {
    if(this.validateArray(carrito)) {
      console.error(`Verificar Carrito del usuario`)
      return
  }
    this.carrito = carrito;
  }

  public setFavoritos(favoritos: AbstractFavoritos[]): void {
    if(this.validateArray(favoritos)) {
      console.error(`Verificar favorito del usuario`)
      return
  }
    this.favoritos = favoritos;
  }

  //Validación ---------------------
  private readonly validateCi = (ci: string): boolean => !/^\d+$/.test(ci);

  private readonly validateEmail = (email: string): boolean => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regexCorreo.test(email);
  };

  private validateArray= (objeto: AbstractCarrito[]| AbstractFavoritos[]): boolean =>
    !Array.isArray(objeto)

  private readonly validateString = (value: string, min: number, max: number): boolean =>
    value === '' || value.length > max || value.length < min  

}
