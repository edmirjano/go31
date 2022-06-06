import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { OptionsPopoverComponent } from 'src/app/components/options-popover/options-popover.component';
import { ActiveSegmentEnum } from 'src/app/models/active-segment-enum';
import { JoshuaGroupModel } from 'src/app/models/joshua-group.model';
import { Lang } from 'src/app/models/language.model';
import { PostModel } from 'src/app/models/post.model';
import { PrayingModel } from 'src/app/models/praying.model';
import { StorageListModel } from 'src/app/models/storage-list';
import { JoshuaService } from 'src/app/services/joshua/joshua.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { WpService } from 'src/app/services/wp/wp.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss'],
})
export class SinglePostPage implements OnInit {

  //#region Properties 
  activeSegment: ActiveSegmentEnum = ActiveSegmentEnum.profile;
  audioUrl: string;
  // public ActiveSegmentEnum = ActiveSegmentEnum;
  post: PostModel;
  joshuaGroup: Array<JoshuaGroupModel>;
  generalInfoData: Array<{ key: string, value: string}>;
  country: string;
  private readonly prayingLink: string = "https://demo.gremza.com/pray/post.php?key=1";
  praying:  PrayingModel;
  langData: Lang;
  joshuaMap: string;
  prayingTodayNumber: number = 0;
  disablePrayButton: boolean;
  joshuaCountry: JoshuaGroupModel;
  images: string[];
  totalPraying: number = 0;
  //#endregion
  constructor(
    private wp: WpService,
    private joshua: JoshuaService,
    public popoverController: PopoverController,
    public route: ActivatedRoute,
    public router: Router,
    private language: LanguageService,
    private storage: StorageService
  ) { 
    this.route.queryParams.subscribe((params)=>{
      this.post = this.generalInfoData = this.joshuaMap = this.audioUrl = undefined;
      if(params.fromList){
        this.post = this.router.getCurrentNavigation().extras.state.post; 
        this.images = [this.post.featured_image_src,this.post.acf.image_2? this.post.acf.image_2?.sizes.large : '',this.post.acf.image_3 ? this.post.acf.image_3?.sizes.large: ''];
        this.images = this.images.filter((img)=>{ return img.length > 0});
        this.loadJoshua(this.post);
      } else {
        this.wp.getTodayPost().then((data: PostModel)=>{
          this.post = data;
          this.images = [this.post.featured_image_src,this.post.acf.image_2? this.post.acf.image_2?.sizes.large : '',this.post.acf.image_3 ? this.post.acf.image_3?.sizes.large: ''];
          this.images = this.images.filter((img)=>{ return img.length > 0});
          this.loadJoshua(this.post);
        });
      }
      this.storage.getSingleObject(StorageListModel.todayPostPraying).then((postPraying)=>{
        if(Number(postPraying.id) == this.post.id && postPraying.date == new Date().getDate()){
          this.disablePrayButton = true;
        } else {
          this.disablePrayButton = false;
        }
      });
    });
   
  }

  async ngOnInit() {
    this.langData = await this.language.getLanguageData();
  }

  //#region Methods
  async loadJoshua(post: PostModel){
    await this.getPostPraying(post.acf.id);
    this.country = post.acf.country;
    this.audioUrl = `https://joshuaproject.net/assets/media/profiles/audio/a${post.acf.id}.mp3`;
    this.joshua.getPost(post.acf.id).then((data)=>{
      this.joshuaGroup = JSON.parse(data);
      this.generalInfoData = this.getGeneraInfoData(this.joshuaGroup);
    });
  }

  async openOptionsPopUp(ev: any){
    const popover = await this.popoverController.create({
      component: OptionsPopoverComponent,
      event: ev,
      componentProps: { post: this.post },
      translucent: false
    });
  
    await popover.present();
  }

  getGeneraInfoData(data: Array<JoshuaGroupModel>){
    let toReturn: Array<{ key: string, value: string}>;
    data.forEach((group)=>{
      if(group.ROG3 == this.country){
        this.joshuaCountry = group;
        toReturn = new Array(); 
        toReturn.push({ key: this.langData.Population, value: group.Population.toLocaleString()});
        toReturn.push({ key: this.langData.PrimaryLanguageName, value: group.PrimaryLanguageName});
        toReturn.push({ key: this.langData.PrimaryReligion, value: group.PrimaryReligion});
        toReturn.push({ key: this.langData.PercentEvangelicalPGAC, value: (Number(group.PercentEvangelicalPGAC) * 100) + " %"});
        toReturn.push({ key: this.langData.workers_needed, value: Math.round(group.Population/50000).toString()});
        // toReturn.push({ key: this.langData.PeopNameInCountry, value: group.PeopNameInCountry});
        this.joshuaMap = group?.EthnolinguisticMap;
      }
    });
    return toReturn;
  }
  async getPostPraying(id: string): Promise<void>{
    this.wp.getPraying().then((data: PrayingModel)=>{
      data.total.forEach((pray)=>{
        if(pray.peopleID == id){
          this.totalPraying = Number(pray.total);
        }
      });
      data.today.forEach((pray)=>{
        if(pray.peopleID == id){
          this.prayingTodayNumber = Number(pray.total);
        }
      });
    });
  }

  onPrayClick(){
    if(!this.disablePrayButton){
      this.disablePrayButton = true;
      this.prayingTodayNumber++;
      this.totalPraying++;
      this.storage.setSingleObject(StorageListModel.todayPostPraying, JSON.stringify({ id: String(this.post.id), date: new Date().getDate() }));
      this.wp.addPraying(this.post.acf.id).then(async (data)=>{
      });
    }
  }
  //#endregion
}
