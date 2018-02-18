import { ISessionState } from '../stores/reducers/session/session.reducer';

export class Session implements ISessionState {
    public sessionId: string;
    public username: string;
    public isRevealed: boolean;

    constructor(props: { [key: string]: any } = {}) {
        this.sessionId = props.sessionId;
        this.username = props.username;
        this.isRevealed = props.isRevealed;
    }
}
