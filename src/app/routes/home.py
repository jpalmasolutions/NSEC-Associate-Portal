from flask import Blueprint, render_template
from flask_login import current_user
from src.app.utils.constants import TEMPLATE_FOLDER


home_bp = Blueprint(
    name="home",
    import_name=__name__,
    template_folder=TEMPLATE_FOLDER
)


@home_bp.route("/", methods=["GET"])
def home():
    if current_user.is_authenticated:
        return render_template("index.html", user=current_user)
    else:
        return render_template("auth/login.html"), 200
