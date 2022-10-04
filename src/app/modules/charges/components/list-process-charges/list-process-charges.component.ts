import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'app-list-process-charges',
  templateUrl: './list-process-charges.component.html',
  styleUrls: ['./list-process-charges.component.scss']
})
export class ListProcessChargesComponent implements OnInit {

  chargeProcesses: any[] = [];
  idCharge: number = 0;
  titleCharge: string = "";

  constructor(
    private readonly b24: B24Service,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      'next': query => {
        this.idCharge = Number(query['id']);
      }
    })

    this.route.params.subscribe({
      'next': param => {
        this.titleCharge = param['title'];
      }
    })

    this.listChargeProcesses();
  }

  listChargeProcesses() {
    const select = {
      select: [
        "id",
        "title",
        "ufCrm28_1637610817068",
        "ufCrm28_1637610739213"
      ]
    }

    const filter = {
      filter: {
        "ufCrm28_1637610817068": [this.idCharge]
      }
    }

    this.b24.spaFieldContent(183, select, filter).subscribe({
      'next': (charges: any) => {
        const getChargeProcesses = charges.result.items;
        getChargeProcesses.forEach((chargeProcess: any) => {
          this.chargeProcesses.push(
            {
              id: chargeProcess.id,
              title: chargeProcess.title,
              description: chargeProcess.ufCrm28_1637610739213,
              type: 'process'
            }
          )
        });
        console.log('Resultado Listar SPA: ', this.chargeProcesses);
      },
      'error': error => console.log('Error Listar SPA: ', error),
    })
  }

  userClick(e: any) {
    const charge = this.chargeProcesses.filter(charge => charge.id === e.id)[0];
    this.router.navigate([`/process/process-details/${charge.title}`], {queryParams: {id:e.id}});
    console.log(charge)
  }
}
