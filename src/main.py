import os
import sqlite3

from flask import Flask, redirect, render_template
from flask_login import LoginManager, current_user
from src.app.services.auth import auth_bp
from src.app.services.leads import lead_bp
from src.app.user.user import User
from src.app.utils.constants import TEMPLATE_FOLDER
from src.app.utils.db import init_db_command
from werkzeug.exceptions import (
    BadRequest,
    HTTPException,
    InternalServerError,
    MethodNotAllowed,
    NotFound,
    Unauthorized,
)

app = Flask(__name__, template_folder=TEMPLATE_FOLDER)
app.secret_key = os.environ.get("SECRET_VALUE_KEY") or os.urandom(24)
app.register_blueprint(lead_bp)
app.register_blueprint(auth_bp)
login_manager = LoginManager(app)


@app.route("/")
def hello():
    if current_user.is_authenticated:
        return render_template("index.html", user=current_user)
    else:
        return render_template("auth/login.html"), 200


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.errorhandler(Unauthorized)
def unauthorized(error: HTTPException):
    return render_template("errors/unauthorized.html"), error.code


# All errors will throw an HTTPException
# Responds with error status code and error message
@app.errorhandler(InternalServerError)
@app.errorhandler(NotFound)
@app.errorhandler(BadRequest)
@app.errorhandler(MethodNotAllowed)
def error_handler(error: HTTPException):
    return redirect("/"), error.code


@app.before_first_request
def init_db():
    try:
        init_db_command()
    except sqlite3.OperationalError:
        pass


if __name__ == "__main__":
    app.run(debug=True, ssl_context="adhoc")
