import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dict-selector',
  standalone: true,
  imports: [],
  templateUrl: './dict-selector.component.html',
  styleUrl: './dict-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictSelectorComponent implements OnInit {
  ngOnInit() {}
}
