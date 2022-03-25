import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setSingleObject(key: string, value: string) {
    await Storage.set({
      key: key,
      value: value
    });
  }
  async getSingleObject(key: string) {
    const ret = await Storage.get({ key: key });
    const retObj = JSON.parse(ret.value);
    return retObj;
  }

  async getSingleObjectString(key: string) {
    const ret = await Storage.get({ key: key });
    const retObj: string = ret.value;
    return retObj;
  }

  async removeSingleObject(key: string) {
    await Storage.remove({ key: key });
    return true;
  }

  async keysAll() {
    const { keys } = await Storage.keys();
    return keys;
  }

  async clearAll() {
    await Storage.clear();
    return true;
  }
}
