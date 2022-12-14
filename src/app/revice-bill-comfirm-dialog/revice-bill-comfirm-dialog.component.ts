import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environment';

@Component({
  selector: 'app-revice-bill-comfirm-dialog',
  templateUrl: './revice-bill-comfirm-dialog.component.html',
  styleUrls: ['./revice-bill-comfirm-dialog.component.css']
})
export class ReviceBillComfirmDialogComponent {
  get Job_id() {
    return this.data.job_id;
  }
  get fix_from_coord() {
    return `${this.data.row},${this.data.column},${this.data.layer},1`
  }
  get Bin_id() {
    return this.data.bin_id;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private http: HttpClient,public dialog:MatDialog) {}

  confirm_manual_job() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let v_task_param = {
      job_id: this.Job_id,
      from_coord:this.fix_from_coord
    };

    let body = {
      task_name: 'correct_job',
      task_param: v_task_param,
    };

    console.log(body);

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
