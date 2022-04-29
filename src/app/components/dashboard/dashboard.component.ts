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
  content: any;
  filtredContent: any;
  months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
  selectedmonth: number = 1;
  weeks: any;
  selectedWeek: any = 1;
  map = new Map();

  columnDefs: ColDef[] = [
    { field: 'username', sortable: true, filter: true },
    { field: 'age', sortable: true, filter: true },
    { field: 'Posts', sortable: true, filter: true },
    { field: 'likes', sortable: true, filter: true },
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
    this.getPosts()
  }

  getPosts(){
    this.service.getPosts().subscribe(posts => {
      this.dataHandler(posts)
    })
  }

  dataHandler(date: any[]){
    this.content = date.map((user) => {
      return {
        username: user.username,
        age: new Date().getFullYear() - user.year,
        Posts: user.PostOnUser.length,
        createdAt: user.createdAt.slice(0, 10),
        likes: this.countLike(user.PostOnUser)
      }
    })
    this.filtredContent = this.content
    this.rowData = of(this.content)
  }

  countLike(posts: any[]){
    let sum = posts.reduce((accumulator,current) => {
      return  accumulator + current.likes.length
    },0)
  return sum
  }

  submit(){
    let data = this.myForm.getRawValue()

    if(data.endaDate === null && typeof data.startDate === 'string'){
      this.filtredContent = this.content.filter((user: any) => {
        return data.startDate === user.createdAt;
      })

      this.rowData = of(this.filtredContent);
    } else if (data.startDate != null && data.endaDate != null) {

      const startDatte = new Date(data.startDate).getTime()
      const endDatte = new Date(data.endaDate).getTime()

      this.filtredContent = this.content.filter((user: any) => {
        let dayFromtableInMilissecond = new Date(user.createdAt).getTime()
        return startDatte <= dayFromtableInMilissecond && endDatte >= dayFromtableInMilissecond;
      })

      this.rowData = of(this.filtredContent);
    }
  }

  selectOption(event: Event) {
    const month = +(event.target as HTMLInputElement).value;
    this.filtredContent = this.content.filter((user: any) => {
      const monthFromtable = new Date(user.createdAt).getMonth();
      return month == monthFromtable;
    })
    this.rowData = of(this.filtredContent);
    this.countWeekInMonth();
  }

  getWeeks(event: Event) {
    this.filtredContent = this.content.filter((user: any) => {
      let currentuser = new Date(user.createdAt).getDate()
      return this.map.get(+this.selectedWeek).includes(currentuser)
    })
    this.rowData = of(this.filtredContent);
  }

  countWeekInMonth(){
    this.map.clear()
    let tempMonth = this.selectedmonth;
    console.log("tempMonth", tempMonth)
    const lastDayInMonth =  new Date(2022,++tempMonth,0).getDate();
    console.log("tempMonth after inccrement", tempMonth,'lastDayInMonth', lastDayInMonth)
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
  }

  resetFliter(): void{
    this.myForm.reset()
    this.getPosts()
  }

  createDiogramm(){
    this.service.getChangedPost(this.filtredContent)
  }
}
