import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bill-query',
  templateUrl: './bill-query.component.html',
  styleUrls: ['./bill-query.component.css']
})
export class BillQueryComponent  {

  data: any[]=[];
  page_no=1;
  page_size=10;
  isAll=true;

  constructor(private http:HttpClient) {
    let headers = new HttpHeaders({
      'Content-Type': 'text/json'
    });
    let options = {
      headers
    };
    let body={
      "page_no":this.page_no,
      "page_size":this.page_size,
      "isAll":this.isAll,
    }
    http.post<any[]>('https://localhost:7285/GetAllBill', JSON.stringify(body)).subscribe(data_result=>{
      this.data=data_result;
      console.log(data_result);
  })
  }


}
