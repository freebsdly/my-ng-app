import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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

  constructor() {}

  close() {
    console.log('------> close');
  }

  ngOnInit(): void {}
}
