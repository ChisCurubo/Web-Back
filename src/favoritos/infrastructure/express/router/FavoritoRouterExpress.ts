import { Router } from 'express'
import FavoritoRouterExpressInterface from '../../../domain/interfaces/FavoritoRouterExpressInterface'
import FavoritoControllerExpressInterface from '../../../domain/interfaces/FavoritoControllerExpressInterface'


export default class FavoritoRouterExpress implements FavoritoRouterExpressInterface {
  router: Router
  path: string

  constructor(
    private readonly movieController: FavoritoControllerExpressInterface
  ) {
    this.router = Router()
    this.path = '/movies/v1.0'
    this.routes()
  }
  public routes = (): void => {
    this.configureGetFavoritos();
    this.configureAddFavoritos();
    this.configureDeleteFavoritos();
  }

  configureGetFavoritos = (): void => {
    this.router.get('/favoritos', this.movieController.getFavoritosUser.bind(this.movieController))
  }

  configureAddFavoritos = (): void => {
    this.router.post('/favoritos', this.movieController.addFavoritoUse.bind(this.movieController))
  }

  configureDeleteFavoritos = (): void => {
    this.router.delete('/favoritos/:id', this.movieController.deleteFavoritoUse.bind(this.movieController))
  }



}
