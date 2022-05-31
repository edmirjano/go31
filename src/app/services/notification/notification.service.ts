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

  private _options: ScheduleOptions;

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

  async initNotifications(posts: PostModel[]) {
    const notificaitonsScheduled = await this.storage.getSingleObject(StorageListModel.notificationsScheduled);
    if (!notificaitonsScheduled) {
      let options: ScheduleOptions = {
        notifications: []
      };
      posts.forEach(post => {
        const scheduleOn: ScheduleOn = {
          day: Number(post.acf.post_number),
          hour: 11,
          minute: 45
        }

        const schedule: Schedule = {
          repeats: true,
          every: 'month',
          // at: scheduleOn,
          allowWhileIdle: true,
          on: scheduleOn
        };
        const localNotificationSchema: LocalNotificationSchema = {
          id: post.id,
          title: post.title.rendered,
          body: post.excerpt.rendered,
          schedule: schedule
        };
        options.notifications.push(localNotificationSchema);
      });
      await LocalNotifications.schedule(options);
    }
  }

  async getOptions(): Promise<NotificationOptionModel> {
    return this.storage.getSingleObject(StorageListModel.notificationOptions).then((data: NotificationOptionModel) => {
      return data;
    })
  }

}
