import RouterExpressInterface from "../../../../express/domain/RouterExpressInterface"
import MovieUseCase from "../../../application/usecase/MovieUseCase"
import MovieUseCaseById from "../../../application/usecase/MovieUseCaseByid"
import MovieControllerExpress from "../controller/CarritoControllerExpress"
import MovieRouterExpress from "../router/CarritoRouterExpress"


export default class MovieRouterFactory {
  public static create(): RouterExpressInterface {
    const movieUseCase = new MovieUseCase()
    const movieUseCaseById = new MovieUseCaseById()
    const movieController = new MovieControllerExpress(movieUseCase,movieUseCaseById)
    return new MovieRouterExpress(movieController)
  }
}
