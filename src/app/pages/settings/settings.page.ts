import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonPopover } from '@ionic/angular';

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

  constructor() { }

  ngOnInit() {
    this._init();
  }

  _init() {
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
}
