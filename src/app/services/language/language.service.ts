import { Injectable } from '@angular/core';
import { StorageList } from 'src/app/models/storage-list';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private storage: StorageService
  ) { }

  async _init(lang: string, path: string): Promise<void> {
    await this.storage.setSingleObject(StorageList.language, lang);
    await this.storage.setSingleObject(StorageList.path, path);
  }
}
