from flask import Blueprint

bp = Blueprint("routes", __name__)

# Import all route modules to register them
from app.routes import admin_routes, patient_routes
