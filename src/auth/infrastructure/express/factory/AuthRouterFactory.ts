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

export default class AuthRouterFactory {
  public static create(): RouterExpressInterface {
    // Instanciar conversores
    const permisoToPermiso = new MysqlPermisosToPermisos();
    const rolToRol = new MysqlRolesToRoles(permisoToPermiso);
    const usarioToRol = new MysqlUsuariosToUsuarios()

    // Instanciar repositorio
    const mysqlAuthRepository = new MysqlAuthRepository();
    const authRepository = new AuthRepositoryInfraestructure(mysqlAuthRepository,usarioToRol, rolToRol, permisoToPermiso);

    // Crear los servicios y casos de uso
    const authService = new AuthService(authRepository);
    const authRolPermisoervice = new AuthRolPermisoService(authRepository);
    const authRolesPermisoUseCase = new AuthRolesPermisoUseCase(authRolPermisoervice);
    const authUseCase = new AuthUseCase(authService);

    // Crear el controlador
    const authController = new AuthControllerExpress(authUseCase, authRolesPermisoUseCase);

    // Retornar el router
    return new AuthRouterExpress(authController);
  }
}
