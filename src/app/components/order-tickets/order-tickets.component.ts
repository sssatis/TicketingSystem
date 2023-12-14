import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../models/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/accountService';
import { map } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-order-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-tickets.component.html',
  styleUrl: './order-tickets.component.css'
})
export class OrderTicketsComponent implements OnInit{
  ticket:TicketModel = new TicketModel('','','','','',{hours:0,minutes:0}, new Date, 0);  //данні про квиток
  user:User|null =new User();  //данні користувача
  constructor(private accountService: AccountService){

  }
  //отримання користувача при переході на сторінку
  ngOnInit(): void {
    this.accountService.currentUser$.pipe(map(u=>u)).subscribe(u => this.user = u);
    
  }
  // оформлення замовлення
  order(){
    if(this.user == null){
      return;
    }
    this.user.tickets.push(this.ticket);
    this.ticket = new TicketModel('','','','','',{hours:0,minutes:0}, new Date, 0);
    console.log(this.user);
    this.accountService.save();
  }
}
