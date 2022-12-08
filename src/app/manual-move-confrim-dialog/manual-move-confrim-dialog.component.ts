import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manual-move-confrim-dialog',
  templateUrl: './manual-move-confrim-dialog.component.html',
  styleUrls: ['./manual-move-confrim-dialog.component.css'],
})
export class ManualMoveConfrimDialogComponent {
  get EQ_name() {
    return this.data.EQ_name;
  }
  get Row() :number{
    return this.data.Row;
  }
  get Layer() :number{
    return this.data.Layer;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  confirm_manual_job() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let v_task_param = {
      executor_name: this.EQ_name,
      row: this.Row,
      layer: this.Layer,
    };

    let body = {
      task_name: 'switch_to_manual',
      task_param: v_task_param,
    };

    console.log(body);

    let options = {
      headers,
    };

    this.http
      .post<any>('http://192.168.214.87:9080/execute_command', body, options)
      .subscribe({
        next: (data_result) => {
          console.log(data_result);
          if(data_result.is_success==false){
            alert(data_result.message);
          }
          this.dialog.closeAll();
        },
        error:(err)=>{
          // console.log(err.message);
          alert('api連線錯誤: \n'+err.message);
          this.dialog.closeAll();
        }
      });
  }
}
