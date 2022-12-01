from dataclasses import dataclass
from jsons import JsonSerializable
from mysql.connector import DATETIME


@dataclass
class Appointment(JsonSerializable):
    start_time: DATETIME
    end_time: DATETIME

    appointment_id: str = None
    note_id: str = None
    lead_id: str = None
