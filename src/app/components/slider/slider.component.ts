import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() subtitle: string;
  @Input() title: string;
  @Input() images: string[];
  @Input() content: string;
  constructor() { }

  ngOnInit() {}

}
