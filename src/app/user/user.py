from dataclasses import dataclass
from flask_login import UserMixin
from app.utils.db import get_db


@dataclass
class User(UserMixin):
    def __init__(self, id_, name, email, profile_picture):
        self.id = id_
        self.name = name
        self.email = email
        self.profile_picture = profile_picture

    @staticmethod
    def get(user_id):
        db = get_db()
        user = db.execute("SELECT * FROM user where id = ?", (user_id,)).fetchone()

        if not user:
            return None

        user = User(id_=user[0], name=user[1], email=user[2], profile_picture=user[3])

        return user

    @staticmethod
    def create(id_, name, email, profile_picture):
        db = get_db()
        db.execute(
            "INSERT INTO user (id,name,email,profile_picture) VALUES (?,?,?,?)",
            (id_, name, email, profile_picture),
        )

        db.commit()
