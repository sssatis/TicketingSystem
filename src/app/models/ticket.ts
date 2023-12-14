import {Train} from "../services/train.service";
// сутність квитка
export class TicketModel {
    public description: string = '';

    constructor(public from: string,
                public to: string,
                public name: string,
                public email: string,
                public phone: string,
                public time: string,
                public date: string,
                public place: number,
                public train: number,
                ) { }
}
