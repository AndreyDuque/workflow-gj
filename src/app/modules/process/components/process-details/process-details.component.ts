import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss']
})

export class ProcessDetailsComponent implements OnInit {

  processDetalis: any = {};
  charges: any[] = [];
  idCharges: any[] = [];
  idProcess: number = 0;
  title: string = "";
  documents: any[] = [];

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

    while (this.documents.length < 4) {
      this.documents.push({ title: 'Titulo documento', description: 'Descripccion documento', id: this.documents.length+1, type: "process" });
    }
  }

  getProcessDetails() {
    this.b24.spaFieldList(183, this.idProcess).subscribe({
      'next': (processDetalis: any) => {
        this.processDetalis = processDetalis.result.item;
        this.idCharges = this.processDetalis.ufCrm28_1637610817068;
        this.getLeakedCharges();
      },
      'error': processDetalis => console.log(processDetalis)
    })
  }

  getLeakedCharges() {
    this.b24.spaFieldsForId(183).subscribe({
      'next': (fieldsProcess: any) => {
        let chargesLoad: any = [];
        chargesLoad = fieldsProcess.result.fields.ufCrm28_1637610817068.items;
        this.idCharges.forEach((element) => {
          this.charges.push(chargesLoad.filter((chargeLoad:any) => chargeLoad.ID == element)[0].VALUE);
        });
      },
      'error': fieldsProcess => console.log(fieldsProcess)
    })
  }

  userClick(e: any) {
    const documents = this.documents.filter(document => document.id === e.id)[0];
    this.router.navigate([`/process/document-detail/${documents.title}`], {queryParams: {id:e.id}});
    console.log(e)
  }

}

