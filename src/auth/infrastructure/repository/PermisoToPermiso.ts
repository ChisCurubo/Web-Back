import { Permiso } from "../../../auth/domain/roles/Permiso";
import { MysqlPermiso } from "../../../mysql/domain/rol/MySQLPermiso";

export default class MysqlPermisosToPermisos {
  public getArray = (permisos: MysqlPermiso[]): Promise<Permiso[]> => {
    const permisosTransformados = permisos.map(async (permiso) => {
      return new Permiso({
        idPermiso: permiso.idPermiso,
        nombrePermiso: permiso.nombrePermiso,
        descripcionPermiso: ''
      });
    });

    return Promise.all(permisosTransformados);
  };

  public get = (permiso: MysqlPermiso): Promise<Permiso> => {
    return Promise.resolve(
      new Permiso({
        idPermiso: permiso.idPermiso,
        nombrePermiso: permiso.nombrePermiso,
        descripcionPermiso: ''
      })
    );
  };

  public tegArray = async (permisos: Permiso[]): Promise<MysqlPermiso[]> => {
    return permisos.map((permiso) => ({
      idPermiso: permiso.getIdPermiso(),
      nombrePermiso: permiso.getNombrePermiso(),
      
    } as MysqlPermiso));
  };

  public teg = async (permiso: Permiso): Promise<MysqlPermiso> => {
    return {
      idPermiso: permiso.getIdPermiso(),
      nombrePermiso: permiso.getNombrePermiso(),
    } as MysqlPermiso;
  };
}

