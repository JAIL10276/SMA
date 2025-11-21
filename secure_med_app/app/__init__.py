# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.config import Config
import pymysql

# MySQL driver setup
pymysql.install_as_MySQLdb()

# Global SQLAlchemy instance
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    CORS(app, supports_credentials=True, origins=["https://localhost:5173"])

    # Clean teardown
    from app.db import close_db
    app.teardown_appcontext(close_db)

    # Register blueprints
    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp, url_prefix="/api")
    app.register_blueprint(routes_bp, url_prefix="/admin")

    return app  
