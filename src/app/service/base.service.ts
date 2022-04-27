import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private url = "http://localhost:4000/api/admin";
  public subject$ = new Subject<[]>()
  public subjectPost$ = new Subject<[]>()

  constructor(private http: HttpClient){ }

  getPosts(){
    return this.http.get<any[]>(`${this.url}/posts`);
  }
  getUsers(){
    return this.http.get<any[]>(`${this.url}/user-all`);
  }
  public getChangedusers(data: any){
    this.subject$.next(data)
  }
  public getChangedPost(data: any){
    this.subjectPost$.next(data)
  }


}
