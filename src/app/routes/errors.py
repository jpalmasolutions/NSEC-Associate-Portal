from flask import Blueprint, render_template, redirect
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
    template_folder=f'{TEMPLATE_FOLDER}/errors/'
)


@errors_bp.app_errorhandler(Unauthorized)
def unauthorized(error: HTTPException):
    return render_template("errors/unauthorized.html"), error.code


# All errors will throw an HTTPException
# Responds with error status code and error message
@errors_bp.app_errorhandler(InternalServerError)
@errors_bp.app_errorhandler(NotFound)
@errors_bp.app_errorhandler(BadRequest)
@errors_bp.app_errorhandler(MethodNotAllowed)
def error_handler(error: HTTPException):
    return redirect("/"), error.code
