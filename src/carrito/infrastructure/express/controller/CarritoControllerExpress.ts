import { Request, Response } from 'express'
import CarritoControllerExpressInterface from '../../../domain/interfaces/CarritoControllerExpressInterface'
import CarritoUseCasePort from '../../../domain/ports/CarritoUseCasePort'



export default class CarritoControllerExpress
  implements CarritoControllerExpressInterface
{
  constructor(
    private readonly carritoUseCase: CarritoUseCasePort,
  ) {}

  /**
   * Retrieves the current user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public getCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const carrito = await this.carritoUseCase.getCarrito(userId);

      if (carrito === null|| carrito === undefined) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }

      res.status(200).json(carrito);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: 'Error retrieving cart', error: err.message });
    }
  }

  /**
   * Retrieves a summarized version of the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public getCarritoResumido = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const carrito = await this.carritoUseCase.getCarritoResumido(userId);

      if (carrito === null|| carrito === undefined) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }

      res.status(200).json( carrito );
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart summary', error: error.message });
    }
  }

  /**
   * Retrieves a specific cart by its ID
   * @param req - Express request object
   * @param res - Express response object
   */
  public getCarritoByIdCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params['id'];
      if (!id) {
        res.status(400).json({ message: 'Invalid cart ID' });
        return;
      }

      const carrito = await this.carritoUseCase.getCarritoById(id);

      if (carrito === null|| carrito === undefined) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }

      res.status(200).json(carrito);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
  }

  /**
   * Adds an item to the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public addItemToCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const { itemId, quantity } = req.body;
      if (!itemId) {
        res.status(400).json({ message: 'Item ID is required' });
        return;
      }

      const result = await this.carritoUseCase.addItemToCarrito(userId, itemId, quantity || 1);
      
      res.status(200).json({ 
        message: 'Item added to cart successfully',
        carrito: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
  }

  /**
   * Creates a new shopping cart for the user
   * @param req - Express request object
   * @param res - Express response object
   */
  public createCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const result = await this.carritoUseCase.createCarrito(userId);
      
      res.status(201).json({ 
        message: 'Cart created successfully',
        carrito: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating cart', error: error.message });
    }
  }

  /**
   * Calculates and returns the total amount of the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public getTotalCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const total = await this.carritoUseCase.getTotalCarrito(userId);
      
      res.status(200).json({ total });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating cart total', error: error.message });
    }
  }

  /**
   * Removes an item from the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public deleteItemFromCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const itemId = req.params['itemId'];
      if (!itemId) {
        res.status(400).json({ message: 'Item ID is required' });
        return;
      }

      const result = await this.carritoUseCase.deleteItemFromCarrito(userId, itemId);
      
      res.status(200).json({ 
        message: 'Item removed from cart successfully',
        carrito: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
  }

  /**
   * Increases the quantity of a specific item in the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public aumentaCanitadItemProductoCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const itemId = req.params['itemId'];
      if (!itemId) {
        res.status(400).json({ message: 'Item ID is required' });
        return;
      }

      const { quantity } = req.body;
      const incrementAmount = quantity || 1;

      const result = await this.carritoUseCase.incrementItemQuantity(userId, itemId, incrementAmount);
      
      res.status(200).json({ 
        message: 'Item quantity increased successfully',
        carrito: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error increasing item quantity', error: error.message });
    }
  }

  /**
   * Decreases the quantity of a specific item in the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public disminuyeCantidadItemProductoCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const itemId = req.params['itemId'];
      if (!itemId) {
        res.status(400).json({ message: 'Item ID is required' });
        return;
      }

      const { quantity } = req.body;
      const decrementAmount = quantity || 1;

      const result = await this.carritoUseCase.decrementItemQuantity(userId, itemId, decrementAmount);
      
      res.status(200).json({ 
        message: 'Item quantity decreased successfully',
        carrito: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error decreasing item quantity', error: error.message });
    }
  }

  /**
   * Updates the status of the user's shopping cart (e.g., for checkout process)
   * @param req - Express request object
   * @param res - Express response object
   */
  public updateStatusCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const { status } = req.body;
      if (!status) {
        res.status(400).json({ message: 'Status is required' });
        return;
      }

      const result = await this.carritoUseCase.updateStatusCarrito(userId, status);
      
      res.status(200).json({ 
        message: 'Cart status updated successfully',
        carrito: result
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart status', error: error.message });
    }
  }

  /**
   * Deletes the user's shopping cart
   * @param req - Express request object
   * @param res - Express response object
   */
  public deleteCarrito = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      await this.carritoUseCase.deleteCarrito(userId);
      
      res.status(200).json({ 
        message: 'Cart deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting cart', error: error.message });
    }
  }
}