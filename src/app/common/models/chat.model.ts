export class FzChat {
    userId: number;
    companionId: number;
    chatName: string;
    companionAvatarUrl: string;
    messages: FzChatMessage[];
}

export class FzChatMessage {
    message: string;
    ownerId: number;
    companionId: number;
    date: any;
    isOwner: boolean;

    constructor(ownerId: number, companionId: number, message: string, date: any){
        this.ownerId = ownerId;
        this.companionId = companionId;
        this.message = message;
        this.date = date;
    }
}
