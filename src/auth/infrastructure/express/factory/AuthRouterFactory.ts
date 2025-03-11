import AuthUseCase from "../../../application/usecase/AuthUseCase";
import AuthRolesPermisoUseCase from "../../../application/usecase/AuthRolesPermisoUseCase";
import AuthControllerExpress from "../../express/controller/AuthControllerExpress";
import AuthRouterExpress from "../router/AuthRouterExpress";
import RouterExpressInterface from "../../../../express/domain/RouterExpressInterface";
import AuthService from "../../../application/service/AuthService";
import AuthRepositoryInfraestructure from "../../repository/AuthRepositoryInfraestructure";
import MysqlRolesToRoles from "../../repository/RolToRol";
import MysqlPermisosToPermisos from "../../repository/PermisoToPermiso";
import MysqlAuthRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlAuth";
import MysqlUsuariosToUsuarios from "../../../../usuario/infrastructure/repository/UsuarioToUsuario";
import AuthRolPermisoService from "../../../application/service/AuthRolPermisoService";
import ByCriptRepo from "../../../../bycrypt/infrastructure/security/ByCriptRepo";
import UserRepositoryInfraestructure from "../../../../usuario/infrastructure/repository/UsuarioRepository";
import MysqlUsuarioRepository from "../../../../mysql/infrastructure/db/UsuarioSQL/MysqlUsuarioI";
import JwtRepo from "../../../../jwt/infrastructure/tokken/JwtokenRepo";

export default class AuthRouterFactory {
  public static create(): RouterExpressInterface {
    // Instanciar conversores
    const permisoToPermiso = new MysqlPermisosToPermisos();
    const rolToRol = new MysqlRolesToRoles(permisoToPermiso);
    const usuarioToUsuario = new MysqlUsuariosToUsuarios();

    // Instanciar repositorios
    const mysqlAuthRepository = new MysqlAuthRepository();
    const bycriptInterface = new ByCriptRepo();
    const jwtRepo = new JwtRepo()
    const mysqlUsuario = new MysqlUsuarioRepository
    
    // Crear el repositorio de usuario
    const usuarioRepo = new UserRepositoryInfraestructure(
      mysqlUsuario, // Repositorio MySQL para usuarios
      usuarioToUsuario,    // Conversor de usuarios
      rolToRol             // Conversor de roles
    );
    
    // Crear el repositorio de autenticación
    const authRepository = new AuthRepositoryInfraestructure(
      mysqlAuthRepository, 
      usuarioToUsuario, 
      rolToRol, 
      permisoToPermiso, 
      bycriptInterface
    );

    // Crear los servicios
    const authService = new AuthService(authRepository, usuarioRepo);
    const authRolPermisoService = new AuthRolPermisoService(authRepository);
    
    // Crear los casos de uso
    const authRolesPermisoUseCase = new AuthRolesPermisoUseCase(authRolPermisoService);
    const authUseCase = new AuthUseCase(authService, jwtRepo);

    // Crear el controlador
    const authController = new AuthControllerExpress(authUseCase, authRolesPermisoUseCase);

    // Retornar el router
    return new AuthRouterExpress(authController);
  }
}
