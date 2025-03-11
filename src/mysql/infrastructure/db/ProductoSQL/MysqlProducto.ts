import { MysqlProducto } from "../../../domain/producto/MySQLProducto";
import ProductoRepoInterface from "../../../domain/repository/ProductoRepoInterface";
import Database from "../database";



export default class MysqlProductoRepository implements ProductoRepoInterface {
    private readonly db = Database.getInstance();
    
      public async fetchAllProductos(): Promise<MysqlProducto[]> {
          const rows = await this.db.executeQuery("SELECT * FROM BuenaVista_Productos");
          return rows;
      }
      public async fetchProductoById(id: number): Promise<MysqlProducto> {
        const rows = await this.db.executeQuery(
          "SELECT * FROM BuenaVista_Productos WHERE idProducto = ?",
          [id]
        );
        if (!rows || rows.length === 0) {
          throw new Error("Producto no encontrado");
        }
        return rows[0] as MysqlProducto;
      }
    
      public async fetchProductoByName(nombre: string): Promise<MysqlProducto[]> {
        const rows = await this.db.executeQuery(
          "SELECT * FROM BuenaVista_Productos WHERE nombreProducto LIKE ?",
          [`%${nombre}%`]
        );
        return rows as MysqlProducto[];
      }
    
      public async fetchProductosByCategoria(categoria: string): Promise<MysqlProducto[]> {
        const rows = await this.db.executeQuery(
          `SELECT * FROM BuenaVista_Productos p
           JOIN BuenaVista_Categoria c ON p.categoria_id = c.idCategoria
           WHERE c.nombreCategoria LIKE ?`,
          [`%${categoria}%`]
        );
        return rows as MysqlProducto[];
      }
    
      public async fetchProductoByMarca(marca: string): Promise<MysqlProducto[]> {
        const rows = await this.db.executeQuery(
          "SELECT * FROM BuenaVista_Productos WHERE marcaProducto LIKE ?",
          [`%${marca}%`]
        );
        return rows as MysqlProducto[];
      }
    
      public async fetchImgProducto(idProducto: string): Promise<string> {
        const rows = await this.db.executeQuery(
          "SELECT imgProducto FROM BuenaVista_Productos WHERE idProducto = ?",
          [idProducto]
        );
        if (!rows || rows.length === 0) {
          throw new Error("Imagen no encontrada");
        }
        return rows[0].imgProducto;
      }
    
      public async addProducto(producto: MysqlProducto): Promise<boolean> {
        const result = await this.db.executeQuery(
          `INSERT INTO BuenaVista_Productos (nombreProducto, descripcionProducto, tallaProducto, precioProducto, estadoProducto, imgProducto, stockProducto, marcaProducto, categoria_id, descuento_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            producto.nombreProducto,
            producto.descripcionProducto,
            producto.tallaProducto,
            producto.precioProducto,
            producto.estadoProducto ? 1 : 0,
            producto.imgProducto,
            producto.stockProducto,
            producto.marcaProducto,
            producto.categoria_id,
            producto.descuento_id,
          ]
        );
        return result.affectedRows > 0;
      }
    
      public async updateProducto(id: number, producto: MysqlProducto): Promise<boolean> {
        const result = await this.db.executeQuery(
          `UPDATE BuenaVista_Productos 
           SET nombreProducto = ?, descripcionProducto = ?, tallaProducto = ?, precioProducto = ?, estadoProducto = ?, imgProducto = ?, stockProducto = ?, marcaProducto = ?, categoria_id = ?, descuento_id = ?
           WHERE idProducto = ?`,
          [
            producto.nombreProducto,
            producto.descripcionProducto,
            producto.tallaProducto,
            producto.precioProducto,
            producto.estadoProducto ? 1 : 0,
            producto.imgProducto,
            producto.stockProducto,
            producto.marcaProducto,
            producto.categoria_id,
            producto.descuento_id,
            id,
          ]
        );
        return result.affectedRows > 0;
      }

}