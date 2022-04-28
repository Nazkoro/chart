import {Component, ViewChild} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AgGridAngular} from "ag-grid-angular";
// import 'ag-grid-enterprise';
import {BaseService} from "../../service/base.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  // subject = new Subject();
  // subject = new Subject();
  content: any;
  months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
  selectedmonth: number = 1;
  weeks: any;
  selectedWeek: any = 1;
  map = new Map();

  columnDefs: ColDef[] = [
    { field: 'desc', sortable: true, filter: true },
    { field: 'likes.length', sortable: true, filter: true },
    { field: 'username',width: 300, sortable: true, filter: true },
    { field: 'userId.year', sortable: true, filter: true },
    { field: 'createdAt', sortable: true, filter: true }
  ];

  rowData!: Observable<any>;
  value: any;
  myForm: FormGroup;
  constructor(private http: HttpClient, private service: BaseService) {

    this.myForm = new FormGroup({
      "startDate": new FormControl(),
      "endaDate": new FormControl(),
    });

    this.service.getUsers().subscribe(items => {
      console.log("items",items)
      // this.content = items
      // this.rowData = of(items)
      // const changedUsers = items.map((user) => {
      //   return {
      //     username: user.username,
      //     year: +user.year,
      //     date: new Date(user.createdAt).toLocaleDateString()
      //   }
      // })
      // this.service.getChangedusers(changedUsers)
      // this.subject.next(changedUsers);
    })

    this.service.getPosts().subscribe(posts => {
      console.log("posts", posts)
        this.content = posts
        this.rowData = of(posts)
      const changedPosts = posts.map((post) => {
        return {
          desc: post.desc,
          likes: post.likes.length,
          date: new Date(post.createdAt).toLocaleDateString()
        }
      })
      this.service.getChangedPost(changedPosts)

    })
  }

  submit(){
    let data = this.myForm.getRawValue()
    if(data.endaDate === null && typeof data.startDate === 'string'){
      let filteredForDay = this.content.filter((user: any) => {
        let dayFromtableInMilissecond = user.createdAt.slice(0, 10)
        return data.startDate === dayFromtableInMilissecond;
      })
      this.content = filteredForDay
      this.rowData = of(filteredForDay);

    } else if (data.startDate != null && data.endaDate != null) {

      const startDatte = new Date(data.startDate).getTime()
      const endDatte = new Date(data.endaDate).getTime()

      let filteredForDay = this.content.filter((user: any) => {
        let dayFromtableInMilissecond = new Date(user.createdAt.slice(0, 10)).getTime()
        return startDatte <= dayFromtableInMilissecond && endDatte >= dayFromtableInMilissecond;
      })
      this.content = filteredForDay
      this.rowData = of(filteredForDay);
    }

  }

  createColumnDiogramm(){
    //!nedd write some code !
    const changedPosts = this.content.map((item: any) => {
      return {
        desc: item.desc,
        likes: item.likes.length,
        date: new Date(item.createdAt).toLocaleDateString()
      }
    })
    this.service.getChangedPost(changedPosts)

  }

  getWeeks(event: Event) {
    let filteredForWeek = this.content.filter((user: any) => {
      let currentuser = new Date(user.createdAt).getDate()
      return this.map.get(+this.selectedWeek).includes(currentuser)
    })
    this.content = filteredForWeek
    this.rowData = of(filteredForWeek);
    // this.weeks = []
  }

  countWeekInMonth(){
    let tempMonth = this.selectedmonth;
    const lastDayInMonth =  new Date(2022,++tempMonth,0).getDate();
    let arr: any = [];
    let countWeek = 1;
    for(let i = 1; i <= lastDayInMonth;i++){

      let datOfWeek = new Date(2022,this.selectedmonth,i).getDay()
      arr.push(i);
      if(datOfWeek == 0){
        this.map.set(countWeek, arr);
        arr = [];
        countWeek++;
      } else if(i == lastDayInMonth) {
        this.map.set(countWeek, arr);
      }
    }
    this.weeks = [...this.map.keys()]
    console.log("map", this.map);
  }

  selectOption(event: Event) {
    const month = +(event.target as HTMLInputElement).value;
    let filteredFormonth = this.content.filter((user: any) => {
      const monthFromtable = new Date(user.createdAt).getMonth();
      return month == monthFromtable;
    })
    this.content = filteredFormonth
    this.rowData = of(filteredFormonth);
    this.countWeekInMonth();
  }

  resetFliter(): void{
    this.myForm.reset()
    this.rowData = of(this.content)
  }
}
