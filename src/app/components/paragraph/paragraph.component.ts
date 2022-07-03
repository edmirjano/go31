import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  fontSize: number;
  constructor() { }

  ngOnInit() {}

}
