import { Time } from "@angular/common";
// сутність квитка
export class TicketModel {    
    public description: string = '';
    public dateString: string = '';
    public train:number = 0;
    constructor(public from: string,
                public to: string,
                public name: string,
                public email: string,
                public phone: string,
                public time: Time,
                public date: Date,
                public place: number
                ) { }
}