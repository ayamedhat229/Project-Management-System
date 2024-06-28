import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _HomeService:HomeService){}
  ngOnInit(): void {
    this.userChart()
    this.taskChart()
  }
userName = localStorage.getItem('userName')
userRole = localStorage.getItem('userRole')
userCount:any;

tasksCount:any;
newChart: any = [];
userChart(){
  this._HomeService.getUserCount().subscribe({
    next:(res)=>{
      this.userCount=res;
      //this.tasksCount=res.data;
      console.log(this.userCount);
    

    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
      this.newChart = new Chart('userChart', {
        type: 'bar',
        data: {
          labels: ['activatedEmployeeCount', 'deactivatedEmployeeCount'],
          datasets: [{
            label: 'Count',
            data: [44,7],
            backgroundColor: ['#EF9B28', '#31595193']
          }]
        }
      });
    }
}

  
  
  

)}
taskChart(){
  this._HomeService.getAllTasksSystem().subscribe({
    next:(res)=>{
      this.tasksCount=res;
      console.log(this.tasksCount)
    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
      this.newChart = new Chart('taskChart', {
        type: 'bar',
        data: {
          labels: ['toDo', 'inProgress','done'],
          datasets: [{
            label: 'Count',
            data: [63,19,19],
            backgroundColor: ['#EF9B28', '#31595193', '#c77808f6']
          }]
        }
      });
    }
  })
}
}
