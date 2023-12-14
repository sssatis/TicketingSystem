import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {BehaviorSubject, map} from 'rxjs';
import {Train, TrainService} from "./train.service";
import {TicketModel} from "../models/ticket";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  private data: TicketModel[];

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private trainService: TrainService) {
    this.data = this.initData();
    // Create test user
    this.register({
      username: 'tst@gmail.com',
      name: 'Test User',
      password: 'tst',
      isActive: false,
      isAdmin: true,
      tickets: this.data
    });
  }

  // отримуємо користувача із локального сховища
  private getValueFromStorage(user: User): User | null {
    const obj = localStorage.getItem(`${user?.username}`);
    if (obj == null) {
      return null;
    }
    return JSON.parse(obj);
  }

  //реєструємо (заносимо користувача до локально сховища)
  register(user: User): boolean {
    const obj = this.getValueFromStorage(user);

    if (obj == null) {
      let lData;
      console.log(JSON.stringify(user).replace(/\[\]/g, lData ?? "[]"));

      localStorage.setItem(`${user?.username}`, JSON.stringify(user).replace(/\[\]/g, lData ?? "[]"));
      return true;
    }
    return false;
  }

  // автовходження в акаунт
  autologin() {
    const len = localStorage.length;
    for (let i = 0; i < len; i++) {
      const key = localStorage.key(i) ?? "";
      const userData = localStorage.getItem(key) ?? "";
      const user: User = JSON.parse(userData);
      if (user.isActive) {
        this.login(user);
        break;
      }
    }
  }

  // вхід в акаунт
  login(user: User): boolean {
    const obj = this.getValueFromStorage(user);
    if (obj == null) {
      return false; //якщо користувач не зареєстрований
    }
    obj.isActive = true;
    localStorage.setItem(`${obj?.username}`, JSON.stringify(obj));
    this.currentUserSource.next(obj);
    console.log(obj);

    return true;  //якщо успішно увійшли
  }

  //вихід з акаунту
  logout() {
    let user = this.currentUserSource.getValue();
    this.currentUser$.pipe(map(u => user = u));

    if (user == null) {
      return;
    }

    user.isActive = false;
    localStorage.setItem(`${user?.username}`, JSON.stringify(user));
    this.currentUserSource.next(null);
  }

  //збереження стану користувача
  save(ticket: TicketModel) {
    const user = this.currentUserSource.getValue();

    localStorage.setItem(`${user?.username}`, JSON.stringify(user));
    const train = this.trainService.trains.find(item => item.trainNum === ticket.train) as Train;
    train.availablePlaces--;
  }

  // отримання користувача
  getUser(): User {
    return this.currentUserSource.getValue() ?? new User();
  }

  removeTicketFromUser(ticket: TicketModel, user: User): void {
    user!.tickets = user!.tickets.filter(item => item.train !== ticket.train);
    const train: Train = this.trainService.trains.find(train => train.trainNum === ticket.train) as Train;
    train.availablePlaces++;
  }

  private initData(): TicketModel[] {
    const trainLvivKyiv = this.trainService.trains[0];
    const trainLvivChernivtsi = this.trainService.trains[1];
    const trainKharkivOdessa = this.trainService.trains[2];

    trainLvivKyiv.availablePlaces--;
    trainLvivChernivtsi.availablePlaces--;
    trainKharkivOdessa.availablePlaces--;

    return [
      new TicketModel(trainLvivKyiv.from, trainLvivKyiv.to, 'Данило Данилович', 'danilo@gmail.com', '+380669958675', `${trainLvivKyiv.date.getHours()}:${trainLvivKyiv.date.getMinutes()}`, formatDate(trainLvivKyiv.date, 'dd-MM-yyyy', 'en'), 1, trainLvivKyiv.trainNum),
      new TicketModel(trainLvivChernivtsi.from, trainLvivChernivtsi.to, 'Данило Данилович', 'danilo@gmail.com', '+380669958675', `${trainLvivChernivtsi.date.getHours()}:${trainLvivChernivtsi.date.getMinutes()}`, formatDate(trainLvivChernivtsi.date, 'dd-MM-yyyy', 'en'), 3, trainLvivChernivtsi.trainNum),
      new TicketModel(trainKharkivOdessa.from, trainKharkivOdessa.to, 'Данило Данилович', 'danilo@gmail.com', '+380669958675', `${trainKharkivOdessa.date.getHours()}:${trainKharkivOdessa.date.getMinutes()}`, formatDate(trainKharkivOdessa.date, 'dd-MM-yyyy', 'en'), 4, trainKharkivOdessa.trainNum),
    ]
  }
}
