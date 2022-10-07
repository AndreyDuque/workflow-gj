import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footer!:any
  @Output() event:EventEmitter<any>= new EventEmitter()
  year: number = new Date(Date.now()).getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
