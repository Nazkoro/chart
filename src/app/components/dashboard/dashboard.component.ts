import {Component, ViewChild} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AgGridAngular} from "ag-grid-angular";
import 'ag-grid-enterprise';
import {BaseService} from "../../service/base.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  subject = new Subject();
  content: any;
  months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
  selectedmonth: number = 1;
  weeks: any;
  selectedWeek: any = 1;
  map = new Map();

  columnDefs: ColDef[] = [
    { field: 'username',width: 300, sortable: true, filter: true, checkboxSelection: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'year', sortable: true, filter: true },
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
      this.content = items
      this.rowData = of(items)
      const changedUsers = items.map((user) => {
        return {
          username: user.username,
          year: +user.year,
          date: new Date(user.createdAt).toLocaleDateString()
        }
      })
      this.service.getChangedusers(changedUsers)
      // this.subject.next(changedUsers);
    })

    this.service.getPosts().subscribe(posts => {
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
    console.log("input data",data)
    let correctdata = new Date(data.startDate).toLocaleDateString()
    console.log("correctdata",correctdata);
    // let dayInMillseconds = Date.parse(correctdata);
    let dayInMillseconds = new Date(correctdata).getTime();
    console.log("dayInMillseconds",dayInMillseconds)

    // console.log("Date.parse(correctdata)",Date.parse(correctdata))

    let filteredForDay = this.content.filter((user: any) => {
      let dayFromtableInMilissecond = Date.parse((new Date(user.createdAt).toLocaleDateString()))
      console.log(dayFromtableInMilissecond)
      return dayInMillseconds === dayFromtableInMilissecond;
    })
    this.rowData = of(filteredForDay);
    console.log(filteredForDay)
    // console.log(Date.parse(data.startDate))
    // console.log(Date.parse(this.content[0].createdAt))
  }

  getWeeks(event: Event) {
    // const week = +(event.target as HTMLInputElement).value;
    // console.log("this.selectedWeek", this.selectedWeek);

    let filteredForWeek = this.content.filter((user: any) => {
      console.log("new Date(user.createdAt).getDate()",new Date(user.createdAt).getDate());
      let currentuser = new Date(user.createdAt).getDate()
      console.log("this.map.get(this.selectedWeek)", this.map.get(+this.selectedWeek))
      return this.map.get(+this.selectedWeek).includes(currentuser)
    })
    console.log("filteredForWeek",filteredForWeek)
    this.rowData = of(filteredForWeek);
    // this.weeks = []
  }

  countWeekInMonth(){
    let tempMonth = this.selectedmonth;
    const lastDayInMonth =  new Date(2022,++tempMonth,0).getDate();
    // let map = new Map();
    let arr: any = [];
    let countWeek = 1;
    for(let i = 1; i <= lastDayInMonth;i++){

      let datOfWeek = new Date(2022,this.selectedmonth,i).getDay()
      // console.log("day of week", new Date(2022,this.selectedmonth,i).getDay(), " " , i)
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

    this.rowData = of(filteredFormonth);
    this.countWeekInMonth();
  }
}
