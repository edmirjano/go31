import { Injectable } from '@angular/core';
import { HttpParams } from '@capacitor-community/http';
import { HttpListModel } from 'src/app/models/http-list';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class JoshuaService extends HttpService {

  private readonly _token: string = environment.JOSHUA_TOKEN;

  constructor() {
    super(environment.BASE_URL_JOSHUA);
   }


   getContents(){
     return this.get(HttpListModel.joshuaContents,false, {"api_key": this._token}).then((data)=>{
       return data;
     })
   }
}
