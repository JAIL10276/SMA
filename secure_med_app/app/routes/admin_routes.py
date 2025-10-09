from flask import request, jsonify
from app.routes import bp
from app.auth.qr_validator import verify_qr_token

@bp.route("/secure-records", methods=["GET"])
def view_secure_records():
    token = request.args.get("token")
    if not token:
        return jsonify({"error": "No token provided"}), 403

    result = verify_qr_token(token)
    if "error" in result:
        return jsonify(result), 403

    # Admin verified: show protected resource (stub)
    return jsonify({
        "message": "Admin verified. Access granted to encrypted medical data.",
        "admin_id": result["admin_id"]
    })
