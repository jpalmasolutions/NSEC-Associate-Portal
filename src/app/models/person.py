from dataclasses import dataclass
from jsons import JsonSerializable


@dataclass
class Person(JsonSerializable):
    main: bool
    first_name: str
    last_name: str
    email: str
    phone_number: str

    person_id: str = None
    lead_id: str = None

    def __post_init__(self):
        self.first_name = self.first_name.title()
        self.last_name = self.last_name.title()
