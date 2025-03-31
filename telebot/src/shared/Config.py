import os

MYSQL_HOST = os.getenv("DB_HOST", "host.docker.internal")
MYSQL_USER = os.getenv("DB_USER", "root")
MYSQL_PASSWORD = os.getenv("DB_PASSWORD", "12345678")
MYSQL_DB = os.getenv("DB_NAME", "telegram")

RABBITMQ_HOST = os.getenv("HOST_RABBITMQ", "localhost")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", 5672))
RABBITMQ_USER = os.getenv("USER_RABBITMQ", "guest")
RABBITMQ_PASSWORD = os.getenv("PASSWORD_RABBITMQ", "guest")