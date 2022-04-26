import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audioObj: HTMLAudioElement = new Audio();

  constructor() { }

  _init(url: string) {
    this.audioObj.src = url;
    this.audioObj.load();
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }
}
