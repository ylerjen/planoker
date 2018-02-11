export class JoinSessionCommand {
    sessionId: string;
    username: string;
}

export class ChangeSubjectCommand {
    sessionId: string;
    subject: string;
}

export class VoteCommand {
    sessionId: string;
    username: string;
    vote: string;
    isFrozen: boolean;
}
