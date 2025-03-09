import { Rol } from "../../../auth/domain/roles/Rol";
import { MysqlRol } from "../../../mysql/domain/rol/MySQLRol";
import MysqlPermisosToPermisos from "./PermisoToPermiso";

export default class MysqlRolesToRoles {
  constructor(
    private readonly permisoToPermiso: MysqlPermisosToPermisos
  ) {}

  public getArray = async (roles: MysqlRol[]): Promise<Rol[]> => {
    const rolesTransformados = roles.map(async (rol) => {
      return new Rol({
        idRol: rol.idRol,
        nombreRol: rol.nombreRol,
        permisos: await this.permisoToPermiso.getArray(rol.permisos ?? []),
      });
    });

    return Promise.all(rolesTransformados);
  };

  public get = async (rol: MysqlRol): Promise<Rol> => {
    return new Rol({
      idRol: rol.idRol,
      nombreRol: rol.nombreRol,
      permisos: await this.permisoToPermiso.getArray(rol.permisos ?? []),
    });
  };

  public teg = async (rol: Rol): Promise<MysqlRol> => {
    return {
        idRol: rol.getIdRol(),
        nombreRol: rol.getNombreRol(),
        permisos: await this.permisoToPermiso.tegArray(rol.getPermisos() ?? [])
    } as MysqlRol;
  };

    // Convierte un array de Rol[] a MysqlRol[]
    public tegArray = async (roles: Rol[]): Promise<MysqlRol[]> => {
      return Promise.all(
        roles.map(async (rol) => ({
          idRol: rol.getIdRol(),
          nombreRol: rol.getNombreRol(),
          permisos: await this.permisoToPermiso.tegArray(rol.getPermisos() ?? []),
        } as MysqlRol))
      );
    };

}
