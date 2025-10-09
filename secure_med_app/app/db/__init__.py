from flask import Flask, g
from mysql.connector import Error

import mysql.connector

def connect_to_database():
    """Establish a connection to the MySQL database."""
    try:
        connection = mysql.connector.connect(
            host="your_host",
            user="your_user",
            password="your_password",
            database="your_database"
        ) 
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def get_db():
    """Get the database connection for the current application context."""
    if 'db' not in g:
        g.db = connect_to_database()
    return g.db

def close_db(e=None):
    """Close the database connection."""
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_app(app: Flask):
    """Initialize the database with the Flask app."""
    app.teardown_appcontext(close_db)