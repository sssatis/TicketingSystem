import { TicketModel } from "./ticket";
// сутність користувача
export class User{
    username: string ="";
    password: string ="";
    isActive: boolean = false;
    tickets: TicketModel[] = [];
}