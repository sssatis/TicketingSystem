import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TicketModel} from '../../models/ticket';
import {CommonModule, formatDate} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../../services/accountService';
import {map} from 'rxjs';
import {User} from '../../models/user';
import {ToastService} from "../../services/toast.service";
import {ToastsContainer} from "../toast/toast.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Train, TrainService} from "../../services/train.service";

@Component({
  selector: 'app-order-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastsContainer],
  templateUrl: './order-tickets.component.html',
  styleUrl: './order-tickets.component.css'
})
export class OrderTicketsComponent implements OnInit, OnDestroy {
  @ViewChild('dangerTpl') dangerTpl!: TemplateRef<any>;
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  ticket!: TicketModel;
  user: User | null = new User();  //данні користувача
  dangerMsg!: string;
  train!: Train;

  private trainNum!: number;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private trainService: TrainService
  ) {
    this.route.paramMap.subscribe(params => {
      this.trainNum = Number(params.get('train'));

      this.accountService.currentUser$.pipe(map(u => u)).subscribe(u => this.user = u);
      this.train = this.getTrainInfoByTrainNum();
      this.ticket = new TicketModel(this.train.from, this.train.to, `${this.user?.name}`, `${this.user?.username}`, '', `${this.train.date.getHours()}:${this.train.date.getMinutes()}`, formatDate(this.train.date, "yyyy-MM-dd", "en"), 0, this.trainNum);  //данні про квиток
    });
  }

  //отримання користувача при переході на сторінку
  ngOnInit(): void {

  }

  getTrainInfoByTrainNum(): Train {
    return this.trainService.getTrainByTrainNum(this.trainNum)
  }

  // оформлення замовлення
  order() {
    if (this.user == null) {
      return;
    }

    const {description, ...rest} = this.ticket;

    if (Object.values(rest).some(item => !item)) {
      this.dangerMsg = `Всі поля повинні бути заповнені!`;
      this.showDanger();
      return;
    }

    if (this.ticket.from === this.ticket.to) {
      this.dangerMsg = `Місто відправлення не може збігатися з містом прибуття`;
      this.showDanger();
      return;
    }

    this.user.tickets.push(this.ticket);
    this.ticket = new TicketModel(this.train.from, this.train.to, `${this.user.name}`, `${this.user.username}`, '', `${this.train.date.getHours()}:${this.train.date.getMinutes()}`, formatDate(this.train.date, "yyyy-MM-dd", "en"), 0, this.trainNum);
    console.log(this.user);

    this.accountService.save(this.ticket);
    this.showSuccess();
    this.router.navigateByUrl('tickets-list');
  }

  showSuccess() {
    this.toastService.show({template: this.successTpl, classname: 'bg-success text-light', delay: 1500});
  }

  showDanger() {
    this.toastService.show({template: this.dangerTpl, classname: 'bg-danger text-light', delay: 1500});
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
