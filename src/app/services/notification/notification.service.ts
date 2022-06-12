import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationSchedule, LocalNotificationSchema, Schedule, ScheduleOn, ScheduleOptions } from '@capacitor/local-notifications';
import { NotificationOptionModel } from 'src/app/models/notification-option.model';
import { PostModel } from 'src/app/models/post.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private storage: StorageService
  ) { }

  async _init() {
    LocalNotifications.requestPermissions().then((data) => {
      if (data.display != 'denied') {
        this.storage.setSingleObject(StorageListModel.notificationPermission, "1");
      }
    })
  }

  async initNotifications(posts: PostModel[], forced: boolean = false) {
    const savedTime = await this.storage.getSingleObjectString(StorageListModel.notificationDate);
    let time: Date = new Date();
    if(savedTime){
      time = new Date(savedTime);
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
          hour: time.getHours(),
          minute: time.getMinutes()
        }
        const schedule: Schedule = {
          repeats: true,
          every: 'month',
          allowWhileIdle: true,
          on: scheduleOn
        };
        const localNotificationSchema: LocalNotificationSchema = {
          id: post.id,
          title: post.acf.push_notification_title,
          body: post.excerpt.rendered,
          schedule: schedule
        };
        options.notifications.push(localNotificationSchema);
      });
      await LocalNotifications.schedule(options);
      this.storage.setSingleObject(StorageListModel.notificationsScheduled, "1");
    }
  }
}
