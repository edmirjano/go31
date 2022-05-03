import { Component, OnInit } from '@angular/core';
import { ActiveSegmentEnum } from 'src/app/models/active-segment-enum';
import { JoshuaGroupModel } from 'src/app/models/joshua-group.model';
import { PostModel } from 'src/app/models/post.model';
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
  audioUrl: string = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  isPlayingMusic: boolean;
  // public ActiveSegmentEnum = ActiveSegmentEnum;
  post: PostModel;
  joshuaGroup: Array<JoshuaGroupModel>;
  generalInfoData: Record<string,string>;
  country: string;
  //#endregion
  constructor(
    private wp: WpService,
    private joshua: JoshuaService,
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.player._init(this.audioUrl);
  }

  ionViewDidEnter() {
    this.wp.getSinglePageTest().then((data: PostModel)=>{
      this.post = data;
      this.country = data.acf.country;
      this.joshua.getPost(this.post.acf.id).then((data)=>{
        this.joshuaGroup = JSON.parse(data);
        this.generalInfoData = this.getGeneraInfoData(this.joshuaGroup);
      })
    })
  }


  //#region Methods
  openOptionsPopUp(){

  }


  play(){
    if(this.isPlayingMusic){
      this.player.pause();
    } else {
      this.player.play();
    }
    this.isPlayingMusic = !this.isPlayingMusic;
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


}
