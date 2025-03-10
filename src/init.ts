import AuthRouterFactory from './auth/infrastructure/express/factory/AuthRouterFactory'
import ServerFactory from './express/infrastructure/factory/ServerFactory'
import FavoritoRouterFactory from './favoritos/infrastructure/express/factory/FavoritoRouterFactory'
import MovieRouterFactory from './movies/infrastructure/express/factory/MovieRouterFactory'
import ProductoRouterFactory from './producto/infrastructure/express/factory/ProductoRouterFactory'
import UsuarioRouterFactory from './usuario/infrastructure/factory/UsuarioRouterFactory'

const movieRouter = MovieRouterFactory.create()
const usuarioRouter = UsuarioRouterFactory.create()
const authRouter = AuthRouterFactory.create()
const productoRouter = ProductoRouterFactory.create()
const favoritoRouter = FavoritoRouterFactory.create()

const routes = [movieRouter, usuarioRouter, authRouter, productoRouter,favoritoRouter]

const server = ServerFactory.create(routes)
server.initDB()
server.start()
