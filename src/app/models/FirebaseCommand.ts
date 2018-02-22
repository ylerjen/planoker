import { User } from './User';

export class JoinSessionCommand {
    sessionId: string;
    username: string;
}

export class ChangeSubjectCommand {
    sessionId: string;
    subject: string;
}

export class UserUpdateCommand extends User {
    public sessionId: string;

    constructor(props: { [key: string]: any } = {}) {
        super(props);
        this.sessionId = props.sessionId || '';
    }
}
