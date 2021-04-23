import { IUser } from "./IUser";

export class User implements IUser{
    id:number; 
    name:string; 
    isActive:boolean;
}