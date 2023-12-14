import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../app.routes';

class Train{
  number: number =0;
  all:number =0;
  free:number = 0;
}


@Component({
  selector: 'app-train-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './train-select.component.html',
  styleUrl: './train-select.component.css'
})
export class TrainSelectComponent implements OnInit{
  constructor(private toastrs: ToastrService,
              private router:Router){}
  ngOnInit(): void {
    this.gen();
  }
  trainNum:number = 0;
  trains:Train[]=[];
  gen(){
    this.trains = [];
    const count = this.randomInteger(5, 8);
    for (let i = 0; i < count; i++) {
      this.trains.push({
        number: this.randomInteger(100, 1000),
        all: this.randomInteger(50, 70), 
        free: this.randomInteger(0, 5)});
    }
  }
  private randomInteger(min:number, max:number) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  selectTrain(train:Train){
    if(train.free == 0){
      this.toastrs.error("У даному потягу немає місць!");
      return;
    }
    this.trainNum = train.number;
  }
  next(){
      this.router.navigateByUrl('order-tickets');
  }
}
