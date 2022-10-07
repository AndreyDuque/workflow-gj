import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

  public config = {
    printMode: 'template',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    stylesheets: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css' }],

  }
  contentCard: any;
  processes: any[] = [];
  // getProcesses: any[] = [];

  constructor(
    private readonly b24: B24Service,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

    const select = [
      "id",
      "title",
      "ufCrm28_1637610739213"
    ]

    this.b24.spaFieldContent(183, select).subscribe({
      'next': (processes: any) => {
        const getProcesses = processes.result.items;
        getProcesses.forEach((getProcess: any) => {
          this.processes.push({ title: getProcess.title, description: getProcess.ufCrm28_1637610739213, id: getProcess.id, type: "process" });
        });
        console.log('Resultado Listar SPA: ', getProcesses);
      },
      'error': processes => console.log('Error Listar SPA: ', processes),
    })
  }

  userClick(e: any) {
    const process = this.processes.filter(process => process.id === e.id)[0];
    this.router.navigate([`/process/process-details/${process.title}`], {queryParams: {id:e.id}});
    console.log(e)
  }
}
