import FavoritoRepoInterface from "../../../domain/repository/FavoritoRepoInterface";
import { MysqlFavorito } from "../../../domain/favorito/MsqlFavorito";
import Database from "../database";

export default class MysqlFavoritoRepository implements FavoritoRepoInterface {
    private readonly db = Database.getInstance();

public async fetchFavorito(correo: string): Promise<MysqlFavorito[]> {
    const rows = await this.db.executeQuery(
        `SELECT f.*
         FROM BuenaVista_Favoritos f
         JOIN BuenaVista_Usuarios u ON f.usuario_id = u.ci
         WHERE u.correoUsuario = ?`,
        [correo]
    );
    return rows as MysqlFavorito[];
}


    public async addFavorito(correo: string, productoId: number): Promise<boolean> {
        const result = await this.db.executeQuery(
            `INSERT INTO BuenaVista_Favoritos (usuario_id, producto_id)
SELECT ci, ? FROM BuenaVista_Usuarios WHERE correoUsuario = ?
`,
            [productoId, correo]
        );

        return result.affectedRows > 0;
    }

public async deleteFavoritos(correo: string, productoId: number): Promise<boolean> {
    const result = await this.db.executeQuery(
        `DELETE FROM BuenaVista_Favoritos 
         WHERE usuario_id = (
            SELECT ci FROM BuenaVista_Usuarios WHERE correoUsuario = ?
         ) 
         AND producto_id = ?`,
        [correo, productoId]
    );

    return result.affectedRows > 0;
}

}
