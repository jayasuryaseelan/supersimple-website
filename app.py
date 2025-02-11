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
#app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/flask_auth"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://flask_user:root@localhost:3306/flask_auth"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


@app.before_request
def before_request():
    if request.method == "POST" or request.method == "PUT":
        if request.content_type != "application/json":
            return (
                jsonify({"msg": "Request content-type must be application/json"}),
                415,
            )

        try:
            request.get_json()
        except Exception as e:
            return jsonify({"msg": "Failed to decode JSON content"}), 400


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    #user = User.query.filter_by(username=username).first()
    #if not user or not check_password_hash(user.password, password):
       # return jsonify({"msg": "Wrong username or password"}), 401

    access_token = create_access_token(identity=username)
    response = jsonify({"msg": "Login successful"})
    set_access_cookies(response, access_token)
    return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/validate", methods=["GET"])
@jwt_required()
def validate():
    current_user = get_jwt_identity()
    return jsonify(user=current_user), 200


@app.route("/")
def serve_home():
    return send_from_directory(".", "home.html")


@app.route("/login")
def serve_login():
    return send_from_directory(".", "login.html")


@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory("assets", filename)


@app.errorhandler(OperationalError)
def handle_db_connection_error(e):
    return (
        jsonify({"msg": "Unable to connect to the database. Please try again later."}),
        500,
    )


if __name__ == "__main__":
    try:
        with app.app_context():
            db.create_all()
    except OperationalError as e:
        print(
            "Unable to connect to the database. Please check your database configuration."
        )
        exit(1)

    app.run(debug=True)
