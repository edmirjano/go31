import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Lang } from 'src/app/models/language.model';
import { PostModel } from 'src/app/models/post.model';
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
