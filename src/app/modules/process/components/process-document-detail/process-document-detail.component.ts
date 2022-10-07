import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';
import {utils, writeFileXLSX} from "xlsx";

@Component({
  selector: 'process-document-detail',
  templateUrl: './process-document-detail.component.html',
  styleUrls: ['./process-document-detail.component.scss']
})
export class ProcessDocumentDetailComponent implements OnInit {

  public config = {
    printMode: 'template',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    stylesheets: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css' }],

  }
  processes: any[] = [];
  documentDetalis: any = {};
  idDocument: number = 0;
  processesValues: any[] = [];
  updateActivities: any[] = [];
  title: string = "";

  constructor(
    private readonly b24: B24Service,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    console.log('******* ESTOY AQUI  ****************')

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
          if(documents){
            const getDocuments = documents.result.items;
            this.processesValues.push(getDocuments[0]);
            this.documentDetalis.ufCrm30_1655843438 = this.processesValues;
          }

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
          if(activity){
            const cardActivity = {
              id: activity.result.item.id,
              title: activity.result.item.title,
              description: activity.result.item.ufCrm42_1656011791080,
              type: "activity"
            }
            this.updateActivities.push(cardActivity);
            // this.exportExcel('')
          }


        },
        'error': error => console.log('Error Listar SPA: ', error)
      })
    });
  }

  userClick(e: any) {
    const activities = this.updateActivities.filter(activity => activity.id === e.id)[0];
    this.router.navigate([`/process/activity-detail/${activities.title}`], { queryParams: { id: e.id } }).then();
  }

  exportExcel(fieldOtherDocument: any) {

    console.log('updateActivities', this.updateActivities);
    const procesos = this.processesValues.map(process => {

      let newProcess = process
      delete newProcess.id;
      return newProcess
    })

    const actividades = this.updateActivities.map(activity => {

      let newActivity = activity
      delete newActivity.id;
      delete newActivity.type;
      return newActivity
    })

    const newDocument = {
      Titulo: this.documentDetalis.title,
      Objetivo: this.documentDetalis.ufCrm30_1637611597722,
      Cargo: this.documentDetalis.ufCrm30_1638060318453.VALUE,
    }
    console.log('procesos ==> ', procesos)
    console.log('actividades ==> ', actividades)
    console.log('newDocument ==> ', newDocument)
    const ws1 = utils.json_to_sheet([newDocument, procesos, actividades]);
    const ws2 = utils.json_to_sheet([ procesos ]);
    const ws3 = utils.json_to_sheet([ , actividades]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws1, "Documento 1");
    utils.book_append_sheet(wb, ws2, "procesos");
    utils.book_append_sheet(wb, ws3, "actividades");
    writeFileXLSX(wb, `${this.title}.xlsx`);
  }

}
