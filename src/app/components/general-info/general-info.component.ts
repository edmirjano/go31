import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
  @Input() data: Array<{ key: string, value: string}>;
  constructor() { }

  ngOnInit() {
  }

}
