# Usar una imagen base de Node.js 20
FROM node:21-alpine3.18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto 3000
EXPOSE 8002

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]