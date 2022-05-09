import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { OptionsPopoverComponent } from 'src/app/components/options-popover/options-popover.component';
import { ActiveSegmentEnum } from 'src/app/models/active-segment-enum';
import { JoshuaGroupModel } from 'src/app/models/joshua-group.model';
import { PostModel } from 'src/app/models/post.model';
import { PrayingModel } from 'src/app/models/praying.model';
import { JoshuaService } from 'src/app/services/joshua/joshua.service';
import { PlayerService } from 'src/app/services/player/player.service';
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
  generalInfoData: Record<string,string>;
  country: string;
  private readonly prayingLink: string = "https://demo.gremza.com/pray/post.php?key=1";
  praying:  PrayingModel
  //#endregion
  constructor(
    private wp: WpService,
    private joshua: JoshuaService,
    public popoverController: PopoverController,
    public route: ActivatedRoute,
    public router: Router,
  ) { 
    this.route.queryParams.subscribe((params)=>{
      if(params.fromList){
        this.post = this.router.getCurrentNavigation().extras.state.post;
      } else {
        this.wp.getSinglePageTest().then((data: PostModel)=>{
          this.post = data;
          this.country = data.acf.country;
          this.audioUrl = `https://joshuaproject.net/assets/media/profiles/audio/a${data.acf.id}.mp3`;
          this.joshua.getPost(this.post.acf.id).then((data)=>{
            this.joshuaGroup = JSON.parse(data);
            this.generalInfoData = this.getGeneraInfoData(this.joshuaGroup);
          })
        })
      }
    })
  }

  ngOnInit() {
  }



  //#region Methods
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
    let toReturn;
    data.forEach((group)=>{
      if(group.ROG3 == this.country){
        toReturn = {
          'PeopNameInCountry': group.PeopNameInCountry,
          'Population': group.Population.toString(),
          'PrimaryReligion': group.PrimaryReligion,
          'PrimaryLanguageName': group.PrimaryLanguageName,
          'PercentChristianPGAC': group.PercentChristianPGAC,
          'PercentEvangelicalPGAC': group.PercentEvangelicalPGAC
        }
      }
    });
    return toReturn;
  }
  //#endregion

  onPrayClick(){
    
  }

}
