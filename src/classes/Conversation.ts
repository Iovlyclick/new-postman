import { IConversation } from "./IConversation";
import { Message } from "./Message";
import { User } from "./User";

export class Conversation implements IConversation{
    user: User; 
    messages: Message[]; 
}