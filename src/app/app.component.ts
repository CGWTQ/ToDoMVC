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
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  //记录信息
  public todos:{
    id:number,
    title:string,
    done:boolean
  }[] = todos

  public currentEditing:{
    id:number,
    title:string,
    done:boolean
  }[] = null

  addtodo(e){
    const titleText = e.target.value;
    if( !(titleText.length) ){
      return
    }
    const last = this.todos[this.todos.length - 1]
    this.todos.push({
      id:last ? last.id + 1 : 1,
      title:titleText,
      done:false
    })

    //添加完成清除文本框
    e.target.value = ""
    
  }
  //所有任务图标
  get toggleAll(){
    return this.todos.every( t => t.done)
  }
  set toggleAll(val){
    this.todos.forEach(t => t.done = val)
  }

  //删除任务
  removetodo(index:number){
    this.todos.splice(index,1);
    
  }
  test(){
    console.log(11);
    
  }
  
}