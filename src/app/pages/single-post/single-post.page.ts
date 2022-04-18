import { Component, OnInit } from '@angular/core';
import { ActiveSegmentEnum } from 'src/app/models/active-segment-enum';
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

  public get ActiveSegmentEnum(){
    return ActiveSegmentEnum;
  }
  post: PostModel;

  //#endregion

  constructor(
    private wp: WpService,
    private joshua: JoshuaService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.wp.getSinglePageTest().then((data: PostModel)=>{
      
      this.post = data;
      console.log(this.post);
    })
  }


  //#region Methods
  openOptionsPopUp(){

  }
  //#endregion


}
