import { StorageStatusComponent } from './../storage-status/storage-status.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Bill, JobBill } from '../job-bill';
import { environment } from '@environment';

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


  constructor(private http:HttpClient) {
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
      .post<any>('http://192.168.214.87:9080/execute_command',body,options)
      .subscribe({
        next: (data_result) => {
          alert(data_result);
        },
        error:(err)=>{
          // console.log(err.message);
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }

  origin_bill_resend(v_job_id:string){
    let v_task_param={
      job_id : v_job_id
    }

    let body = {
      task_name:'resend_job',
      task_param:v_task_param
    };
    console.log(body);
    this.send_task_api(body);
  }

  revise_bill(v_job_id:string,v_from_coord:string){
    let v_task_param={
      job_id : v_job_id,
      from_coord:v_from_coord
    }

    let body = {
      task_name:'correct_job',
      task_param:v_task_param
    };
    console.log(body);
    this.send_task_api(body);
  }

}
