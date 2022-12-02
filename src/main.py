import os
import sqlite3

from flask import Flask
from flask_login import LoginManager
from app.routes.auth import auth_bp
from app.routes.leads import lead_bp
from app.routes.home import home_bp
from app.routes.errors import errors_bp
from app.user.user import User
from app.utils.db import init_db_command


""" The Flask app is initialized.

    The secret key is set to keep sessions secure.
    Blueprints are registered to properly modularize routing.
    Flask Login Manager is used to maintain sessions.
"""
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_VALUE_KEY") or os.urandom(24)
app.register_blueprint(lead_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)
app.register_blueprint(errors_bp)
login_manager = LoginManager(app)


@login_manager.user_loader
def load_user(user_id):
    """Function Details:

    Parameters:
        user_id - ID that is being used to login, returned from OAuth Google Call

    Returns:
        User - A User object that contains the details of user trying to log in.
        None - Returns none if no user is found with passed id.
    """
    return User.get(user_id)


@app.before_first_request
def init_db():
    try:
        init_db_command()
    except sqlite3.OperationalError:
        pass


if __name__ == "__main__":
    app.run(debug=True, ssl_context="adhoc", host='0.0.0.0')
