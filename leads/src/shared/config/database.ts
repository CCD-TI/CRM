import { Sequelize } from "sequelize-typescript";
import { models } from "../models/models";
import { Dialect } from "sequelize";

class Database {
    private connection: Sequelize | null;

    constructor() {
        this.connection = null;
        this.init();
    }

    init() {
        try {
            const name = process.env.DB_NAME || "leadsccd";
            const user = process.env.DB_USER || "paul";
            const password = process.env.DB_PASSWORD || "paulp";
            const dialect = (process.env.DB_DIALECT as Dialect) || 'mysql'
            const host = process.env.DB_HOST || "localhost";
            const port = parseInt(process.env.DB_PORT || "3306"); 
            
            console.log("Detalles de la conexión:", { database: name, user, host, dialect, port });

            this.connection = new Sequelize(name, user, password, {
                host,
                dialect,
                port,
                retry: { max: 3 },
                models,
                timezone: '-05:00',
            });
        } catch (e) {
            console.error("Error al conectar a la base de datos", e);
        }
    }

    async sync() {
        try {
            await this.connection?.authenticate();
            console.log("✅ Conexión a MySQL establecida correctamente.");
            
            const alter = process.env.ALTER === 'true';
            await this.connection?.sync({ alter });  // 🔹 Usamos "alter" en lugar de "force" force:true
             

            console.log("✅ Base de datos sincronizada correctamente.");
        } catch (err) {
            console.error("❌ Error al conectar o sincronizar con la base de datos:", err);
        }
    }

    public getConnection() {
        return this.connection;
    }
}

export default new Database();