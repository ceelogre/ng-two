import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from 'src/app/provider/service/data.service';
import { ELanguage } from './../enum/language.enum';
import { EStorageFields } from './../service/data.service';

@Injectable({ providedIn: 'root' })
export class TranslationResolver implements Resolve<any> {
  constructor(private data: DataService) { }
  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    if (!this.data.localStorageFind(EStorageFields.LANGUAGE)) {
      this.data.localStorageSet(EStorageFields.LANGUAGE, ELanguage.RW);
    }
    return this.data.getTranslations();
  }

}

