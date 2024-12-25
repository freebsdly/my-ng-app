import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModelSelectorComponent } from '@/shared/components/model-selector/model-selector.component';
import { ModelInfo } from '@/shared/services/model.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ModelSelectorComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
  selectedModel: ModelInfo = {
    id: 1,
    name: '模型１',
    key: 'model1',
    group: 'group1',
  };
}
