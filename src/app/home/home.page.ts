import { Component } from '@angular/core';
import { JoshuaService } from '../services/joshua/joshua.service';
import { WpService } from '../services/wp/wp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private wp: WpService,
    private joshua: JoshuaService
  ) {}

  ngOnInit(): void {
    this.wp.getLanguages().then((data)=>{
      console.log(data);
    })
    this.joshua.getContents().then((data)=>{
      console.log(data);
    })
  }
}
