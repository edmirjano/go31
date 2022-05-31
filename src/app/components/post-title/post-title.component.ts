import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.scss'],
})
export class PostTitleComponent implements OnInit {
  @Input() title: string;
  @Input() audio: string;
  isPlayingMusic: boolean;
  constructor(
    private player: PlayerService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.player._init(this.audio);
      this.player.audioObj.onended = () => {
        this.play();
      }
    }, 1000);
  }
  ngOnDestroy(): void {
  }

  play(){
    if(this.isPlayingMusic){
      this.player.pause();
    } else {
      this.player.play();
    }
    this.isPlayingMusic = !this.isPlayingMusic;
  }
}
