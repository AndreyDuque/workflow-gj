import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';
import { utils, writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss']
})

export class ProcessDetailsComponent implements OnInit {

  processDetails: any = {};
  charges: any[] = [];
  idCharges: any[] = [];
  idProcess: number = 0;
  title: string = "";
  documents: any[] = [];
  otherDocuments: any[] = [];
  otherLeakedDocuments: any[] = [];
  fieldsOtherDocuments: any[] = [];

  constructor(
    private readonly b24: B24Service,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      'next': query => {
        this.idProcess = Number(query['id']);
      }
    })

    this.route.params.subscribe({
      'next': param => {
        this.title = param['title'];
      }
    })

    this.getProcessDetails()

    const select = [
      "id",
      "title",
      "ufCrm30_1637611597722"
    ]

    this.b24.spaFieldContent(146, select).subscribe({
      'next': (documents: any) => {
        const getDocuments = documents.result.items;
        getDocuments.forEach((getDocuments: any) => {
          this.documents.push({ title: getDocuments.title, description: getDocuments.ufCrm30_1637611597722, id: getDocuments.id, type: "process" });
        });
        console.log('Resultado Listar SPA: ', getDocuments);
      },
      'error': error => console.log('Error Listar SPA: ', error),
    })

    this.getOtherDocuments();
  }

  getProcessDetails() {
    this.b24.spaFieldList(183, this.idProcess).subscribe({
      'next': (processDetails: any) => {
        this.processDetails = processDetails.result.item;
        this.idCharges = this.processDetails.ufCrm28_1637610817068;
        console.log('ID-Cargos:', this.processDetails)
        this.getLeakedCharges();
      },
      'error': error => console.log(error)
    })
  }

  getLeakedCharges() {
    this.b24.spaFieldsForId(183).subscribe({
      'next': (fieldsProcess: any) => {
        let chargesLoad: any = [];
        chargesLoad = fieldsProcess.result.fields.ufCrm28_1637610817068.items;
        this.idCharges.forEach((element) => {
          this.charges.push(chargesLoad.filter((chargeLoad: any) => chargeLoad.ID == element)[0].VALUE);
        });
      },
      'error': error => console.log(error)
    })
  }

  getOtherDocuments() {
    const select = [
      "id",
      "title"
    ]

    this.b24.spaFieldContent(189, select).subscribe({
      'next': (otherDocuments: any) => {
        this.otherDocuments = otherDocuments.result.items;
        this.otherDocuments.forEach(otherDocument => {
          this.fieldsOtherDocuments.push(
            {
              id: otherDocument.id,
              name: otherDocument.title,
              type: otherDocument.ufCrm32_1638059703935,
              fileLocation: otherDocument.ufCrm32_1638059743150,
              activeFileTime: otherDocument.ufCrm32_1638059755949,
              inactiveFileLocation: otherDocument.ufCrm32_1638059774800,
              idleFileTime: otherDocument.ufCrm32_1638059791256,
              finalDispositions: otherDocument.ufCrm32_1638059827591,
              charge: otherDocument.ufCrm32_1638060427910
            }
          )
        });
        this.updateFieldsOtherDocuments();
      },
      'error': error => console.log('Error Listar SPA: ', error),
    })
  }

  updateFieldsOtherDocuments() {
    this.b24.spaFieldsForId(189).subscribe({
      'next': (fieldsOtherDocuments: any) => {
        let fieldsLoad: any = [];
        fieldsLoad = fieldsOtherDocuments.result.fields;
        console.log('Campos de otros documentos: ', fieldsLoad);
        this.fieldsOtherDocuments.forEach((fieldOtherDocument) => {
          let types = fieldsLoad.ufCrm32_1638059703935.items;
          let finalDispositions = fieldsLoad.ufCrm32_1638059827591.items;
          let charges = fieldsLoad.ufCrm32_1638060427910.items;
          fieldOtherDocument.type = types.filter((type: any) => type.ID == fieldOtherDocument.type)[0].VALUE;
          fieldOtherDocument.finalDispositions = finalDispositions.filter((finalDisposition: any) => finalDisposition.ID == fieldOtherDocument.finalDispositions)[0].VALUE;
          fieldOtherDocument.charge = charges.filter((charge: any) => charge.ID == fieldOtherDocument.charge)[0].VALUE;
        });
      },
      'error': error => console.log(error)
    })
  }

  userClick(e: any) {
    const documents = this.documents.filter(document => document.id === e.id)[0];
    this.router.navigate([`/process/document-detail/${documents.title}`], { queryParams: { id: e.id } }).then();
    console.log(e)
  }

  exportExcel(fieldOtherDocument: any){
    const ws = utils.json_to_sheet([fieldOtherDocument]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${fieldOtherDocument.name}.xlsx`);
  }

}
