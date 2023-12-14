import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor() { }

  // отримуємо користувача із локального сховища
  private getValueFromStorage(user:User):User|null{
    const obj = localStorage.getItem(`${user?.username}:${user?.password}`);
    if(obj == null){
      return null;
    }
    return JSON.parse(obj);
  }

  //реєструємо (заносимо користувача до локально сховища)
  register(user:User):boolean{
    const obj = this.getValueFromStorage(user);
    
    if(obj == null){
      let lData;
      //ЯКЩО ТРЕБА, ЩОБ У КОРИСТУВАЧА БУЛИ БІЛЕТИ З САМОГО ПОЧАТКУ (щоб не вводити вручну)
      lData = JSON.stringify(this.data); //ЦЕЙ РЯДОК МАЄ БУТИ НЕ ЗАКОМЕНТОВАНИМ
      console.log(lData);
      console.log(JSON.stringify(user).replace(/\[\]/g, lData??"[]"));
      
      localStorage.setItem(`${user?.username}:${user?.password}`, JSON.stringify(user).replace(/\[\]/g, lData??"[]"));
      return true;
    }
    return false;
  }

  // автовходження в акаунт
  autologin(){
    const len = localStorage.length;
    for (let i = 0; i < len; i++) {
      const key = localStorage.key(i) ?? "";
      const userData = localStorage.getItem(key) ?? "";
      const user: User = JSON.parse(userData);
      if(user.isActive){
        this.login(user);
        break;
      }
    }
  }

  // вхід в акаунт
  login(user:User):boolean{
    const obj = this.getValueFromStorage(user);
    if(obj == null){
      return false; //якщо користувач не зареєстрований
    }
    obj.isActive = true;
    localStorage.setItem(`${obj?.username}:${obj?.password}`, JSON.stringify(obj));
    this.currentUserSource.next(obj);
    console.log(obj);
    
    return true;  //якщо успішно увійшли
  }

  //вихід з акаунту
  logout(){
    var user = this.currentUserSource.getValue();
    this.currentUser$.pipe(map(u=> user = u));
    if(user == null){
      return;
    }
    user.isActive = false;
    localStorage.setItem(`${user?.username}:${user?.password}`, JSON.stringify(user));
    this.currentUserSource.next(null);
  }
  //збереження стану користувача
  save(){
    var user = this.currentUserSource.getValue();
    localStorage.setItem(`${user?.username}:${user?.password}`, JSON.stringify(user));

  }
  // отримання користувача
  getUser():User{
    return this.currentUserSource.getValue() ?? new User();
  }
  //початкові данні
private data:any=[
  {
    "from": "Луцьк",
    "to": "Рівне",
    "name": "Ірина",
    "email": "email0@example.com",
    "phone": "123-456-0",
    "time": {
      "hours": 0,
      "minutes": 30
    },
    "date": "2022-12-31T22:00:00.000Z",
    "place": 1,
    "description": ""
  },
  {
    "from": "Запоріжжя",
    "to": "Івано-Франківськ",
    "name": "Ганна",
    "email": "email1@example.com",
    "phone": "123-456-1",
    "time": {
      "hours": 1,
      "minutes": 30
    },
    "date": "2023-01-01T22:00:00.000Z",
    "place": 2,
    "description": ""
  },
  {
    "from": "Тернопіль",
    "to": "Луцьк",
    "name": "Ганна",
    "email": "email2@example.com",
    "phone": "123-456-2",
    "time": {
      "hours": 2,
      "minutes": 30
    },
    "date": "2023-01-02T22:00:00.000Z",
    "place": 3,
    "description": ""
  },
  {
    "from": "Луцьк",
    "to": "Запоріжжя",
    "name": "Жанна",
    "email": "email3@example.com",
    "phone": "123-456-3",
    "time": {
      "hours": 3,
      "minutes": 30
    },
    "date": "2023-01-03T22:00:00.000Z",
    "place": 4,
    "description": ""
  },
  {
    "from": "Івано-Франківськ",
    "to": "Луцьк",
    "name": "Дмитро",
    "email": "email4@example.com",
    "phone": "123-456-4",
    "time": {
      "hours": 4,
      "minutes": 30
    },
    "date": "2023-01-04T22:00:00.000Z",
    "place": 5,
    "description": ""
  },
  {
    "from": "Луцьк",
    "to": "Львів",
    "name": "Захар",
    "email": "email5@example.com",
    "phone": "123-456-5",
    "time": {
      "hours": 5,
      "minutes": 30
    },
    "date": "2023-01-05T22:00:00.000Z",
    "place": 6,
    "description": ""
  },
  {
    "from": "Івано-Франківськ",
    "to": "Дніпро",
    "name": "Дмитро",
    "email": "email6@example.com",
    "phone": "123-456-6",
    "time": {
      "hours": 6,
      "minutes": 30
    },
    "date": "2023-01-06T22:00:00.000Z",
    "place": 7,
    "description": ""
  },
  {
    "from": "Львів",
    "to": "Київ",
    "name": "Жанна",
    "email": "email7@example.com",
    "phone": "123-456-7",
    "time": {
      "hours": 7,
      "minutes": 30
    },
    "date": "2023-01-07T22:00:00.000Z",
    "place": 8,
    "description": ""
  },
  {
    "from": "Львів",
    "to": "Запоріжжя",
    "name": "Жанна",
    "email": "email8@example.com",
    "phone": "123-456-8",
    "time": {
      "hours": 8,
      "minutes": 30
    },
    "date": "2023-01-08T22:00:00.000Z",
    "place": 9,
    "description": ""
  },
  
]
}
