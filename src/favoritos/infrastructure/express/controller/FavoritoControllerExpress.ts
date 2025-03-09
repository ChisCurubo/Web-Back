import { Request, Response } from 'express'
import FavoritoControllerExpressInterface from '../../../domain/interfaces/FavoritoControllerExpressInterface'
import FavoritosDriverPort from '../../../domain/port/driver/favoritos/FavoritosDriver'
import { Producto } from '../../../../producto/domain/producto/Producto';


export default class FavoritoControllerExpress
  implements FavoritoControllerExpressInterface
{
  constructor(
    private readonly favoritosDriver: FavoritosDriverPort,

  ) {}

  private extractToken(req: Request): string | null {
    const token = req.headers.authorization;
    return token ? token.replace('Bearer ', '') : null;
  }

  public getFavoritosUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = this.extractToken(req);
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const favoritos = this.favoritosDriver.getfavoritos(token);
      res.status(200).json({ favoritos });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  public deleteFavoritoUse = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = this.extractToken(req);
      const productoId = req.params['id'];
      if (!token || !productoId) {
        res.status(400).json({ message: 'Bad Request' });
        return;
      }

      const success = this.favoritosDriver.deleteProductoFavoritos(token, Number(productoId));
      if (success) {
        res.status(200).json({ message: 'Producto removed from favoritos' });
      } else {
        res.status(404).json({ message: 'Producto not found in favoritos' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  public addFavoritoUse = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = this.extractToken(req);
      const producto: Producto = req.body;
      if (!token || !producto) {
        res.status(400).json({ message: 'Bad Request' });
        return;
      }
      const success = this.favoritosDriver.addProdcutoFavoritos(token, producto);
      if (success) {
        res.status(201).json({ message: 'Producto added to favoritos' });
      } else {
        res.status(409).json({ message: 'Producto already in favoritos' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }


  public getMovies = (_req: Request, res: Response): void => {
    const movies = this.movieUseCase.getMovies()
    const movies_json = MovieToJson.get(movies)

    if(movies_json.length === 0) {
      res.status(404).json({ message: 'Movies not found' })
    }

    res.status(200).json({movies: movies_json})
  }

  public getMovieById = (req: Request, res: Response): void => {
    const id = req.params['id']
    if(!id){
      res.status(404).json({ message: 'idNoVaid' })
    }
    const idNumber = Number(id)
    const moviesById = this.movieUseCaseById.getMoviesById(idNumber.);
    const movies_json = MovieToJson.get([moviesById])

    if(movies_json.length === 0) {
      res.status(404).json({ message: 'Movies not found' })
    }

    res.status(200).json({movies: movies_json})
  }
}
