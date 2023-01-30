import { FinishBillDialogComponent } from './../finish-bill-dialog/finish-bill-dialog.component';
import { OriginBillResendConfirmDialogComponent } from './../origin-bill-resend-confirm-dialog/origin-bill-resend-confirm-dialog.component';
import { ReviceBillDialogComponent } from './../revice-bill-dialog/revice-bill-dialog.component';
import { StorageStatusComponent } from './../storage-status/storage-status.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Bill, JobBill } from '../job-bill';
import { environment } from '@environment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-error-except',
  templateUrl: './error-except.component.html',
  styleUrls: ['./error-except.component.css']
})
export class ErrorExceptComponent  {
  data: Bill[]=[];
  page_no=1;
  page_size=10;
  isAll=false;
  search_job_id:string='';
  total_line_count:number;


  constructor(private http:HttpClient,public dialog:MatDialog) {
    this.GetErrorBill(http,'');
  }

  GetErrorBill(http:HttpClient,v_job_id:string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers
    };

    let body={
      "page_no":this.page_no,
      "page_size":this.page_size,
      "isAllData":this.isAll,
      "job_id":v_job_id
    };
    http.post<JobBill>(`${environment.api}/GetAllBill`, body, options).subscribe(data_result=>{
      this.data=data_result.bills;
      this.total_line_count=data_result.total_page_count;
    })
  }

  SearchByJobid(v_job_id:string){
    // console.log(v_job_id);
    this.search_job_id=v_job_id;
    this.page_no=1;
    this.GetErrorBill(this.http,v_job_id);
  }

  SearchByPageNo(v_page_no:number){
    this.page_no=v_page_no;
    this.GetErrorBill(this.http,this.search_job_id);
    console.log(v_page_no);
  }

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
          // console.log(err.message);
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }

  origin_bill_resend(v_job_id:string,v_from_coord:string,v_to_coord:string,v_bin_id:string){
    this.dialog.open(OriginBillResendConfirmDialogComponent,{
      data:{
        job_id:v_job_id,
        from_coord:v_from_coord,
        to_coord:v_to_coord,
        bin_id:v_bin_id
      }
    });
  }

  revise_bill(v_job_id:string,v_bin_id:string){
    this.dialog.open(ReviceBillDialogComponent,{
      data:{
        job_id:v_job_id,
        bin_id:v_bin_id
      }
    });
  }

  finish_bill(v_job_id:string,v_bin_id:string){
    this.dialog.open(FinishBillDialogComponent,{
      data:{
        job_id:v_job_id,
        bin_id:v_bin_id
      }
    });
  }
}
