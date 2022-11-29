from flask import Blueprint, render_template
from src.utils.constants import TEMPLATE_FOLDER
lead_bp = Blueprint(
            name = 'lead',
            import_name = __name__,
            url_prefix='/leads',
            template_folder='{templates}/leads'.format(templates = TEMPLATE_FOLDER)
        )

@lead_bp.route('/')
def index():
    print(TEMPLATE_FOLDER)
    return render_template('leads.html')
