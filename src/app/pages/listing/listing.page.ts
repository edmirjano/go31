import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Lang } from 'src/app/models/language.model';
import { PostModel } from 'src/app/models/post.model';
import { PrayingModel } from 'src/app/models/praying.model';
import { LanguageService } from 'src/app/services/language/language.service';
import { WpService } from 'src/app/services/wp/wp.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  posts: PostModel[];
  langData: Lang;
  constructor(
    private wp: WpService,
    private navCtrl: NavController,
    private language: LanguageService
  ) { }

  async ngOnInit() {
    this.wp.getAllPosts().then((data)=>{
      this.posts = data;
      this.posts.sort((f,s) =>{return f.acf.post_number - s.acf.post_number});
      this.wp.getPraying().then((data: PrayingModel)=>{
        this.posts.forEach((post)=>{
          post.praying_total = post.praying_today = 0;
          
          data.total.forEach((pray)=>{
            if(pray.peopleID == post.acf.id){
              post.praying_total = Number(pray.total);
            }
          });
          data.today.forEach((pray)=>{
            if(pray.peopleID == post.acf.id){
              post.praying_today = Number(pray.total);
            }
          });
        })
      });
    });
    this.langData = await this.language.getLanguageData();
  }

  //#region Methods
  trimInfo(text: string){
    return text.replace(/<[^>]*>?/gm, '').substring(0, 80) + "..."
  }

  openPost(post: PostModel){
    this.navCtrl.navigateForward('',{queryParams: { fromList: true },state: {post: post}});
  }
  //#endregion
}
