import { Component, OnInit } from '@angular/core';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'process-document-detail',
  templateUrl: './process-document-detail.component.html',
  styleUrls: ['./process-document-detail.component.scss']
})
export class ProcessDocumentDetailComponent implements OnInit {

  processes: any[] = [];
  documentDetalis: any = {};

  constructor(
    private readonly b24: B24Service
  ) { }

  ngOnInit(): void {

    this.getDocumentDetails();
    // let i=1;
    // while(i < 3){
    //   this.processes.push ({ title: 'titulo ' + i, description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam voluptas ad unde impedit libero mollitia harum! Nisi eos sint velit pariatur magnam autem asperiores, enim facere exercitationem. Facere, consectetur doloremque.
    //   Nobis nisi ducimus libero consequuntur laborum molestias dolorum. Animi optio minus incidunt maiores quaerat alias consequatur, cum doloribus asperiores sapiente. Harum provident voluptatem veritatis, maiores reiciendis laudantium eos magni eius.
    //   Doloremque, facere molestiae? Fuga omnis voluptatem maxime incidunt quasi maiores numquam aperiam perspiciatis repudiandae nemo accusantium, hic fugit excepturi minus enim inventore magnam ab dolorem temporibus nesciunt vel suscipit. Facilis.` + i, id: i})
    //   i++
    // }
  }

  getDocumentDetails() {
    this.b24.spaFieldList(146, 12).subscribe({
      'next': (documentDetalis: any) => {
        this.documentDetalis = documentDetalis.result.item;
        console.log('Detalles del documento:', this.documentDetalis);
        this.updateChargeFields();
        this.updateProcessesFields();
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
    const select = {
      select: [
        "id",
        "title"
      ]
    }

    const filter = {
      filter: {
        logic:"OR",
        0:{
              id:22
        },
        1:{
              id:20
        },
        2:{
              id:18
        }
    }
    }

    this.b24.spaFieldContent(183, select, filter).subscribe({
      'next': (documents: any) => {
        const getDocuments = documents.result.items;
        this.documentDetalis.ufCrm30_1655843438 = getDocuments;
        console.log('Resultado procesos filtrados: ', getDocuments);
      },
      'error': error => console.log('Error Listar SPA: ', error),
    })
  }

}
