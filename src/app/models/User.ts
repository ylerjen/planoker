export class User {
    public vote: string;
    public isFrozen: boolean;
    public username: string;

    constructor(props: { [key: string]: any } = {}) {
        this.isFrozen = props.isFrozen;
        this.username = props.username;
        this.vote = props.vote;
    }
}
