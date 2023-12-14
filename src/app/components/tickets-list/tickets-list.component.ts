import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/accountService';
import {User} from '../../models/user';
import {CommonModule} from '@angular/common';
import {TicketModel} from "../../models/ticket";

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit{
  public user:User | null = new User();  //данні користувача
  constructor(private accountService:AccountService){
    this.user = this.accountService.getUser();   //запитуємо користувача у сервісу і виводимо його данні у .html
  }
  ngOnInit(): void {
  }

  removeTicket(ticket: TicketModel) {
    this.accountService.removeTicketFromUser(ticket, this.user as User);
  }
}
