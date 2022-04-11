import { Component, OnInit } from '@angular/core';
import { ActiveSegmentEnum } from 'src/app/models/active-segment-enum';
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

  public get ActiveSegmentEnum(){
    return ActiveSegmentEnum;
  }
  post: any;

  //#endregion

  constructor(
    private wp: WpService,
    private joshua: JoshuaService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.wp.getSinglePageTest().then((data)=>{
      this.post = data;
    })
  }


  //#region Methods
  openOptionsPopUp(){

  }
  //#endregion


}
