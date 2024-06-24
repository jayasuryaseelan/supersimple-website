from flask import Flask, request, jsonify, send_from_directory
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies,
)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import OperationalError
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "kouewouhfowebwqouiu983y"
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://flask_user:root@localhost:3306/flask_auth"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Before request handler
@app.before_request
def before_request():
    if request.method == "POST" or request.method == "PUT":
        if request.content_type != "application/json":
            return jsonify({"msg": "Request content-type must be application/json"}), 415

        try:
            request.get_json()
        except Exception as e:
            return jsonify({"msg": "Failed to decode JSON content"}), 400

# Register endpoint
@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")
    
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"msg": "Username already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Insert query endpoint (for demonstration purposes)
@app.route("/insert_query", methods=["POST"])
def insert_query():
    # Example of inserting a new user manually (not recommended for production)
    new_username = request.json.get("username")
    new_password = request.json.get("password")

    if not new_username or not new_password:
        return jsonify({"msg": "Missing username or password"}), 400

    hashed_password = generate_password_hash(new_password)
    new_user = User(username=new_username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "New user inserted successfully"}), 201

# Query user endpoint (for demonstration purposes)
@app.route("/query_user/<username>", methods=["GET"])
def query_user(username):
    # Example of querying a user by username
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user_data = {
        "id": user.id,
        "username": user.username,
        # You might want to exclude password for security reasons
    }
    return jsonify(user_data), 200

# Existing login, logout, and validate routes remain unchanged

# Serve home.html
@app.route("/")
def serve_home():
    return send_from_directory(".", "home.html")

# Serve login.html
@app.route("/register")
def serve_login():
    return send_from_directory(".", "login.html")

# Serve assets
@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory("assets", filename)

# Database connection error handler
@app.errorhandler(OperationalError)
def handle_db_connection_error(e):
    return jsonify({"msg": "Unable to connect to the database. Please try again later."}), 500

# Create tables and run the app
if __name__ == "__main__":
    try:
        with app.app_context():
            db.create_all()
    except OperationalError as e:
        print("Unable to connect to the database. Please check your database configuration.")
        exit(1)

    app.run(debug=True)
