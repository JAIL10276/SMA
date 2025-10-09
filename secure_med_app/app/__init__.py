from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # Initialize database
    from app.models import db
    from app.db import close_db
    db.init_app(app)
    app.teardown_appcontext(close_db)

    # Blueprints go here later
    
    #  Routes
    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp)
    # Authentication
    
    return app