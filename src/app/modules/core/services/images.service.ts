import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private readonly http: HttpClient) { }

  getImages(){
    const headers = new HttpHeaders()
      .set('Authorization', `Client-ID ${environment.imagesAPIAccessKey}`)
    return this.http.get<{results: [{urls: {small: string}}]}>(`${environment.imagesAPIUrl}/search/photos?page=1&per_page=50&query=office&orientation=portrait`, {headers})
  }
}
