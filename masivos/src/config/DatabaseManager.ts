import { Sequelize } from "sequelize";

export class DatabaseManager {
  static async createDatabase(dbName: string):Promise<boolean> {
    try {
      console.log("datos de conexion",
        {
          host: process.env.DB_HOST_MYSQL_DOCKER || "host.docker.internal", // Conectar al contenedor
          port: parseInt(process.env.DB_PORT_DOCKER || "3307"),
          username: process.env.DB_USER_MYSQL_DOCKER || "root",
          password: process.env.DB_PASSWORD_MYSQL_DOCKER || "root",
          dialect: "mysql",
          logging: false, // Evita logs innecesarios
        }
      )
      const sequelize = new Sequelize({
        host: process.env.DB_HOST_MYSQL_DOCKER || "host.docker.internal", // Conectar al contenedor
        port: parseInt(process.env.DB_PORT_DOCKER || "3307"),
        username: process.env.DB_USER_MYSQL_DOCKER || "root",
        password: process.env.DB_PASSWORD_MYSQL_DOCKER || "root",
        dialect: "mysql",
        logging: false, // Evita logs innecesarios
      });
      await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
      console.log(`Base de datos ${dbName} creada exitosamente.`);
      return true;
    } catch (error) {
      console.error("Error al crear la base de datos:", error);
      return false;
    }
  }
}
