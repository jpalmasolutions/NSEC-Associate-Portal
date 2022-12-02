import requests
from requests import Response

from flask import Blueprint, make_response, jsonify, render_template
from flask_login import login_required
from app.models.lead import Lead
from app.utils.constants import NSEC_API_HEADERS, NSEC_API_URI, TEMPLATE_FOLDER

lead_bp = Blueprint(
    name="lead",
    import_name=__name__,
    url_prefix="/leads",
    template_folder="{templates}/leads".format(templates=TEMPLATE_FOLDER),
)


@lead_bp.route("/", methods=["GET"])
@login_required
def get_all_leads():
    leads_uri = "{api}/leads".format(api=NSEC_API_URI)
    response: Response = requests.get(url=leads_uri, headers=NSEC_API_HEADERS)

    if response.status_code != 200:
        print(response.text)
    else:
        data = response.json()

    leads_objs = Lead.get_leads(leads=data.get("leads", {}))

    return render_template("leads.html", leads=leads_objs), 200


@lead_bp.route("/<id>", methods=["GET"])
@login_required
def get_lead(id: str):

    lead_uri = f"{NSEC_API_URI}/leads/{id}"
    data = {}

    response: Response = requests.get(url=lead_uri, headers=NSEC_API_HEADERS)

    if response.status_code != 200:
        print(response.text)
    else:
        data = response.json()

    return make_response(jsonify(data), 200)
