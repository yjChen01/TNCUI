import { Component,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-detail-dialog',
  templateUrl: './job-detail-dialog.component.html',
  styleUrls: ['./job-detail-dialog.component.css']
})
export class JobDetailDialogComponent {
  get job_id() {
    return this.data.job_id;
  }
  get job_type(){
    return this.data.job_type;
  }
  get bin_id(){
    return this.data.bin_id;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog
  ) {}
}
