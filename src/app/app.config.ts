import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  LOCALE_ID,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { zh_CN, en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(zh);
registerLocaleData(en);

const languagePrivider = {
  provide: NZ_I18N,
  useFactory: () => {
    const localId = inject(LOCALE_ID);
    switch (localId) {
      /** 与 angular.json i18n/locales 配置一致 **/
      case 'zh':
        return zh_CN;
      default:
        return en_US;
    }
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    languagePrivider,
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
