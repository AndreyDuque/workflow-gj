import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

  processes:any[]=[]
  constructor() { }

  ngOnInit(): void {
    let i=1;
    while(i < 12){
      this.processes.push ({ title: 'titulo ' + i, description:'descripcion', id: i})
      i++ 
    }
  }

}
