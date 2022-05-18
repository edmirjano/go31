import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() images: string[];
  constructor() { }

  ngOnInit() {
    this.images = this.images.filter((img)=>{ return img.length > 0})
  }

}
