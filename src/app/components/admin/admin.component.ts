import {Component, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastsContainer} from "../toast/toast.component";
import {TicketModel} from "../../models/ticket";
import {formatDate} from "@angular/common";
import {Train, TrainService} from "../../services/train.service";
import { ToastService } from '../../services/toast.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastsContainer,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  train: Train = {
    from: '',
    to: '',
    trainNum: 0,
    totalPlaces: 0,
    availablePlaces: 0,
    date: new Date()
  };

  constructor(private trainService: TrainService, private toastrService: ToastrService) {
  }

  addTrain(): void {
    this.train.availablePlaces = this.train.totalPlaces;
    this.train.date = new Date(this.train.date);

    const result = this.trainService.addTrain(this.train);

    if (!result) {
      this.toastrService.error('Потяг з таким номером вже існує!')
    }

    this.train = {
      from: '',
      to: '',
      trainNum: 0,
      totalPlaces: 0,
      availablePlaces: 0,
      date: new Date()
    };
    this.toastrService.success('Новий потяг створено успішно')

  }
}
