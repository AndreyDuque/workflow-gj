import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class B24Service {
private readonly webHockUrl= environment.webHockUrl;
  constructor(private readonly http: HttpClient) { }

  spaList(){
    return this.http.get(`${this.webHockUrl}/crm.type.list.json`);
  }

  spaForId(id: number){
    return this.http.get(`${this.webHockUrl}/crm.type.get.json?id=${id}`);
  }

  spaFieldsForId(entityTypeId: number){
    return this.http.get(`${this.webHockUrl}/crm.item.fields?entityTypeId=${entityTypeId}`);
  }

  spaFieldList(entityTypeId: number, id: number){
    return this.http.get(`${this.webHockUrl}/crm.item.get?entityTypeId=${entityTypeId}&id=${id}`);
  }

  spaFieldContent(entityTypeId: number, select: any, filter?: any){
    let body = {};
    if (filter) {
      body = {
        ...select,
        ...filter
      }
    }else {
      body = {...select}
    }
    return this.http.post(`${this.webHockUrl}/crm.item.list?entityTypeId=${entityTypeId}`, body);
  }

}
