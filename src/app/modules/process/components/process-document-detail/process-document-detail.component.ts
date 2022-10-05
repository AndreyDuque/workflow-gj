import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'process-document-detail',
  templateUrl: './process-document-detail.component.html',
  styleUrls: ['./process-document-detail.component.scss']
})
export class ProcessDocumentDetailComponent implements OnInit {

  processes: any[] = [];
  documentDetalis: any = {};
  idDocument: number = 0;
  processesValues: any[] = [];
  activities: any[] = [];
  updateActivities: any[] = [];
  title: string = "";

  constructor(
    private readonly b24: B24Service,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      'next': query => {
        this.idDocument = Number(query['id']);
      }
    })

    this.route.params.subscribe({
      'next': param => {
        this.title = param['title'];
      }
    })

    this.getDocumentDetails();
  }

  getDocumentDetails() {
    this.b24.spaFieldList(146, this.idDocument).subscribe({
      'next': (documentDetalis: any) => {
        this.documentDetalis = documentDetalis.result.item;
        console.log('Detalles del documento:', this.documentDetalis);
        this.updateChargeFields();
        this.updateProcessesFields();
        this.updateActivitiesFields();
      },
      'error': error => console.log(error)
    })
  }

  updateChargeFields() {
    this.b24.spaFieldsForId(146).subscribe({
      'next': (fieldsDocuments: any) => {
        let charge: any = [];
        charge = fieldsDocuments.result.fields.ufCrm30_1638060318453.items.filter(
          (chargeLoad: any) => chargeLoad.ID == this.documentDetalis.ufCrm30_1638060318453
        )[0];
        this.documentDetalis.ufCrm30_1638060318453 = charge;
        console.log('Cargo: ', charge);
      },
      'error': error => console.log(error)
    })
  }

  updateProcessesFields() {
    const idsProcess = this.documentDetalis.ufCrm30_1655843438;

    idsProcess.forEach((idProcess: any) => {
      const select = {
        select: [
          "id",
          "title"
        ]
      }

      const filter = {
        filter: {
          id: idProcess
        }
      }

      this.b24.spaFieldContent(183, select, filter).subscribe({
        'next': (documents: any) => {
          const getDocuments = documents.result.items;
          this.processesValues.push(getDocuments[0]);
          this.documentDetalis.ufCrm30_1655843438 = this.processesValues;
        },
        'error': error => console.log('Error Listar SPA: ', error),
      })
    });

  }

  updateActivitiesFields() {
    const activities = this.documentDetalis.ufCrm30_1637611958;
    activities.forEach((activity: any) => {
      this.b24.spaFieldList(150, activity).subscribe({
        'next': (activity: any) => {
          const cardActivity = {
            id: activity.result.item.id,
            title: activity.result.item.title,
            description: activity.result.item.ufCrm42_1656011791080,
            type: "activity"
          }
          this.updateActivities.push(cardActivity);
        },
        'error': error => console.log('Error Listar SPA: ', error)
      })
    });
  }

  userClick(e: any) {
    const activities = this.updateActivities.filter(activity => activity.id === e.id)[0];
    this.router.navigate([`/process/activity-detail/${activities.title}`], { queryParams: { id: e.id } }).then();
  }

}
