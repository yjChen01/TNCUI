import { Component } from '@angular/core';

@Component({
  selector: 'app-storage-status',
  templateUrl: './storage-status.component.html',
  styleUrls: ['./storage-status.component.css']
})

export class StorageStatusComponent  {

  layer_list_ddl:any[]=[];
  layer_count:number=21;

  constructor() {
    for(let i=1;i<=this.layer_count;i++){
      this.layer_list_ddl.push({ key: i, value: i },);
    }
  }

}
