# app/encryption/encrypt.py

from cryptography.fernet import Fernet
from flask import current_app

def get_fernet():
    key = current_app.config.get("FERNET_KEY")
    if not key:
        raise ValueError("FERNET_KEY is not configured.")
    return Fernet(key.encode())

def encrypt_data(plaintext: str) -> bytes:
    f = get_fernet()
    return f.encrypt(plaintext.encode())

def decrypt_data(ciphertext: bytes) -> str:
    f = get_fernet()
    return f.decrypt(ciphertext).decode()
