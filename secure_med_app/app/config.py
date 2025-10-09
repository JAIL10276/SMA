import os
from dotenv import load_dotenv
from cryptography.fernet import Fernet

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "supersecretkey")
    DB_PASS = os.getenv("DB_PASS")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER", "root")
    FERNET_KEY = os.getenv("FERNET_KEY")
    if not FERNET_KEY:
        raise RuntimeError("FERNET_KEY is missing from .env")

    VAULT_ADDR = os.getenv("VAULT_ADDR")
    VAULT_TOKEN = os.getenv("VAULT_TOKEN")
    QR_TOKEN_EXPIRY = int(os.getenv("QR_TOKEN_EXPIRY", "180"))
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}".format(
        DB_USER=DB_USER, 
        DB_PASS=DB_PASS, 
        DB_HOST=DB_HOST, 
        DB_NAME=DB_NAME
    )


    SQLALCHEMY_TRACK_MODIFICATIONS = False