export class Session {
    public sessionId: string;
    public username: string;
    public isRevealed?: boolean;

    constructor(props: { [key: string]: any } = {}) {
        this.sessionId = props.sessionId;
        this.username = props.username;
        this.isRevealed = !!props.isRevealed;
    }
}

export interface IRevealStatusCommand {
    sessionId: string;
    isRevealedState: boolean;
}
