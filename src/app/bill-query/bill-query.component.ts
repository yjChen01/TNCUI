import { UniverseFunc } from './../universe-func';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@environment';
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
  search_bin_id:string='';
  total_line_count:number;

  functool :UniverseFunc=new UniverseFunc();

  constructor(private http:HttpClient) {
    this.GetErrorBill(http,'','');
  }

  GetErrorBill(http:HttpClient,v_job_id:string,v_bin_id:string){
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
      "job_id":v_job_id,
      "bin_id":v_bin_id
    };
    http.post<JobBill>(`${environment.api}/GetAllBill`, body, options).subscribe(data_result=>{
      for (let index = 0; index < data_result.bills.length; index++) {
        const element = data_result.bills[index];
        // console.log(element.to_coord);
        if(element.from_coord!==''){
          element.from_coord=this.functool.transferCoordinateSqlToUser(element.from_coord);
        }
        if(element.to_coord!==''){
          element.to_coord=this.functool.transferCoordinateSqlToUser(element.to_coord);
        }
        // console.log(element.to_coord);
      }
      this.data=data_result.bills;
      this.total_line_count=data_result.total_page_count;
    })
  }

  SearchByJobid(v_job_id:string,v_bin_id:string){
    // console.log(v_job_id);
    this.search_job_id=v_job_id;
    this.page_no=1;
    this.GetErrorBill(this.http,v_job_id,v_bin_id);
  }

  SearchByPageNo(v_page_no:number){
    this.page_no=v_page_no;
    this.GetErrorBill(this.http,this.search_job_id,this.search_bin_id);
    console.log(v_page_no);
  }


}
