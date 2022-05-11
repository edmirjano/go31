import { Injectable } from '@angular/core';
import { Lang } from 'src/app/models/language.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _langData: Lang;
  constructor(
    private storage: StorageService
  ) { }

  async _init(lang: string, path: string): Promise<void> {
    await this.storage.setSingleObject(StorageListModel.language, lang);
    await this.storage.setSingleObject(StorageListModel.path, path);
  }


  async getLanguageData(): Promise<Lang>{
    if(!this._langData){
      this._langData = await this.storage.getSingleObject(StorageListModel.languageData);
    }
    return this._langData;
  }
}
