import jsons

from dataclasses import dataclass, field
from jsons import JsonSerializable
from src.app.models import appointment, file, note, person


@dataclass
class Lead(JsonSerializable):
    street: str
    city: str
    state: str
    postalcode: str
    status: str
    associate_canvasser_email: str
    associate_salesrep_email: str

    people: list[person.Person] = field(default_factory=list)
    notes: list[note.Note] = field(default_factory=list)
    files: list[file.File] = field(default_factory=list)
    appointments: list[appointment.Appointment] = field(default_factory=list)

    lead_id: str = None

    def __post_init__(self):
        self.street = self.street.title()
        self.city = self.city.title()
        self.state = self.state.upper()

    @staticmethod
    def get_leads(leads: dict) -> list():

        lead_objs = []

        for lead in leads:
            obj = jsons.load(lead, Lead)
            lead_objs.append(obj)

        return lead_objs
