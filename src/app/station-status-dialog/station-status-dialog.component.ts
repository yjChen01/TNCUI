import { ManualMoveConfrimDialogComponent } from './../manual-move-confrim-dialog/manual-move-confrim-dialog.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-station-status-dialog',
  templateUrl: './station-status-dialog.component.html',
  styleUrls: ['./station-status-dialog.component.css'],
})
export class StationStatusDialogComponent {
  get EQ_name() {
    return this.data.EQ_name;
  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,public dialog:MatDialog) {
    // console.log(data.EQ_name);
  }

  show_comfirm_dialog(v_eq_name:string,v_row:number,v_layer:number){
    this.dialog.open(ManualMoveConfrimDialogComponent,{
      data:{
        EQ_name:v_eq_name,
        Row:v_row,
        Layer:v_layer
      }
    });
  }
}
