import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerMode = false;

  constructor(private toastr: ToastrService){}

  // функція перемикання режиму реєстрації
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  // функція повернення на головний екран
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
  // функція натискання на кнопку "дізнатись більше"
  learnMore(){
    this.toastr.info("Супе-пупер застосунок. Топ 1!😁😁😁");
  }
}
