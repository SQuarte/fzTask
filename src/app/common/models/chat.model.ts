export class Chat {
    userId: number;
    companionId: number;
    chatName: string;
    messages: ChatMessage[];
}

export class ChatMessage {
    message: string;
    ownerId: number;
    companionId: number;
    date: any;

    constructor(ownerId: number, companionId: number, message: string, date: any){
        this.ownerId = ownerId;
        this.companionId = companionId;
        this.message = message;
        this.date = date;
    }
}
