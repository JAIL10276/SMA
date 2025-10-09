from flask import request, jsonify
from app.routes import bp
from app.models import db, Patient, MedicalRecord

@bp.route("/patients", methods=["POST"])
def add_patient():
    data = request.json
    name = data.get("name")
    dob = data.get("dob")

    if not name:
        return jsonify({"error": "Patient name is required"}), 400

    patient = Patient(name=name, dob=dob)
    db.session.add(patient)
    db.session.commit()
    return jsonify({"message": "Patient added", "id": patient.id})

@bp.route("/records", methods=["POST"])
def add_medical_record():
    data = request.json
    patient_id = data.get("patient_id")
    diagnosis = data.get("diagnosis")
    treatment = data.get("treatment")
    notes = data.get("notes")

    if not patient_id or not notes:
        return jsonify({"error": "patient_id and notes are required"}), 400

    record = MedicalRecord(
        patient_id=patient_id,
        diagnosis=diagnosis,
        treatment=treatment
    )
    record.notes = notes  # Automatically encrypts
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Record added", "id": record.id})
