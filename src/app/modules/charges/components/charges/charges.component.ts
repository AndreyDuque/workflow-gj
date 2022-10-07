import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { B24Service } from 'src/app/modules/core/services/b24.service';
import {ImagesService} from "../../../core/services/images.service";

@Component({
  selector: 'charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnInit {

  charges: any[] = [];
  imageList: string[] = [];

  constructor(
    private readonly b24: B24Service,
    private readonly router: Router,
    private readonly images: ImagesService
  ) { }

  ngOnInit(): void {

    this.b24.spaFieldsForId(183).subscribe({
      'next': (charges: any) => {
        if(charges){
          this.getImages()
          this.charges = charges.result.fields.ufCrm28_1637610817068.items;
          console.log('Cargos: ', this.charges);
        }

      },
      'error': error => console.log(error)
    })
  }

  getImages(){
    this.images.getImages().subscribe({
      'next': (images) => {
        if(images){
        images.results.forEach(image => {
          this.imageList.push(image.urls.small);
        })
          this.addImagesToCharges();
        }
      },
      'error': error => console.log(error),
    })
  }

  addImagesToCharges(){
    let i = 0;
    this.charges.forEach((charge, index) => {
      this.charges[index].image = this.imageList[i]
      if (i === this.imageList.length - 1) {
        i = -1;
      }
      i++;
    })
  }

  userClick(e: any) {
    const charge = this.charges.filter(charge => charge.ID === e.id)[0];
    this.router.navigate([`/charges/charges-details/${charge.VALUE}`], {queryParams: {id:e.id}}).then();
  }

}
