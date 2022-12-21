import { ReviceBillComfirmDialogComponent } from './../revice-bill-comfirm-dialog/revice-bill-comfirm-dialog.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-revice-bill-dialog',
  templateUrl: './revice-bill-dialog.component.html',
  styleUrls: ['./revice-bill-dialog.component.css'],
})
export class ReviceBillDialogComponent {
  column_dropdown_list = [3,84];
  get Job_id() {
    return this.data.job_id;
  }
  get Bin_id() {
    return this.data.bin_id;
  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,public dialog:MatDialog) {}
  show_comfirm_dialog(
    v_row: number,
    v_layer: number,
    v_column: number,
  ) {
    this.dialog.open(ReviceBillComfirmDialogComponent,{
      data:{
        job_id:this.Job_id,
        row:v_row,
        column:v_column,
        layer:v_layer,
        bin_id:this.Bin_id
      }
    });
  }
}
