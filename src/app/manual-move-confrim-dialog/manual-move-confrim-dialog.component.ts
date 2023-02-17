import { UniverseFunc } from './../universe-func';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environment';
import { error_type } from '../eq-error-enum';

@Component({
  selector: 'app-manual-move-confrim-dialog',
  templateUrl: './manual-move-confrim-dialog.component.html',
  styleUrls: ['./manual-move-confrim-dialog.component.css'],
})
export class ManualMoveConfrimDialogComponent {
  get EQ_name() {
    return this.data.EQ_name;
  }
  get Row(){
    return this.data.Row;
  }
  get Layer(){
    return this.data.Layer;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  toolfunc:UniverseFunc=new UniverseFunc();

  confirm_manual_job() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let v_task_param = {
      executor_name: this.EQ_name,
      row: Number(this.Row),
      layer: Number(this.Layer),
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
      .post<any>(`${environment.geneapi}/execute_command`, body, options)
      .subscribe({
        next: (data_result) => {
          console.log(data_result);
          if(data_result.is_success==false){
            alert(this.toolfunc.error_msg_trans(data_result.message,error_type['switch_to_manual_error']));
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
