import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input()
  visible = false;


  showModal(): void {
    this.visible = true;
  }

  handleOk() {
    console.log('Button ok clicked!');
    this.visible = false;
  }
  handleCancel() {
    console.log('Button cancel clicked!');
    this.visible = false;
  }
}
