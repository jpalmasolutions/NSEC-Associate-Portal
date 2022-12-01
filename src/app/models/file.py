from dataclasses import dataclass
from jsons import JsonSerializable


@dataclass
class File(JsonSerializable):
    name: str
    aws_location: str
    dbx_location: str

    file_id: str = None
    lead_id: str = None
