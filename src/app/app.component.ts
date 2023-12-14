import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AccountService } from './services/accountService';
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  // providers:[AccountService],
  imports: [CommonModule, RouterOutlet, NavComponent, ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'train-ticket-app';
// це головний компонент, при переході сюди виконується спроба автоматичного входу в акаунт
  constructor(private accountService:AccountService){  }
  ngOnInit(): void {
    this.accountService.autologin();
  }


}
