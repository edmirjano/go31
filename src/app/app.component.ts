import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Lang } from './models/language.model';
import { PageModel } from './models/page.model';
import { StorageListModel } from './models/storage-list';
import { LanguageService } from './services/language/language.service';
import { StorageService } from './services/storage/storage.service';
import { WpService } from './services/wp/wp.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  langData: Lang;
  menuItems: PageModel[];

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: StorageService,
    private wp: WpService,
    private language: LanguageService
  ) {
    this._initApp();
  }

  openPage(link: string){
    this.navCtrl.navigateForward(link);
    this.menuCtrl.close();
  }

  async _initApp(){
    // this.storage.clearAll();
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });    
    this.storage.getSingleObjectString(StorageListModel.language).then((data)=>{
      if(data){
        this.navCtrl.navigateRoot("");
      } else{
        this.navCtrl.navigateRoot("welcome");
      }
    });
    this.langData = await this.language.getLanguageData();
    await this.getMenuItems();
    // await SplashScreen.hide();
  }
  
  openWebview(page: PageModel){
    this.navCtrl.navigateForward("webview", {state: {page: page.content.rendered, title: page.title.rendered}})
    this.menuCtrl.close();
  }

  async getMenuItems(): Promise<any>{
    this.wp.getAllPages().then((data: PageModel[])=>{
      this.menuItems = data;
      this.menuItems = this.menuItems.filter((item)=>{
        return item.acf.show_to_menu
      });
    })
  }


}
