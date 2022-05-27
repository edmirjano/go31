import { Inject, Injectable } from '@angular/core';
import { Http, HttpDownloadFileResult, HttpHeaders, HttpParams, HttpResponse } from '@capacitor-community/http';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { StorageListModel } from 'src/app/models/storage-list';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends StorageService {
  constructor(@Inject(String) private _baseurl: string) {
    super();
    if (this._baseurl === "wp") {
      this.getSingleObjectString(StorageListModel.path).then((data) => {
        if (!data) {
          this._baseurl = environment.BASE_URL_WORDPRESS
        } else {
          this._baseurl = data;
        }
      });
    }
  }

  protected async get(endpoint: string, saveLocally?: boolean, params?: HttpParams, useFullURL?: boolean): Promise<any> {
    if (saveLocally) {
      const savedData = await this.getSingleObject(endpoint);
      if (savedData) {
        return savedData;
      }
    }
    const headers: HttpHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT"
    };
    if (useFullURL) {
      const response: HttpResponse = await Http.get({ url: endpoint, headers, params });
      return response.data;
    }
    const response: HttpResponse = await Http.get({ url: this._baseurl + endpoint, headers, params });
    if (saveLocally) {
      this.setSingleObject(endpoint, JSON.stringify(response.data));
    }
    // this.setSingleObject(endpoint,JSON.stringify(response.data));
    return response.data;
  }

  protected async download(endpoint: string, fileName?: string): Promise<HttpDownloadFileResult> {
    const options = {
      url: this._baseurl + endpoint,
      filePath: fileName ? fileName : endpoint,
      fileDirectory: Directory.Data,
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
}
