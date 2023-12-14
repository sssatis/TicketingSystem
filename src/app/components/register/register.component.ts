import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../../services/accountService';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model:User = new User();
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService:AccountService,
              private toastr: ToastrService){}
  //реєстрація користувача в системі
  register(){
    //отримаємо данні користувача і передаємо їх у сервіс реєстрації
    if(!this.accountService.register(this.model)){
      this.toastr.error("Користувач вже зареєстрований!");
      return;
    }
    // повертаємося на головну сторінку
    this.cancel();
    this.model = new User();
  }
  // поівертаємося на головну сторінку
  cancel(){
    this.cancelRegister.emit(false);    
  }
}
