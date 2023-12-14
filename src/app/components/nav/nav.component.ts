import { Component } from '@angular/core';
import { AccountService } from '../../services/accountService';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  // об'єкт користувача реєстрації
  model: User = new User(); 

  ngOnInit(): void { }

  constructor(public accoutnService: AccountService,  // акаунт сервіс
              private router: Router,                 // сервіс навігації
              private toastr:ToastrService) { }       // сервіс вспливаючих повідомлень

  // функція входу в акаунт
  login() { 
    if(this.accoutnService.login(this.model)){
      this.router.navigateByUrl("/train-select");
      return;
    }
    this.toastr.error("Користувач не зареєстрований");
  }
  //функція виходу
  logout() {
    this.accoutnService.logout();
    this.router.navigateByUrl("");
  }
}
