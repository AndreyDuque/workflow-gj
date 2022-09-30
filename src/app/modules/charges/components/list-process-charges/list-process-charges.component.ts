import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-process-charges',
  templateUrl: './list-process-charges.component.html',
  styleUrls: ['./list-process-charges.component.scss']
})
export class ListProcessChargesComponent implements OnInit {

  processesCharge:any[]=[]

  constructor() { }

  ngOnInit(): void {
    let i=1
    while (i<5) {
      i++
      this.processesCharge.push(
        {
          id:'i',
          title: "prueba " + i,
          description:'description charges whit process ' + i,
          type: 'process'
        }
      )
    }
  }
  userClick(e: any) {

  }
}
