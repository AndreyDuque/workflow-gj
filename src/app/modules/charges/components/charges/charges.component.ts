import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnInit {

  charges: any[] = [];

  constructor(
    private readonly b24: B24Service,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.b24.spaFieldsForId(183).subscribe({
      'next': (charges: any) => {
        this.charges = charges.result.fields.ufCrm28_1637610817068.items;
        console.log('Cargos: ', this.charges);
      },
      'error': error => console.log(error)
    })
  }

  userClick(e: any) {
    const charge = this.charges.filter(charge => charge.ID === e.id)[0];
    this.router.navigate([`/charges/process-list/${charge.VALUE}`], {queryParams: {id:e.id}});
  }

}
