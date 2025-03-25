import { config } from "dotenv";
config();
import { createServer } from "http";
import app from "./app";
import database from "./shared/config/database";
import { seedData } from "./shared/config/seed";
async function main(): Promise<void> {
  try {
    //sincronizacion con la base de datos
    await database.sync();
      
    const httpServer = createServer(app); //escucha del servidor en puerto 8000

    if(process.env.LOAD_DATA === 'true'){
      await seedData(); // Cargar datos iniciales
    }
    const port = Number(process.env.PORT || 8003);
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
      
  } catch (error) {
    console.error("Error durante la ejecucion:", error);
    process.exit(1);
  }
}
main();