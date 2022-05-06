import { Injectable } from '@angular/core';
import { HttpListModel } from 'src/app/models/http-list';
import { PostModel } from 'src/app/models/post.model';
import { StorageList } from 'src/app/models/storage-list';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WpService extends HttpService {
  constructor(
  ) {
    super("wp");
  }

  async getLanguages(){
    return this.get(environment.BASE_URL_WORDPRESS + HttpListModel.languages, false,null,true).then((data)=>{
      return data;
    });
  }


  async getSinglePageTest(){
    return this.get(HttpListModel.testPost).then((data: PostModel)=>{
      return data;
    })
  }
}
