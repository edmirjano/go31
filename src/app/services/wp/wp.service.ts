import { Injectable } from '@angular/core';
import { HttpListModel } from 'src/app/models/http-list';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class WpService extends HttpService {
  constructor() {
    super(environment.BASE_URL_WORDPRESS);
  }

  async getLanguages(){
    return this.get(HttpListModel.languages).then((data)=>{
      return data;
    });
  }


  async getSinglePageTest(){
    return this.get(HttpListModel.testPost).then((data)=>{
      return data;
    })
  }
}
