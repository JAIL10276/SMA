import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
FERNET_KEY = os.getenv("FERNET_KEY")

if not FERNET_KEY:
    raise RuntimeError("FERNET_KEY not set in environment!")

try:
    cipher = Fernet(FERNET_KEY)
except Exception as e:
    raise RuntimeError("Invalid FERNET_KEY in environment!") from e


def verify_qr_token(token: str):
    """
    Verify and decrypt a Fernet QR token.
    Expected format inside token: 'admin:<admin_id>'
    """
    try:
        decrypted = cipher.decrypt(token.encode()).decode()
        if decrypted.startswith("admin:"):
            parts = decrypted.split(":", 1)
            if len(parts) == 2:
                return {"admin_id": parts[1]}
            else:
                return {"error": "Malformed admin token"}
        else:
            return {"error": "Invalid token payload"}
    except Exception:
        return {"error": "Invalid or expired token"}
