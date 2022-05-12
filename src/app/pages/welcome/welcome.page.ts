import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Lang, LanguageModel } from 'src/app/models/language.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { LanguageService } from 'src/app/services/language/language.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { WpService } from 'src/app/services/wp/wp.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  languages: LanguageModel;
  langArray: Lang[] = [];
  constructor(
    private wp: WpService,
    private storage: StorageService,
    private navCtrl: NavController,
    private language: LanguageService
  ) { }

  ngOnInit() {
    this.wp.getLanguages().then((data)=>{
      this.languages = data;
      Object.entries(this.languages.acf.language_list).forEach(lang => {
        const [key, value] = lang;
        this.langArray.push(value);
      });
    })
  }

  async setLang(lang: string, path: string, langData: Lang){
    await this.language._init(lang, path, langData);
    this.navCtrl.navigateForward("");
  }
}
