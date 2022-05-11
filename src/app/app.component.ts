import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Lang } from './models/language.model';
import { StorageList } from './models/storage-list';
import { LanguageService } from './services/language/language.service';
import { StorageService } from './services/storage/storage.service';
import { WpService } from './services/wp/wp.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  langData: Lang;
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
    this.storage.clearAll();
    this.storage.getSingleObjectString(StorageList.language).then((data)=>{
      if(data){
        this.navCtrl.navigateRoot("");
      } else{
        this.navCtrl.navigateRoot("welcome");
      }
    });
    this.langData = await this.language.getLanguageData();
  }


  async getMenuItems(): Promise<any>{
    this.wp.getAllPages().then((data)=>{
    
    })
  }
}
