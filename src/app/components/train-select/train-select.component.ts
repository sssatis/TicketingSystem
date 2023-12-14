import {CommonModule, DecimalPipe} from '@angular/common';
import {Component, OnInit, PipeTransform} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Train, TrainService} from "../../services/train.service";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {NgbHighlight} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../services/accountService";


@Component({
  selector: 'app-train-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbHighlight],
  providers: [DecimalPipe],
  templateUrl: './train-select.component.html',
  styleUrl: './train-select.component.css'
})
export class TrainSelectComponent implements OnInit {
  trainNum: number = 0;
  trains: Train[] = [];
  filter = new FormControl('', { nonNullable: true });
  trains$!: Observable<Train[]>;

  constructor(public accountService: AccountService,
              private toastrs: ToastrService,
              private router: Router,
              private trainService: TrainService,
              private pipe: DecimalPipe) {
  }

  ngOnInit(): void {
    this.trains = this.trainService.trains;
    this.trains$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((text) => this.search(text, this.pipe))
    )
  }

  selectTrain(train: Train) {
    if (train.availablePlaces == 0) {
      this.toastrs.error("У даному потягу немає місць!");
      return;
    }
    this.trainNum = train.trainNum;
  }

  next() {
    this.router.navigateByUrl(`order-tickets/${this.trainNum}`);
  }

  private search(text: string, pipe: PipeTransform): Train[] {
    return this.trains.filter((train) => {
      const term = text.toLowerCase();
      return (
        train.from.toLowerCase().includes(term) ||
        train.to.toLowerCase().includes(term)
      );
    });
  }

  removeTrain(train: Train): void {
    this.trainService.removeTrain(train);
    this.ngOnInit();
  }
}
