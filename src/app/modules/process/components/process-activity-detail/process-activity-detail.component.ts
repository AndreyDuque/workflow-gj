import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'process-activity-detail',
  templateUrl: './process-activity-detail.component.html',
  styleUrls: ['./process-activity-detail.component.scss']
})
export class ProcessActivityDetailComponent implements OnInit {

  idActivity: number = 0;
  activity: any = {};

  constructor(
    private readonly b24: B24Service,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      'next': query => {
        this.idActivity = Number(query['id']);
      }
    })

    const select = {
      select: [
        "id",
        "title",
        "ufCrm42_1656011791080",
        "ufCrm42_1656011801936",
        "ufCrm42_1656011818119",
        "ufCrm42_1656011838994",
        "ufCrm42_1664893390"
      ]
    }

    const filter = {
      filter: {
        id: this.idActivity
      }
    }

    this.b24.spaFieldContent(150, select, filter).subscribe({
      'next': (activity: any) => {
        this.activity = activity.result.items[0];
        console.log('Actividad: ', this.activity);
        this.updateActivityField();
      },
      'error': error => console.log(error)
    })
  }

  updateActivityField() {
    this.b24.spaFieldsForId(150).subscribe({
      'next': (fieldsActivity: any) => {
        const periodicities: any[] = fieldsActivity.result.fields.ufCrm42_1656011818119.items;
        const charges: any[] = fieldsActivity.result.fields.ufCrm42_1656011838994.items;
        let periodicity = periodicities.filter((periodicity: any) => periodicity.ID == this.activity.ufCrm42_1656011818119)[0].VALUE;
        let charge = charges.filter((periodicity: any) => periodicity.ID == this.activity.ufCrm42_1656011838994)[0].VALUE;
        this.activity.ufCrm42_1656011818119 = periodicity;
        this.activity.ufCrm42_1656011838994 = charge;
        console.log('Periodicidad: ', periodicity)
      },
      'error': error => console.log(error)
    })
  }

}
