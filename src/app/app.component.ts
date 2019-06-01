import { Component } from '@angular/core';


// const todos =[
//   {
//     id:1,
//     title:"吃饭",
//     done:true
//   },
//   {
//     id:2,
//     title:"睡觉",
//     done:false
//   }
// ]


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
  }[] = JSON.parse(window.localStorage.getItem("todos") || "[]");

  public currentEditing:{
    id:number,
    title:string,
    done:boolean
  }[] = null


  public visibility:string = "all"

  //生命周期函数（初始化时执行一次）
  ngOnInit(): void {
    this.hashChange();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //注意  bind  绑定 this 指向
    window.onhashchange  = this.hashChange.bind(this);
    
  }

  //每当数据改变便触发
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    window.localStorage.setItem("todos",JSON.stringify(this.todos));
  }


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
  //保存编辑
  saveEdit(todo,e){
    todo.title = e.target.value;
    this.currentEditing = null;
    
  }
  //取消编辑
  cansal(e){
    const { keyCode,target } = e;
    if(keyCode === 27){
      target.value = this.currentEditing.title;
      this.currentEditing = null;
    }  
  }

  //未完成的任务数量
  get remaningCount(){
    return this.todos.filter(t => !t.done).length
  }
  //清除所有已完成任务
  clearAllDone(){
    this.todos = this.todos.filter(t => !t.done);
  }

  get filterTodos(){
    if(this.visibility === "all"){
      return this.todos;
    }else if(this.visibility === "active"){
      return this.todos.filter( t => !t.done);
    }else if(this.visibility === "Completed"){
      return this.todos.filter(t => t.done);
    }
  }

  //路由改变
  hashChange(){
    const hash = window.location.hash.substr(1)
      switch(hash){
        case "/":
          this.visibility = "all";
          break;
        case "/active":
          this.visibility = "active";
          break;
        case "/completed":
          this.visibility = "Completed";
          break;
      }
  }

  test(){
    console.log(11);
    
  }
  
}

