# app/routes/token_routes.py
from flask import request, jsonify
from app.routes import bp
from cryptography.fernet import Fernet
import os
from dotenv import load_dotenv

load_dotenv()
FERNET_KEY = os.getenv("FERNET_KEY")
cipher = Fernet(FERNET_KEY)

@bp.route("/generate-qr", methods=["POST"])
def generate_qr_token():
    admin_id = request.json.get("admin_id")
    
    if not admin_id:
        return jsonify({ "error": "admin_id is required" }), 400

    # Structure: "admin:admin123"
    payload = f"admin:{admin_id}"
    token = cipher.encrypt(payload.encode()).decode()

    return jsonify({ "token": token })
