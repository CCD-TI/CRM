-- Crear usuario si no existe
CREATE USER IF NOT EXISTS 'paul'@'%' IDENTIFIED BY 'paulp';

-- Otorgar privilegios de administrador
GRANT ALL PRIVILEGES ON *.* TO 'paul'@'%' WITH GRANT OPTION;

-- Aplicar cambios
FLUSH PRIVILEGES;
