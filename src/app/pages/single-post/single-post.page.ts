import { Component, OnInit } from '@angular/core';
import { ActiveSegmentEnum } from 'src/app/models/active-segment-enum';
import { JoshuaGroupModel } from 'src/app/models/joshua.group.model';
import { PostModel } from 'src/app/models/post.model';
import { JoshuaService } from 'src/app/services/joshua/joshua.service';
import { WpService } from 'src/app/services/wp/wp.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss'],
})
export class SinglePostPage implements OnInit {

  //#region Properties 
  activeSegment: ActiveSegmentEnum = ActiveSegmentEnum.profile;

  public ActiveSegmentEnum = ActiveSegmentEnum;
  post: PostModel;
  joshuaGroup: JoshuaGroupModel;
  //#endregion
  generalInfoData: Record<string,string>;
  constructor(
    private wp: WpService,
    private joshua: JoshuaService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.wp.getSinglePageTest().then((data: PostModel)=>{
      this.post = data;
      this.joshua.getPost(this.post.acf.id).then((data)=>{
        this.joshuaGroup = data;
        alert(JSON.stringify(data));
        this.generalInfoData = this.getGeneraInfoData(this.joshuaGroup);
      })
    })
  }


  //#region Methods
  openOptionsPopUp(){

  }

  getGeneraInfoData(group: JoshuaGroupModel){
    return {
      'PeopNameInCountry': group.PeopNameInCountry,
      // 'Population': group.Population.toString(),
      'PrimaryReligion': group.PrimaryReligion,
      'PrimaryLanguageName': group.PrimaryLanguageName,
      'PercentChristianPGAC': group.PercentChristianPGAC,
      'PercentEvangelicalPGAC': group.PercentEvangelicalPGAC
    }
  }
  //#endregion


}
