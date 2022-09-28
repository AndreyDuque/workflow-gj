import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'process-document-detail',
  templateUrl: './process-document-detail.component.html',
  styleUrls: ['./process-document-detail.component.scss']
})
export class ProcessDocumentDetailComponent implements OnInit {

  processes:any[]=[]
  constructor() { }

  ngOnInit(): void {
    let i=1;
    while(i < 3){
      this.processes.push ({ title: 'titulo ' + i, description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam voluptas ad unde impedit libero mollitia harum! Nisi eos sint velit pariatur magnam autem asperiores, enim facere exercitationem. Facere, consectetur doloremque.
      Nobis nisi ducimus libero consequuntur laborum molestias dolorum. Animi optio minus incidunt maiores quaerat alias consequatur, cum doloribus asperiores sapiente. Harum provident voluptatem veritatis, maiores reiciendis laudantium eos magni eius.
      Doloremque, facere molestiae? Fuga omnis voluptatem maxime incidunt quasi maiores numquam aperiam perspiciatis repudiandae nemo accusantium, hic fugit excepturi minus enim inventore magnam ab dolorem temporibus nesciunt vel suscipit. Facilis.` + i, id: i})
      i++ 
    }
  }

}
