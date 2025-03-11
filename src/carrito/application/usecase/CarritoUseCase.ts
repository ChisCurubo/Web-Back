
import { Carrito } from "../../domain/carrito/Carrito";
import { ItemCarrito } from "../../domain/carrito/ItemCarrito";
import NullCarrito from "../../domain/carrito/NullTypes/NullCarrito";

import CarritoServiceInterface from "../../domain/interfaces/CarritoServiceInterface";
import CarritoDriverPort from "../../domain/port/driver/carrito/CarritoDriverPort";

export default class CarritoUseCase implements CarritoDriverPort {


  constructor(
      private readonly carritoService: CarritoServiceInterface
  ) {}

  /**
   * Retrieves the full shopping cart for a user
   * @param token - User authentication token
   * @returns Promise with the user's shopping cart
   */
  async getCarrito(token: string): Promise<ItemCarrito[]> {
    try {
      return await this.carritoService.getCarrito(token);
    } catch (error) {
      console.error('Error in getCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to retrieve cart: ${err.message}`);
    }
  }

  /**
   * Retrieves a summarized version of the shopping cart
   * @param token - User authentication token
   * @returns Promise with the summarized shopping cart
   */
  async getCarritoResumido(_token: string): Promise<Carrito> {
    try {
      return new NullCarrito()
     // TODO hacer la logica aca
    } catch (error) {
      console.error('Error in getCarritoResumido:', error);
      const err = error as Error;
      throw new Error(`Failed to retrieve cart summary: ${err.message}`);
    }
  }

  /**
   * Adds a product to the shopping cart
   * @param token - User authentication token
   * @param producto - Product ID to add
   * @param cantidad - Quantity to add
   * @returns Promise with operation result
   */
  async addProductoCarrito(token: string, producto: number): Promise<boolean> {
    try {
      return await this.carritoService.addProductoCarrito(token, producto);
    } catch (error) {
      console.error('Error in addProductoCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to add product to cart: ${err.message}`);
    }
  }

  /**
   * Removes a product from the shopping cart
   * @param token - User authentication token
   * @param producto - Product ID to remove
   * @returns Promise with operation result
   */
  async deleteProductoCarrito(token: string, producto: number): Promise<boolean> {
    try {
      return await this.carritoService.deleteProductoCarrito(token, producto);
    } catch (error) {
      console.error('Error in deleteProductoCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to remove product from cart: ${err.message}`);
    }
  }

  /**
   * Changes the status of the shopping cart (e.g., for checkout)
   * @param token - User authentication token
   * @returns Promise with operation result
   */
  async changeStatusCarrito(token: string): Promise<boolean> {
    try {
      return await this.carritoService.changeStatusCarrito(token);
    } catch (error) {
      console.error('Error in changeStatusCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to change cart status: ${err.message}`);
    }
  }

  /**
   * Calculates the total amount of the shopping cart
   * @param token - User authentication token
   * @returns Promise with the total amount
   */
  async getTotalCarrito(token: string): Promise<number> {
    try {
      return await this.carritoService.getTotalCarrito(token);
    } catch (error) {
      console.error('Error in getTotalCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to calculate cart total: ${err.message}`);
    }
  }

  /**
   * Retrieves a specific product from the shopping cart
   * @param idCarritoProducto - Cart product ID
   * @returns Promise with the cart product
   */
  async getCarritoProducto(idCarritoProducto: number): Promise<ItemCarrito> {
    try {
      return await this.carritoService.getCarritoProdcuto(idCarritoProducto); 
    } catch (error) {
      console.error('Error in getCarritoProducto:', error);
      throw new Error(`Failed to retrieve cart product: ${(error as Error).message}`);
    }
  }
  

  /**
   * Creates a new shopping cart for a user
   * @param token - User authentication token
   * @returns Promise with operation result
   */
  createCarrito = async (token: string): Promise<boolean> => {
    try {
      return await this.carritoService.createCarrito(token);
    } catch (error) {
      console.error('Error in createCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to create cart: ${err.message}`);
    }
  }

  /**
   * Increases the quantity of a product in the shopping cart
   * @param token - User authentication token
   * @returns Promise with operation result
   */
  aumentaCanitadItemProductoCarrito = async (token: string, producto: number): Promise<boolean> => {
    try {
      return await this.carritoService.aumentaCanitadItemProductoCarrito(token,producto);
    } catch (error) {
      console.error('Error in aumentaCanitadItemProductoCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to increase product quantity: ${err.message}`);
    }
  }

  /**
   * Decreases the quantity of a product in the shopping cart
   * @param token - User authentication token
   * @returns Promise with operation result
   */
  disminuyeCantidadItemProductoCarrito = async (token: string, producto: number): Promise<boolean> => {
    try {
      return await this.carritoService.disminuyeCantidadItemProductoCarrito(token,producto);
    } catch (error) {
      console.error('Error in disminuyeCantidadItemProductoCarrito:', error);
      const err = error as Error;
      throw new Error(`Failed to decrease product quantity: ${err.message}`);
    }
  }
}