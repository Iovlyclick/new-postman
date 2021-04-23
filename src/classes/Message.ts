import { IMessage } from "./IMessage";
import { User } from "./User";

export class Message implements IMessage {
    content: string;
    sender: User;
    receiver: User;
}