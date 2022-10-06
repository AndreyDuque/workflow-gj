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
  activityCharges: any[] = [];
  cardsChargeActivities: any[] = [];
  idCharge: number = 0;
  idChargeActivity: number = 0;
  titleCharge: string = "";

  constructor(
    private readonly b24: B24Service,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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
    this.getIdChargeActivities();
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
      },
      'error': error => console.log('Error Listar SPA: ', error),
    })
  }

  getIdChargeActivities() {
    this.b24.spaFieldsForId(150).subscribe({
      'next': (fieldsActivities: any) => {
        this.activityCharges = fieldsActivities.result.fields.ufCrm42_1656011838994.items.filter(
          (charge: any) => charge.VALUE == this.titleCharge
        );
        this.idChargeActivity = this.activityCharges[0].ID;
        this.listChargeActivities();
      },
      'error': error => console.log(error)
    })
  }

  listChargeActivities() {
    const select = {
      select: [
        "id",
        "title",
        "ufCrm42_1656011791080",
        "ufCrm42_1656011838994"
      ]
    }

    const filter = {
      filter: {
        "ufCrm42_1656011838994": this.idChargeActivity
      }
    }

    this.b24.spaFieldContent(150, select, filter).subscribe({
      'next': (activities: any) => {
        const getActivities = activities.result.items;
        getActivities.forEach((activity: any) => {
          this.cardsChargeActivities.push(
            {
              id: activity.id,
              title: activity.title,
              description: activity.ufCrm42_1656011791080,
              type: 'process'
            }
          )
        });
      },
      'error': error => console.log('Error Listar SPA: ', error),
    })
  }

  userClick(e: any) {
    const process = this.chargeProcesses.filter(process => process.id === e.id)[0];
    if (process) {
      this.router.navigate([`/process/process-details/${process.title}`], { queryParams: { id: e.id } });
    }
    const activity = this.cardsChargeActivities.filter(activity => activity.id === e.id)[0];
    if (activity) {
      this.router.navigate([`/process/activity-detail/${activity.title}`], { queryParams: { id: activity.id } });
    }
  }
}
