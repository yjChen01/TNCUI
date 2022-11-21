import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EQStatus, Shuttle, Lift } from '../eqstatus';

@Component({
  selector: 'app-plcstatus',
  templateUrl: './plcstatus.component.html',
  styleUrls: ['./plcstatus.component.css']
})
export class PLCStatusComponent  {
  shuttles: { [key: string]: Shuttle; };
  lifts:  {[key: string]: Lift; };

  constructor(private http:HttpClient) {

    http.post<EQStatus>('http://192.168.214.87:9080/get_status', '').subscribe(data_result=>{
      this.shuttles=data_result.shuttles;
      this.lifts=data_result.lifters;
    })
  }



}
