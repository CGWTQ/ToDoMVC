import { Component } from '@angular/core';

const todos =[
  {
    id:1,
    title:"吃饭",
    done:true
  },
  {
    id:2,
    title:"睡觉",
    done:true
  }
]


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //记录信息
  public todos:{
    id:number,
    title:string,
    done:boolean
  }[] = todos
}
