import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModelSelectorComponent } from '@/shared/components/model-selector/model-selector.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ModelSelectorComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
  selectedModel = "vm";
}
