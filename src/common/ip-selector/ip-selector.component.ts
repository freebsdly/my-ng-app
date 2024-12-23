import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  IpInfo,
  IpInfoQueryOptions,
  IpService,
} from '../../services/ip.service';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { CommonService } from '../../services/common.service';

@Component({
  standalone: true,
  selector: 'app-ip-selector',
  templateUrl: './ip-selector.component.html',
  styleUrls: ['./ip-selector.component.css'],
  imports: [FormsModule, NzSelectModule],
})
export class IpSelectorComponent implements OnInit {
  @Input({ required: true })
  selectedIps: string[] = [];
  @Output()
  selectedIpsChange: EventEmitter<IpInfo[]> = new EventEmitter();
  showSearch = true;
  listOfIps: IpInfo[] = [];
  commonService: CommonService;
  ipService: IpService;
  loading = false;
  isServerSearch = true;
  autoClearSearchValue = false;
  allowClear = true;
  searchChange$ = new BehaviorSubject('');

  constructor(service: CommonService, ip: IpService) {
    this.commonService = service;
    this.ipService = ip;
  }

  ngOnInit() {
    this.searchChange$
      .pipe(
        // debounceTime(100),
        switchMap((name) =>
          this.ipService.getIpInfos({ keyword: name } as IpInfoQueryOptions)
        )
      )
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.listOfIps = value;
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
    this.selectedIpsChange.emit($event);
  }
}
