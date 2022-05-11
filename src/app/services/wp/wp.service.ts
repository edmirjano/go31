import { Injectable } from '@angular/core';
import { HttpListModel } from 'src/app/models/http-list';
import { PageModel } from 'src/app/models/page.model';
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


  async getSinglePageTest(): Promise<PostModel>{
    return this.get(HttpListModel.testPost).then((data: PostModel)=>{
      return data;
    })
  }


  async getPraying(){
    return this.get(HttpListModel.testPost).then((data: PostModel)=>{
      return data;
    })
  }


  async getAllPosts(): Promise<PostModel[]>{
    return this.get(HttpListModel.allPosts).then((data)=>{
      return data;
    });
  }
  async getAllPages(): Promise<PageModel[]>{
    return this.get(HttpListModel.allPages).then((data)=>{
      return data;
    });
  }


  async getTodayPost(): Promise<PostModel>{
    const today = new Date().getDate();
    return this.getAllPosts().then((_allPosts) => {
      return _allPosts.filter((post)=>{
        if(post.acf.post_number == today){
          return post;
        }
      })[0];
    });
  }
}
