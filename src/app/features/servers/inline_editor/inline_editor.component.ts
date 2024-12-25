import { FormsModule } from '@angular/forms';
import { ServerInfo } from '@/shared/services/server.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ModelSelectorComponent } from '@/shared/components/model-selector/model-selector.component';
import { IpSelectorComponent } from '@/shared/components/ip-selector/ip-selector.component';

@Component({
  selector: 'app-server-inline-editor',
  standalone: true,
  imports: [FormsModule, ModelSelectorComponent, IpSelectorComponent],
  templateUrl: './inline_editor.component.html',
  styleUrl: './inline_editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InlineEditorComponent {
  @Input({ required: true })
  editRecord: ServerInfo = {} as ServerInfo;

  cancelEdit(id?: string): void {}

  saveEdit(id?: string): void {}

  onNextRebootTimeChange($event: any, id?: string) {
    console.log($event, id);
  }
}
