import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { StorageList } from './models/storage-list';
import { StorageService } from './services/storage/storage.service';
import { WpService } from './services/wp/wp.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: StorageService,
    private wp: WpService
  ) {
    this._initApp();
  }

  openPage(link: string){
    this.navCtrl.navigateForward(link);
    this.menuCtrl.close();
  }

  _initApp(){
    // this.storage.clearAll();
    this.storage.getSingleObjectString(StorageList.language).then((data)=>{
      if(data){
        this.navCtrl.navigateRoot("");
      } else{
        this.navCtrl.navigateRoot("welcome");
      }
    });
  }


  async getMenuItems(): Promise<any>{
    this.wp.getAllPages().then((data)=>{
    
    })
  }
}
