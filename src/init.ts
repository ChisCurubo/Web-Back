import AuthRouterFactory from './auth/infrastructure/express/factory/AuthRouterFactory'
import ServerFactory from './express/infrastructure/factory/ServerFactory'
import MovieRouterFactory from './movies/infrastructure/express/factory/MovieRouterFactory'
import ProductoRouterFactory from './producto/infrastructure/express/factory/ProductoRouterFactory'
import UsuarioRouterFactory from './usuario/infrastructure/factory/UsuarioRouterFactory'

const movieRouter = MovieRouterFactory.create()
const usuarioRouter = UsuarioRouterFactory.create()
const authRouter = AuthRouterFactory.create()
const productoRouter = ProductoRouterFactory.create()

const routes = [movieRouter, usuarioRouter, authRouter, productoRouter]

const server = ServerFactory.create(routes)
server.initDB()
server.start()
