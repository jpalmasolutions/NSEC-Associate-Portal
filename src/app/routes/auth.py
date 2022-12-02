import google.auth.transport.requests
import requests
from flask import Blueprint, redirect, request
from flask_login import login_user, logout_user, login_required
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol

from app.user.user import User
from app.utils.constants import (
    CLIENT_SECRETS_FILE_PATH,
    GOOGLE_CLIENT_ID,
    TEMPLATE_FOLDER,
)

flow = Flow.from_client_secrets_file(
    client_secrets_file=CLIENT_SECRETS_FILE_PATH,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri="https://9bea-2600-4040-2df8-e000-e8a5-a586-944d-766e.ngrok.io/auth/callback",
)

auth_bp = Blueprint(
    name="login",
    import_name=__name__,
    template_folder=TEMPLATE_FOLDER,
    url_prefix="/auth",
)


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    authorization_url, state = flow.authorization_url()
    print(state)
    return redirect(authorization_url)


@auth_bp.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(sess=request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request, audience=GOOGLE_CLIENT_ID
    )

    id_ = id_info.get("sub")
    email = id_info.get("email")
    name = id_info.get("name")
    profile_picture = id_info.get("picture")

    user = User(id_=id_, email=email, name=name, profile_picture=profile_picture)

    if not User.get(id_):
        User.create(id_, name, email, profile_picture)

    login_user(user)

    return redirect("/")


@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")
