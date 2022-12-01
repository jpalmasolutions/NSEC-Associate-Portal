from dataclasses import dataclass
from jsons import JsonSerializable


@dataclass
class Note(JsonSerializable):
    content: str
    created_at: str = None

    note_id: str = None
    lead_id: str = None
