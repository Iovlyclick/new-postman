import { Message } from "./Message";
import { User } from "./User";

export interface IConversation{
    user : User; 
    messages : Message[];
}