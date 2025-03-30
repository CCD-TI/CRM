import { config } from "dotenv";
config();
import app from "./app";
async function main() {
  try {
    const puerto = process.env.PORT ?? 8000;
    app.listen(puerto, () => {
      console.log(`Servidor corriendo en el puerto ${puerto}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();