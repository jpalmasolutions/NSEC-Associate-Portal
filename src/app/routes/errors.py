from flask import Blueprint, render_template, redirect, url_for
from src.app.utils.constants import TEMPLATE_FOLDER
from werkzeug.exceptions import (
    BadRequest,
    HTTPException,
    InternalServerError,
    MethodNotAllowed,
    NotFound,
    Unauthorized,
)


errors_bp = Blueprint(
    name="errors",
    import_name=__name__,
    url_prefix='/oops',
    template_folder=f'{TEMPLATE_FOLDER}/errors'
)


@errors_bp.route('/unauthorized', methods=['GET'])
def unauthorized():
    return render_template("unauthorized.html"), 401


@errors_bp.route('/not_found', methods=['GET'])
def not_found():
    return render_template('not_found.html'), 404


@errors_bp.app_errorhandler(Unauthorized)
def unauthorized_error(error: HTTPException):
    return redirect(url_for('errors.unauthorized'))


@errors_bp.app_errorhandler(NotFound)
def not_found_error(error : HTTPException):
    return redirect(url_for('errors.not_found'))


# All errors will throw an HTTPException
# Responds with error status code and error message
@errors_bp.app_errorhandler(InternalServerError)
@errors_bp.app_errorhandler(BadRequest)
@errors_bp.app_errorhandler(MethodNotAllowed)
def error_handler(error: HTTPException):
    print(error.description)
    return redirect(url_for('home.home'))
