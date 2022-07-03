import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { Lang } from './models/language.model';
import { PageModel } from './models/page.model';
import { StorageListModel } from './models/storage-list';
import { LanguageService } from './services/language/language.service';
import { StorageService } from './services/storage/storage.service';
import { WpService } from './services/wp/wp.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { NotificationService } from './services/notification/notification.service';
import { App } from '@capacitor/app';
import { ActionSheet } from '@capacitor/action-sheet';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  langData: Lang;
  menuItems: PageModel[];
  version: string;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: StorageService,
    private wp: WpService,
    private language: LanguageService,
    private notification: NotificationService,
    private platform: Platform
  ) {
    this._initApp();
  }

  openPage(link: string) {
    this.navCtrl.navigateForward(link);
    this.menuCtrl.close();
  }

  async _initApp() {
    await StatusBar.setStyle({ style: Style.Dark });
    const info = await App.getInfo();
    this.version = info.version;
    this.wp.getLanguages().then(async (languageData) => {
      if (Number(info.version) < Number(languageData.acf.version_check)) {
        const res = await this.showUpdateDialog();
        if (res) {
          if (this.platform.is('android')) {
            window.open('https://play.google.com/store/apps/details?id=com.gemrza.bfp', '_system');
          } else if (this.platform.is('ios')) {
            window.open('https://apps.apple.com/us/app/bless-frontier-peoples/id1624027417', '_system');
          }
        }
      }
      this.storage.getSingleObjectString(StorageListModel.postVersion).then((postVersion) => {
        if (postVersion) {
          if (Number(postVersion) < Number(languageData.acf.post_version)) {
            this.storage.setSingleObject(StorageListModel.postVersion, String(languageData.acf.post_version))
            this.storage.removeSingleObject(StorageListModel.allPosts);
          }
          return;
        }
        this.storage.setSingleObject(StorageListModel.postVersion, "1");
      });
    });
    this.storage.getSingleObjectString(StorageListModel.language).then((data) => {
      if (data) {
        this.navCtrl.navigateRoot("");
      } else {
        this.navCtrl.navigateRoot("welcome");
      }
    });
    this.langData = await this.language.getLanguageData();
    await this.getMenuItems();
    this.notification._init();
    App.addListener("appStateChange",()=>{
      window.location.reload();
    });
    // await SplashScreen.hide();
  }

  async openWebview(page: PageModel) {
    await Browser.open({ url: page.link });
    // this.navCtrl.navigateForward("webview", { state: { page: page.content.rendered, title: page.title.rendered } })
    // this.menuCtrl.close();
  }

  async getMenuItems(): Promise<any> {
    this.wp.getAllPages().then((data: PageModel[]) => {
      this.menuItems = data;
      this.menuItems = this.menuItems.filter((item) => {
        return item.acf.show_to_menu;
      });
    })
  }

  async showUpdateDialog() {
    const result = await ActionSheet.showActions({
      title: "Update Avaliable",
      message: "There is a new update available.",
      options: [{
        title: "Go to store",
      }],
    });
    return result;
  }

}
