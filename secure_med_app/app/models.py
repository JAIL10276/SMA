from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from app import db
from app.encryption import encrypt_data, decrypt_data

# Patient model with encrypted fields
class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    _name = db.Column("name", db.LargeBinary, nullable=False)
    _dob = db.Column("dob", db.LargeBinary, nullable=False)
    created_at = db.Column("created_at", db.DateTime, default=datetime.utcnow)

    @hybrid_property
    def name(self):
        return decrypt_data(self._name)
    
    @name.setter
    def name(self, plaintext):
        self._name = encrypt_data(plaintext)

    @hybrid_property
    def dob(self):
        return self._dob.strftime("%Y-%m-%d")
    
    @dob.setter
    def dob(self, date_str):
        self._dob = datetime.strptime(date_str, "%Y-%m-%d").date()
    def __repr__(self):
        return f"Patient #{self.id}\nname: {self.name}\nDOB: {self.dob}\ncreated at: {self.created_at}"

# MedicalRecord model with encrypted fields
class MedicalRecord(db.Model):
    __tablename__ = "medical_records"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"), nullable=False)
    _diagnosis = db.Column("diagnosis", db.LargeBinary)
    _treatment = db.Column("treatment", db.LargeBinary)
    _notes = db.Column("notes", db.LargeBinary, nullable=False)
    created_at = db.Column("created_at", db.DateTime, default=datetime.utcnow)

    records = db.relationship("MedicalRecord", backref="patient", cascade="all, delete-orphan")


    @hybrid_property
    def diagnosis(self):
        return decrypt_data(self._diagnosis) if self._diagnosis else None
    
    @diagnosis.setter
    def diagnosis(self, plaintext):
        self._diagnosis = encrypt_data(plaintext) if plaintext else None

    @hybrid_property
    def treatment(self):
        return decrypt_data(self._treatment) if self._treatment else None
    
    @treatment.setter
    def treatment(self, plaintext):
        self._treatment = encrypt_data(plaintext) if plaintext else None

    @hybrid_property
    def notes(self):
        return decrypt_data(self._notes)
    
    @notes.setter
    def notes(self, plaintext):
        self._notes = encrypt_data(plaintext)

    def __repr__(self):
        return f"MedicalRecord #{self.id}\nPatient ID: {self.patient_id}\nCreated At: {self.created_at}"