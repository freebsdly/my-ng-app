import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NzDrawerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  @Input({ required: true })
  visible = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  close() {
    this.visibleChange.emit(false);
  }

  ngOnInit(): void {}
}
