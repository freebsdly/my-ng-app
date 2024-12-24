import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ServerInfo, ServerService } from '@/shared/services/server.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonService } from '@/shared/services/common.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { IpSelectorComponent } from '@/shared/components/ip-selector/ip-selector.component';
import { ModifierComponent } from '@/features/servers/modifier/modifier.component';
import { ModelSelectorComponent } from '@/shared/components/model-selector/model-selector.component';

@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,
    NzButtonModule,
    NzSpaceModule,
    NzIconModule,
    NzDatePickerModule,
    IpSelectorComponent,
    ModifierComponent,
    ModelSelectorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  setOfCheckedId = new Set<string>();
  editCache: { [key: string]: { edit: boolean; data: ServerInfo } } = {};
  listOfData: ServerInfo[] = [];
  listOfCurrentPageData: readonly ServerInfo[] = [];
  pageSizeOptions = [10, 30, 50, 100];
  loading = false;
  checked = false;
  indeterminate: boolean = false;
  serverService: ServerService;
  commonService: CommonService;
  showModifier: boolean = false;

  constructor(common: CommonService, service: ServerService) {
    this.serverService = service;
    this.commonService = common;
  }

  onNextRebootTimeChange($event: any, id: string) {
    console.log($event, id);
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ServerInfo[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  loadData() {
    this.loading = true;
    let data = this.serverService.getServerInfos().subscribe({
      next: (value) => {
        this.listOfData = value;
        this.loading = false;
        this.updateEditCache();
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.commonService.getPageOptions().subscribe({
      next: (value) => (this.pageSizeOptions = value.pageSizeOptions),
      error: (err) => {
        console.error(err);
        this.pageSizeOptions = [10, 20, 30];
      },
    });
    this.loadData();
  }

  showServerModifier() {
    this.showModifier = true;
  }
}
