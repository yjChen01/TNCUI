import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Bill, JobBill } from '../job-bill';

@Component({
  selector: 'app-bill-query',
  templateUrl: './bill-query.component.html',
  styleUrls: ['./bill-query.component.css']
})
export class BillQueryComponent  {

  data: Bill[]=[];
  page_no=1;
  page_size=10;
  isAll=true;
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
    http.post<JobBill>('https://localhost:7285/GetAllBill', body, options).subscribe(data_result=>{
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


}
