export class UserGeneratorResponse {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    picture: Picture;
}

class Name {
    title: string;
    first: string;
    last: string;
}
class Location {
    street: string;
    city: string;
    state: string;
    postcode: Number;
}
class Login {
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}
class Picture {
    large: string;
    medium: string;
    thumbnail: string;
}
