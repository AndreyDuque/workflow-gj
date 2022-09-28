
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: any
  @Output() event:EventEmitter<any>= new EventEmitter()
  constructor() { }

  ngOnInit(): void {

  }
  userClick(id:any,type:string){
    this.event.emit({
      id,type
    })
  }
}
