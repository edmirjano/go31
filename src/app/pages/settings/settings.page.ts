import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonPopover } from '@ionic/angular';
import { Lang, LanguageModel } from 'src/app/models/language.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { LanguageService } from 'src/app/services/language/language.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { WpService } from 'src/app/services/wp/wp.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild(IonPopover, { static: true }) popover: IonPopover;
  // @ViewChild(IonDatetime, { static: true }) time: IonDatetime;
  selectedTime: string = new Date().toISOString();
  userTimeZone: any;
  allowNotifications: boolean;
  languages: LanguageModel;
  langArray: Lang[] = [];
  currentLanguage: string;
  langData: Lang;
  constructor(
    private wp: WpService,
    private storage: StorageService,
    private language: LanguageService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this._init();
  }

  async _init() {
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.wp.getLanguages().then((data)=>{
      this.languages = data;
      Object.entries(this.languages.acf.language_list).forEach(lang => {
        const [key, value] = lang;
        this.langArray.push(value);
      });
    });
    this.currentLanguage = await this.storage.getSingleObjectString(StorageListModel.language);
    this.langData = await this.language.getLanguageData();
    this.storage.getSingleObjectString(StorageListModel.notificationPermission).then((data)=>{
      if(data === "1"){
        this.allowNotifications = true;
      }
    });
    this.storage.getSingleObjectString(StorageListModel.notificationDate).then((data)=>{
      if(data){
        alert(data);
        this.selectedTime = new Date(data).toISOString();
      }
    })
  }

  confirm(event) {
    this.popover.dismiss();
  }

  async changeDate(value: string) {
    const datetime = new Date(value);
    this.selectedTime = datetime.toISOString();
    await this.storage.setSingleObject(StorageListModel.notificationDate, datetime.toISOString());
    await this.notification.initNotifications(await this.storage.getSingleObject(StorageListModel.allPosts), true);
  }

  async onLanguageChange(event){
    const lang = event.target.value;
    const newLang = this.langArray.filter((data)=>{
      return data.lang_name = lang;
    })[0];
    await this.language._init(lang.lang_name, lang.path, lang);
    this.currentLanguage = await this.storage.getSingleObjectString(StorageListModel.language);
  }


  allowNotificationChange(event){
    this.allowNotifications = event;
    if(this.allowNotifications){
      this.storage.setSingleObject(StorageListModel.notificationPermission, "1");
    } else {
      this.storage.removeSingleObject(StorageListModel.notificationPermission);
    }
  }
}
