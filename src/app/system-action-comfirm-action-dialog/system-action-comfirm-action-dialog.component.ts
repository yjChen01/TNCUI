import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environment';
import { error_type } from '../eq-error-enum';
import { UniverseFunc } from '../universe-func';

@Component({
  selector: 'app-system-action-comfirm-action-dialog',
  templateUrl: './system-action-comfirm-action-dialog.component.html',
  styleUrls: ['./system-action-comfirm-action-dialog.component.css']
})
export class SystemActionComfirmActionDialogComponent {

  functool :UniverseFunc=new UniverseFunc();

  get CommandName() {
    return this.data.CommandName;
  }

  get action_name(){
    if(this.data.CommandName==0){
      return '停止';
    }
    else{
      return '開始';
    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  sandaction(){
    if(this.CommandName==0){
      // this.system_state=0;
      let body = {
        task_name:'stop',
        task_param:''
      };
      this.send_task_api(body,error_type['stop_error']);
      console.log('停止系統');
    }
    else if(this.CommandName==2){
      let body = {
        task_name:'start',
        task_param:''
      };
      this.send_task_api(body,error_type['start_error']);
      console.log('開始系統');
    }
    this.dialog.closeAll();
  }

  send_task_api(body:any,command_type:number){
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
            alert(this.functool.error_msg_trans(data_result.message,command_type));
          }
        },
        error:(err)=>{
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }
}
