import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-options-popover',
  templateUrl: './options-popover.component.html',
  styleUrls: ['./options-popover.component.scss'],
})
export class OptionsPopoverComponent implements OnInit {
  @Input() post: PostModel;
  constructor() { }

  ngOnInit() {}

  async share(){
    await Share.share({
      title: this.post.title.rendered,
      text: this.post.excerpt.rendered,
      url: this.post.link,
    });
  }
}
