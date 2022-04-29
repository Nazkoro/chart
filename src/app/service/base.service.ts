import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private url = "http://localhost:4000/api/admin";
  public subjectPost$ = new Subject<[]>()

  constructor(private http: HttpClient){ }

  getPosts(){
    return this.http.get<any[]>(`${this.url}/chart-dashboard`);
  }
  public getChangedPost(data: any){
    this.subjectPost$.next(data)
  }


}
