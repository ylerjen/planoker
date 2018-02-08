export class JoinSessionCommand {
    sessionId: string;
    username: string;
}

export class ChangeSubjectCommand {
    sessionId: string;
    subject: string;
}
