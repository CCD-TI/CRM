import { createServer } from "http";
import { config } from "dotenv";
config();
import app from "./app";
import database from "./shared/config/database";

async function main(): Promise<void> {
  try {
    //sincronizacion con la base de datos
    await database.sync();
      
    const httpServer = createServer(app); //escucha del servidor en puerto 8000
    const port = Number(process.env.PORT ?? 8004);
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
      
  } catch (error) {
    console.error("Error durante la ejecucion:", error);
    process.exit(1);
  }
}
main();
  