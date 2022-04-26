import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _options: ScheduleOptions;
  constructor() { }



  async schedule(){
    
    await LocalNotifications.schedule(this._options)
  }

}
