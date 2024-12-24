import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-server-modifier',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input({ required: true })
  visible = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();

  showModal(): void {
    this.visible = true;
  }

  handleOk() {
    console.log('Button ok clicked!');
    this.visibleChange.emit(false);
  }
  handleCancel() {
    console.log('Button cancel clicked!');
    this.visibleChange.emit(false);
  }
}
