import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environment';

@Component({
  selector: 'app-origin-bill-resend-confirm-dialog',
  templateUrl: './origin-bill-resend-confirm-dialog.component.html',
  styleUrls: ['./origin-bill-resend-confirm-dialog.component.css']
})
export class OriginBillResendConfirmDialogComponent {
  get Job_id() {
    return this.data.job_id;
  }
  get From_coord() {
    return this.data.from_coord;
  }
  get To_coord() {
    return this.data.to_coord;
  }
  get Bin_id() {
    return this.data.bin_id;
  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private http: HttpClient,public dialog:MatDialog) {}

  confirm_manual_job() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let v_task_param={
      job_id : this.Job_id
    }

    let body = {
      task_name:'resend_job',
      task_param:v_task_param
    };


    let options = {
      headers,
    };

    this.http
      .post<any>(`${environment.geneapi}/execute_command`, body, options)
      .subscribe({
        next: (data_result) => {
          console.log(data_result);
          if(data_result.is_success==false){
            alert(data_result.message);
          }
          this.dialog.closeAll();
          location.reload();
        },
        error:(err)=>{
          // console.log(err.message);
          alert('api連線錯誤: \n'+err.message);
          this.dialog.closeAll();
        }
      });
  }
}
