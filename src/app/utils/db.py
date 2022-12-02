import sqlite3
from flask import current_app, g, Flask

from app.utils.constants import RESOURCE_FOLDER

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            'sqlite.db', detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    
    return g.db

def close_db(e = None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()
    schema_path = '{folder}/sql/users_schema.sql'.format(folder = RESOURCE_FOLDER)
    with current_app.open_resource(schema_path) as f:
        db.executescript(f.read().decode('utf-8'))


def init_db_command():
    init_db()

def init_app(app : Flask):
    app.teardown_appcontext(close_db)
    app.click.add(init_db_command)