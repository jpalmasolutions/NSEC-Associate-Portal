from flask import Flask, render_template
from src.leads.leads import lead_bp
from src.utils.constants import TEMPLATE_FOLDER

app = Flask(__name__,template_folder=TEMPLATE_FOLDER)
app.register_blueprint(lead_bp)

@app.route('/')
def hello():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)