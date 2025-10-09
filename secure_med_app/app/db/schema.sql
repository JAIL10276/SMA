CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    name BLOB NOT NULL,         -- encrypted bytes of name
    dob BLOB NOT NULL,          -- encrypted bytes of DOB string (e.g., '1990-01-01')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    diagnosis BLOB,             -- encrypted bytes
    treatment BLOB,             -- encrypted bytes
    notes BLOB NOT NULL,        -- encrypted bytes of notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
