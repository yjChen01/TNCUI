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

  store_type_list = [
    { key: 1, value: '一般儲區' },
    { key: 2, value: '儲位外' },
  ];

  isDisabled: boolean = false;

  show_comfirm_dialog(v_eq_name:string,v_row:number,v_layer:number,v_store_pos){
    if(v_store_pos==1){
      if(!isNaN(v_row) && !isNaN(v_layer)){
        this.dialog.open(ManualMoveConfrimDialogComponent,{
          data:{
            EQ_name:v_eq_name,
            Row:v_row,
            Layer:v_layer
          }
        });
      }
      else{
        alert("請指定位置");
      }
    }
    else{
      this.dialog.open(ManualMoveConfrimDialogComponent,{
        data:{
          EQ_name:v_eq_name,
          Row:-1,
          Layer:-1
        }
      });
    }
  }

  onChange(v_store_selection:number){
    if(v_store_selection==1){
      this.isDisabled=false;
    }
    else{
      this.isDisabled=true;
    }
  }
}
