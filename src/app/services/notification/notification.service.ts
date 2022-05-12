import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { NotificationOptionModel } from 'src/app/models/notification-option.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _options: ScheduleOptions;

  constructor(
    private storage: StorageService
  ) { }

  
  async _init(){
    LocalNotifications.requestPermissions().then((data)=>{
      if(data.display != 'denied'){
        this.storage.setSingleObject(StorageListModel.notificationPermission, "1");
      }
    })
  }

  async schedule(){
    
    await LocalNotifications.schedule(this._options)
  }



  async getOptions(): Promise<NotificationOptionModel>{
    return this.storage.getSingleObject(StorageListModel.notificationOptions).then((data: NotificationOptionModel)=>{
      return data;
    })
  }

}
