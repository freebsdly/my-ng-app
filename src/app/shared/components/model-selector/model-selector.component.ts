import { CommonService } from '@/shared/services/common.service';
import {
  ModelInfo,
  ModelQueryOptions,
  ModelService,
} from '@/shared/services/model.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-model-selector',
  templateUrl: './model-selector.component.html',
  styleUrls: ['./model-selector.component.css'],
  standalone: true,
  imports: [FormsModule, NzSelectModule],
})
export class ModelSelectorComponent implements OnInit {
  @Input({ required: true })
  selectedModel: string = '';
  @Output()
  selectedModelChange: EventEmitter<ModelInfo> = new EventEmitter();
  showSearch = true;
  listOfGroups: { group: string; infos: ModelInfo[] }[] = [];
  commonService: CommonService;
  modelService: ModelService;
  loading = false;
  isServerSearch = true;
  autoClearSearchValue = false;
  allowClear = true;
  searchChange$ = new BehaviorSubject('');

  constructor(service: CommonService, model: ModelService) {
    this.commonService = service;
    this.modelService = model;
  }

  modelInfosToGroups(
    value: ModelInfo[]
  ): { group: string; infos: ModelInfo[] }[] {
    return Array.from(
      value
        .reduce((acc, info) => {
          let infos = acc.get(info.group);
          if (infos) {
            infos.push(info);
          } else {
            infos = [info];
          }
          acc.set(info.group, infos);
          return acc;
        }, new Map<string, ModelInfo[]>())
        .entries(),
      ([group, infos]) => ({ group, infos })
    );
  }

  ngOnInit() {
    this.searchChange$
      .pipe(
        // debounceTime(100),
        switchMap((keyword) =>
          this.modelService.getModelInfos({ keyword } as ModelQueryOptions)
        )
      )
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.listOfGroups = this.modelInfosToGroups(value);
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  onSearch(value: string) {
    this.loading = true;
    this.searchChange$.next(value);
  }

  onSelectedOptionsChange($event: any) {
    this.selectedModelChange.emit($event);
  }
}
