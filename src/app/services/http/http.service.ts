import { Inject, Injectable } from '@angular/core';
import { Http, HttpDownloadFileResult, HttpHeaders, HttpParams, HttpResponse } from '@capacitor-community/http';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends StorageService{
  constructor(@Inject(String) private _baseurl: string) {
    super();
  }

  protected async get(endpoint: string, forced?: boolean, params?: HttpParams): Promise<any>{
    const savedData = await this.getSingleObject(endpoint);
    if(savedData && !forced){
      return savedData;
    }
    const headers: HttpHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT"
    };
    const response: HttpResponse = await Http.get({url: this._baseurl + endpoint, headers, params});
    this.setSingleObject(endpoint,JSON.stringify(response.data));
    return response.data;
  }

  protected async download(endpoint: string, fileName?: string): Promise<HttpDownloadFileResult>{
    const options = {
      url: this._baseurl + endpoint,
      filePath: fileName ? fileName : endpoint,
      fileDirectory:  Directory.Data,
    };
    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    if (response.path) {
      const read = await Filesystem.readFile({
        path: fileName ? fileName : endpoint,
        directory: Directory.Data,
      });
    }
    return response;
  }

  // public async post(endpoint: string,data: any,page?: number, perPage?: number): Promise<HttpResponse>{
  //   const headers: HttpHeaders = { "Content-Type": "application/json","Authorization": `Bearer ${token}` };
  //   const params: HttpParams = page && perPage ? {page: page?.toString(), perPage: perPage?.toString()} : null;
  //   const response: HttpResponse = await Http.post({url: environment.baseUrl + endpoint, headers, data, params});
  //   return response;
  // }
  // public async put(endpoint: string,data: any): Promise<HttpResponse>{
  //   const token: string = await this.getToken();
  //   const headers: HttpHeaders = { "Content-Type": "application/json","Authorization": `Bearer ${token}` };
  //   const response: HttpResponse = await Http.put({url: environment.baseUrl + endpoint, headers, data});
  //   return response;
  // }
  // public async patch(endpoint: string,data: any): Promise<HttpResponse>{
  //   const token: string = await this.getToken();
  //   const headers: HttpHeaders = { "Content-Type": "application/json","Authorization": `Bearer ${token}` };
  //   const response: HttpResponse = await Http.patch({url: environment.baseUrl + endpoint, headers, data});
  //   return response;
  // }
  // public async delete(endpoint: string): Promise<HttpResponse>{
  //   const token: string = await this.getToken();
  //   const headers: HttpHeaders = { "Content-Type": "application/json","Authorization": `Bearer ${token}` };
  //   const response: HttpResponse = await Http.del({url: environment.baseUrl + endpoint, headers});
  //   return response;
  // }

}
