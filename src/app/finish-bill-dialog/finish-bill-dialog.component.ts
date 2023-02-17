import { UniverseFunc } from './../universe-func';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environment';
import { error_type } from '../eq-error-enum';

@Component({
  selector: 'app-finish-bill-dialog',
  templateUrl: './finish-bill-dialog.component.html',
  styleUrls: ['./finish-bill-dialog.component.css']
})
export class FinishBillDialogComponent {
  get Job_id() {
    return this.data.job_id;
  }
  get Bin_id() {
    return this.data.bin_id;
  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private http: HttpClient,public dialog:MatDialog) {}

  toolfunc:UniverseFunc=new UniverseFunc();

  send_task_api(body:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };

    this.http
      .post<any>(`${environment.geneapi}/execute_command`,body,options)
      .subscribe({
        next: (data_result) => {
          console.log(body);
          if(data_result.is_success==false){
            alert(this.toolfunc.error_msg_trans(data_result.message,error_type['resend_and_fin_job_error']));
          }
          this.dialog.closeAll();
          location.reload();
        },
        error:(err)=>{
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }

  resend(){
    let v_task_param = {
      job_id: this.Job_id,
    };

    let body = {
      task_name: 'finish_job',
      task_param: v_task_param,
    };

    this.send_task_api(body);
    console.log('完成單據');
  }
}
