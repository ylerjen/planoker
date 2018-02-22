export class User {
    public isFrozen: boolean;
    public isIgnored: boolean;
    public username: string;
    public vote: string;

    constructor(props: { [key: string]: any } = {}) {
        this.isFrozen = props.isFrozen || false;
        this.isIgnored = props.isIgnored || false;
        this.username = props.username || '';
        this.vote = props.vote || '';
    }
}
