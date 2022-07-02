import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationSchedule, LocalNotificationSchema, Schedule, ScheduleOn, ScheduleOptions } from '@capacitor/local-notifications';
import { Lang } from 'src/app/models/language.model';
import { NotificationOptionModel } from 'src/app/models/notification-option.model';
import { PostModel } from 'src/app/models/post.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../language/language.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  langData: Lang;
  constructor(
    private storage: StorageService,
    private language: LanguageService
  ) { }

  async _init() {
    this.langData = await this.language.getLanguageData();
    LocalNotifications.requestPermissions().then((data) => {
      if (data.display != 'denied') {
        this.storage.setSingleObject(StorageListModel.notificationPermission, "1");
      }
    })
  }

  async initNotifications(posts: PostModel[], forced: boolean = false) {
    const savedTime = await this.storage.getSingleObjectString(StorageListModel.notificationDate);
    let time: string = new Date(environment.DEFAULT_DATE).toISOString();
    if(savedTime){
      time = new Date(savedTime).toISOString();
    }
    const notificaitonsScheduled = await this.storage.getSingleObject(StorageListModel.notificationsScheduled);
    const notificaitonsAllowed = await this.storage.getSingleObjectString(StorageListModel.notificationPermission);
    if (notificaitonsAllowed == "1" && (!notificaitonsScheduled || forced)) {
      let options: ScheduleOptions = {
        notifications: []
      };
      posts.forEach(post => {
        const scheduleOn: ScheduleOn = {
          day: Number(post.acf.post_number),
          hour: Number(time.slice(11, 13)),
          minute: Number(time.slice(14, 16))
        }
        const schedule: Schedule = {
          repeats: true,
          every: 'month',
          allowWhileIdle: true,
          on: scheduleOn
        };
        const localNotificationSchema: LocalNotificationSchema = {
          id: post.id,
          title: this.langData && this.langData.pray_today ? this.langData.pray_today : 'Pray today',
          body: post.acf.push_notification_title,         
          schedule: schedule
        };
        options.notifications.push(localNotificationSchema);
      });
      await LocalNotifications.schedule(options);
      this.storage.setSingleObject(StorageListModel.notificationsScheduled, "1");
    }
  }
  
}
