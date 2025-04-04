export const waitForBot = async (host: string, retries:number = 10, delay:number = 8000) => {
    for (let i = 0; i < retries; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      try {
        // Intentar conectarse al bot
        console.log(`Intentando conectar a ${host}... (${i + 1}/${retries})`);
        console.log(`http://${host}:3000/v1/codigo`);
        const response = await fetch(`http://${host}:3000/v1/codigo`);
        const respuesta = await response.json()
        if (response.ok) {
          return respuesta; // Si la respuesta es exitosa, retornamos el JSON
        }
      } catch (error) {
        // Si falla, esperar antes del próximo intento
        console.log(`Esperando a que el bot ${host} esté listo... (${i + 1}/${retries})`);
      }
      
    }
    throw new Error(`El bot en el puerto ${host} no está disponible después de ${retries} intentos.`);
  };