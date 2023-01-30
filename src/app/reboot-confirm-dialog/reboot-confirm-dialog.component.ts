import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environment';

@Component({
  selector: 'app-reboot-confirm-dialog',
  templateUrl: './reboot-confirm-dialog.component.html',
  styleUrls: ['./reboot-confirm-dialog.component.css']
})
export class RebootConfirmDialogComponent {
  constructor(private http: HttpClient,public dialog:MatDialog) {}
  confirm_reboot() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let v_task_param={
    }

    let body = {
      task_name:'restart',
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
