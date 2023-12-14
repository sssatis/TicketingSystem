import {Injectable} from "@angular/core";

export interface Train {
  trainNum: number;
  from: string;
  to: string;
  date: Date;
  totalPlaces: number;
  availablePlaces: number;
}

@Injectable({ providedIn: 'root' })
export class TrainService {
  public trains: Train[] = [
    {
      trainNum: 656,
      from: 'Львів',
      to: 'Київ',
      date: new Date('2023-12-24 12:15'),
      totalPlaces: 125,
      availablePlaces: 125
    }, {
      trainNum: 239,
      from: 'Львів',
      to: 'Чернівці',
      date: new Date('2023-12-19 10:28'),
      totalPlaces: 322,
      availablePlaces: 322
    }, {
      trainNum: 56,
      from: 'Харків',
      to: 'Одеса',
      date: new Date('2023-12-21 13:13'),
      totalPlaces: 66,
      availablePlaces: 66
    }
  ]

  getTrainByTrainNum(trainNum: number): Train {
    return this.trains.find(train => train.trainNum === trainNum) as Train;
  }

  removeTrain(train: Train): void {
    this.trains = this.trains.filter(item => item.trainNum !== train.trainNum);
  }

  addTrain(train: Train): boolean {
    if (this.trains.find(item => item.trainNum === train.trainNum)) {
      return false;
    }

    this.trains.push(train);
    return true;
  }
}
