import { Usuario } from "../../../usuario/domain/usuario/Usuario";
import { MysqlUsuario } from "../../../mysql/domain/usuario/MySQLUsuario";


export default class MysqlUsuariosToUsuarios {



  public getArray = (usuarios: MysqlUsuario[]): Promise<Usuario[]> => {
    const usuariosTransformados = usuarios.map(async (usuario) => {
      return new Usuario({
        ci: usuario.ci,
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario,
        correoUsuario: usuario.correoUsuario,
        contrasenaUsuario: usuario.contrasenaUsuario,
        estadoUsuario: usuario.estadoUsuario,
        rolUsuario: usuario.rol
        });
    });

    return Promise.all(usuariosTransformados);
  };

  public get = (usuario: MysqlUsuario): Promise<Usuario> => {
    return Promise.resolve(
        new Usuario({
        ci: usuario.ci,
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario,
        correoUsuario: usuario.correoUsuario,
        contrasenaUsuario: usuario.contrasenaUsuario,
        estadoUsuario: usuario.estadoUsuario,
        rolUsuario: usuario.rol
        }));

  };

  public teg = (usuario: Usuario): Promise<MysqlUsuario> => {
    const mysqlUser: MysqlUsuario = {
        ci: usuario.getCi(),
        nombreUsuario: usuario.getNombreUsuario(),
        apellidoUsuario: usuario.getApellidoUsuario(),
        correoUsuario: usuario.getCorreoUsuario(),
        contrasenaUsuario: usuario.getContrasenaUsuario(),
        estadoUsuario: usuario.getEstadoUsuario(),
        rol: usuario.getRolUsuario()
    };

    return Promise.resolve(mysqlUser);
};



  
}


  