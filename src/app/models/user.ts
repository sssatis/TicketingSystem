import { TicketModel } from "./ticket";
// сутність користувача
export class User{
    username: string = "";
    password: string = "";
    name: string = "";
    tickets: TicketModel[] = [];
    isActive: boolean = false;
    isAdmin: boolean = false;
}
