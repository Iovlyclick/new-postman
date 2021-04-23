import { User } from "./User";

export interface IMessage {
    content: string;
    sender: User;
    receiver: User;
}