import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-except',
  templateUrl: './error-except.component.html',
  styleUrls: ['./error-except.component.css']
})
export class ErrorExceptComponent  {
  data: any[]=[];
  constructor(private http:HttpClient) {
    http.post<any[]>('https://localhost:7285/GetAllBill', '').subscribe(data_result=>{
      this.data=data_result;
      console.log(data_result);
  })
  }

}
