import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environment';

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
          if(data_result.is_success==false){
            alert(data_result.message);
          }
        },
        error:(err)=>{
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }

  reboot(){
    let body = {
      task_name:'restart',
      task_param:''
    };
    this.send_task_api(body);
    console.log('重啟控制系統');
  }
}
