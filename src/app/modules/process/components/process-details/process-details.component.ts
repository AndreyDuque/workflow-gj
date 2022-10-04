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
  idsDocuments: any[] = [];
  idsOtherDocuments: any[] = [];
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

    this.getProcessDetails();

  }

  getProcessDetails() {
    this.b24.spaFieldList(183, this.idProcess).subscribe({
      'next': (processDetails: any) => {
        this.processDetails = processDetails.result.item;
        this.idCharges = this.processDetails.ufCrm28_1637610817068;
        this.idsDocuments = this.processDetails.ufCrm28_1637611388;
        this.idsOtherDocuments = this.processDetails.ufCrm28_1637611419;

        this.getLeakedDocuments();
        this.getLeakedCharges();
        this.getOtherDocuments();
      },
      'error': error => console.log(error)
    })
  }

  getLeakedDocuments() {
    this.idsDocuments.forEach(document => {
      const select = [
        "id",
        "title",
        "ufCrm30_1637611597722"
      ]
      const filter = {
        filter: {
          id: document
        }
      }

      this.b24.spaFieldContent(146, select, filter).subscribe({
        'next': (documents: any) => {
          const getDocuments = documents.result.items;
          getDocuments.forEach((getDocuments: any) => {
            this.documents.push({ title: getDocuments.title, description: getDocuments.ufCrm30_1637611597722, id: getDocuments.id, type: "documents" });
          });
          console.log('Resultado Listar SPA: ', getDocuments);
        },
        'error': error => console.log('Error Listar SPA: ', error),
      })
    });
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
    console.log('ID-Otros documentos:', this.idsOtherDocuments)
    this.idsOtherDocuments.forEach((otherDocument:any, index) => {
      const select = [
        "id",
        "title"
      ]

      const filter = {
        fitlter: {
          id: otherDocument
        }
      }

      this.b24.spaFieldContent(189, select, filter).subscribe({
        'next': (otherDocuments: any) => {
          this.otherDocuments = otherDocuments.result.items;
          this.fieldsOtherDocuments.push(
            {
              id: this.otherDocuments[index].id,
              name: this.otherDocuments[index].title,
              type: this.otherDocuments[index].ufCrm32_1638059703935,
              fileLocation: this.otherDocuments[index].ufCrm32_1638059743150,
              activeFileTime: this.otherDocuments[index].ufCrm32_1638059755949,
              inactiveFileLocation: this.otherDocuments[index].ufCrm32_1638059774800,
              idleFileTime: this.otherDocuments[index].ufCrm32_1638059791256,
              finalDispositions: this.otherDocuments[index].ufCrm32_1638059827591,
              charge: this.otherDocuments[index].ufCrm32_1638060427910
            }
          )
          this.updateFieldsOtherDocuments();

        },
        'error': error => console.log('Error Listar SPA: ', error),
      })
    });


  }

  updateFieldsOtherDocuments() {
    this.b24.spaFieldsForId(189).subscribe({
      'next': (fieldsOtherDocuments: any) => {
        let fieldsLoad: any = [];
        fieldsLoad = fieldsOtherDocuments.result.fields;
        console.log('Campos de otros documentos: ', this.fieldsOtherDocuments);
        this.fieldsOtherDocuments.forEach((fieldOtherDocument, index) => {
          let types = fieldsLoad.ufCrm32_1638059703935.items;
          console.log('********', types)
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

  exportExcel(fieldOtherDocument: any) {
    const ws = utils.json_to_sheet([fieldOtherDocument]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${fieldOtherDocument.name}.xlsx`);
  }

}
