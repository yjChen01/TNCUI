import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-except',
  templateUrl: './error-except.component.html',
  styleUrls: ['./error-except.component.css']
})
export class ErrorExceptComponent  {
  data: any[]=[];
  page_no=1;
  page_size=10;
  isAll=false;

  constructor(private http:HttpClient) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers
    };

    let body={
      "page_no":this.page_no,
      "page_size":this.page_size,
      "isAllData":this.isAll
    };

    http.post<any[]>('https://localhost:7285/GetAllBill', body, options).subscribe(data_result=>{
      this.data=data_result;

    })
  }

}
