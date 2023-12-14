import {Component} from '@angular/core';
import {AccountService} from '../../services/accountService';
import {User} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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

  constructor(public accountService: AccountService,  // акаунт сервіс
              private router: Router,                 // сервіс навігації
              private toastr:ToastrService) { }       // сервіс вспливаючих повідомлень

  // функція входу в акаунт
  login() {
    if(this.accountService.login(this.model)){
      this.router.navigateByUrl("/train-select");
      return;
    }
    this.toastr.error("Користувач не зареєстрований");
  }
  //функція виходу
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("");
  }
}
