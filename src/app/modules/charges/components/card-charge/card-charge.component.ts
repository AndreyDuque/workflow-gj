import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-charge',
  templateUrl: './card-charge.component.html',
  styleUrls: ['./card-charge.component.scss']
})
export class CardChargeComponent implements OnInit {

  @Input() cardCharge!: any;
  @Output() event:EventEmitter<any>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  userClick(id:any){
    this.event.emit({
      id
    })
  }

}
