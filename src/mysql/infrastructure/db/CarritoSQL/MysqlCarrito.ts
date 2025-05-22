import MYSQLItemCarrito from "../../../domain/carrito/MySqlItemCarrito";
import CarritoRepoInterface from "../../../domain/repository/CarritoRepoInterface";

import Database from "../database";

export default class MysqlCarritoRepository implements CarritoRepoInterface {
    private readonly db = Database.getInstance();
    async getCarrito(token: string): Promise<MYSQLItemCarrito[]> {
        try {
            const result: any = await this.db.executeQuery(
                `SELECT ic.* 
                 FROM BuenaVista_Carrito bc
                 JOIN itemCarrito ic ON bc.idCarrito = ic.idCarrito
                 WHERE bc.usuario_id = ? AND bc.estadoCarrito = 1`,
                [token]
            );

            console.log("Resultado de la consulta SQL:", JSON.stringify(result, null, 2));

            if (!Array.isArray(result) || result.length === 0) {
                console.warn("No se encontraron items en el carrito activo.");
                return [];
            }

            return result as MYSQLItemCarrito[];
        } catch (error) {
            console.error("Error al obtener los items del carrito:", error);
            return [];
        }
    }



    async addProductoCarrito(token: string, producto: number): Promise<boolean> {
        try {
            const result = await this.db.executeQuery(
                `
            INSERT INTO itemCarrito (idCarrito, idProducto, cantidad, subTotal)
            SELECT
                c.idCarrito,
                ?,
                1,
                p.precioProducto
            FROM BuenaVista_Carrito c
            JOIN BuenaVista_Productos p ON p.idProducto = ?
            WHERE c.usuario_id = ? AND c.estadoCarrito = 1
              AND NOT EXISTS (
                SELECT 1
                FROM itemCarrito ic
                WHERE ic.idCarrito = c.idCarrito AND ic.idProducto = ?
              )
            LIMIT 1
            `,
                [producto, producto, token, producto]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            return false;
        }
    }


    async deleteProductoCarrito(token: string, producto: number): Promise<boolean> {
        try {
            const result = await this.db.executeQuery(
                `DELETE FROM itemCarrito WHERE idCarrito = 
                 (SELECT idCarrito FROM BuenaVista_Carrito WHERE usuario_id = ? AND estadoCarrito = 1)
                 AND idItem = ?`,
                [token, producto]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            return false;
        }
    }

    async changeStatusCarrito(token: string): Promise<boolean> {
        try {
            const result = await this.db.executeQuery(
                `UPDATE BuenaVista_Carrito SET estadoCarrito = 0 WHERE usuario_id = ? AND estadoCarrito = 1`,
                [token]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al cambiar el estado del carrito:", error);
            return false;
        }
    }

    async getTotalCarrito(token: string): Promise<number> {
        try {
            const [result]: any = await this.db.executeQuery(
                `SELECT SUM(subTotal) as total FROM itemCarrito WHERE idCarrito = 
                 (SELECT idCarrito FROM BuenaVista_Carrito WHERE usuario_id = ? AND estadoCarrito = 1)`,
                [token]
            );

            return result[0]?.total || 0;
        } catch (error) {
            console.error("Error al obtener el total del carrito:", error);
            return 0;
        }
    }

    async getCarritoProducto(idCarritoProducto: number): Promise<MYSQLItemCarrito> {
        try {
            const [result]: any = await this.db.executeQuery(
                `SELECT * FROM itemCarrito WHERE idCarritoProducto = ?`,
                [idCarritoProducto]
            );

            if (!result || result.length === 0) {
                console.warn("No se encontró el producto en el carrito.");
                // Devolver un objeto vacío que cumpla con la interfaz MYSQLItemCarrito
                return {
                    idItem: 0,
                    idProducto: 0,
                    cantidad: 0,
                    idCarrito: 0,
                    subTotal: 0
                };
            }

            return result[0] as MYSQLItemCarrito;
        } catch (error) {
            console.error("Error al obtener el producto del carrito:", error);
            // Devolver un objeto vacío que cumpla con la interfaz MYSQLItemCarrito
            return {
                idItem: 0,
                idProducto: 0,
                cantidad: 0,
                idCarrito: 0,
                subTotal: 0
            };
        }
    }

    async createCarrito(token: string): Promise<boolean> {
        try {
            const result = await this.db.executeQuery(
                `INSERT INTO BuenaVista_Carrito (usuario_id, estadoCarrito) VALUES (?, 1)`,
                [token]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al crear un nuevo carrito:", error);
            return false;
        }
    }

    async aumentaCanitadItemProductoCarrito(token: string, idItem: number): Promise<boolean> {
        try {
            const result = await this.db.executeQuery(
                `UPDATE itemCarrito AS ic
                JOIN (
                    SELECT 
                        p.precioProducto,
                        ic.idItem,
                        ic.idCarrito
                    FROM itemCarrito ic
                    JOIN BuenaVista_Productos p ON ic.idProducto = p.idProducto
                    JOIN BuenaVista_Carrito c ON ic.idCarrito = c.idCarrito
                    WHERE ic.idItem = ? AND c.usuario_id = ? AND c.estadoCarrito = 1
                ) AS sub ON ic.idItem = sub.idItem AND ic.idCarrito = sub.idCarrito
                SET 
                    ic.cantidad = ic.cantidad + 1,
                    ic.subTotal = (ic.cantidad + 1) * sub.precioProducto;
                `,
                [idItem, token]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al aumentar la cantidad del item en el carrito:", error);
            return false;
        }
    }



    async disminuyeCantidadItemProductoCarrito(token: string, idItem: number): Promise<boolean> {
        try {
            const carritoResult: any[] = await this.db.executeQuery(
                `SELECT idCarrito FROM BuenaVista_Carrito WHERE usuario_id = ? AND estadoCarrito = 1`,
                [token]
            );

            if (!carritoResult || carritoResult.length === 0) {
                console.warn("No se encontró un carrito activo.");
                return false;
            }

            const idCarrito = carritoResult[0]["idCarrito"];

            const [cantidadResult]: any = await this.db.executeQuery(
                `SELECT cantidad FROM itemCarrito WHERE idCarrito = ? AND idItem = ?`,
                [idCarrito, idItem]
            );

            if (!cantidadResult || cantidadResult.length === 0) {
                console.warn("El item no está en el carrito.");
                return false;
            }
            const cantidadActual = cantidadResult["cantidad"];

            if (cantidadActual === 1) {
                const deleteResult = await this.db.executeQuery(
                    `DELETE FROM itemCarrito WHERE idCarrito = ? AND idItem = ?`,
                    [idCarrito, idItem]
                );

                return deleteResult.affectedRows > 0;
            } else {
                const updateResult = await this.db.executeQuery(
                    `UPDATE itemCarrito AS ic
                        JOIN (
                            SELECT 
                                p.precioProducto,
                                ic.idItem,
                                ic.idCarrito
                            FROM itemCarrito ic
                            JOIN BuenaVista_Productos p ON ic.idProducto = p.idProducto
                            WHERE ic.idItem = ? AND ic.idCarrito = ?
                        ) AS sub ON ic.idItem = sub.idItem AND ic.idCarrito = sub.idCarrito
                        SET 
                            ic.cantidad = ic.cantidad - 1,
                            ic.subTotal = (ic.cantidad - 1) * sub.precioProducto;
                        `,
                    [idItem, idCarrito]
                );


                return updateResult.affectedRows > 0;
            }
        } catch (error) {
            console.error("Error al disminuir la cantidad del item en el carrito:", error);
            return false;
        }
    }

}