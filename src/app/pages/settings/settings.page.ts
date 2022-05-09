import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonPopover } from '@ionic/angular';
import { Lang, LanguageModel } from 'src/app/models/language.model';
import { StorageList } from 'src/app/models/storage-list';
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
  selectedDate: string = new Date().toISOString();
  userTimeZone: any;
  allowNotifications: boolean = true;
  languages: LanguageModel;
  langArray: Lang[] = [];
  currentLanguage: string;
  constructor(
    private wp: WpService,
    private storage: StorageService,
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
    this.currentLanguage = await this.storage.getSingleObjectString(StorageList.language);
    console.log(this.currentLanguage);
    
  }

  confirm() {
    this.popover.dismiss();
  }

  reset() {
    this.popover.dismiss();
    // this.datetime.nativeEl.reset();
    // this.datetime.
  }

  changeDate(value: string) {
    this.selectedDate = value;
  }

  onLanguageChange(event){
    const lang = event.target.value;
  }
}
