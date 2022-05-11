import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-webview',
  templateUrl: './webview.page.html',
  styleUrls: ['./webview.page.scss'],
})
export class WebviewPage implements OnInit {
  content: string;
  title: string;
  constructor(
    private router: Router
  ) {
    this.content = this.router.getCurrentNavigation().extras.state.page;
    this.title = this.router.getCurrentNavigation().extras.state.title;
  }

  ngOnInit() {
  }

}
