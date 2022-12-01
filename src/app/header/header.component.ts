import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { EQStatus, Shuttle, Lift } from '../eqstatus';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() EQ_data_evt=new EventEmitter<EQStatus>();

  title_system_status = '系統狀態';
  title_storage_status = '儲位狀態';
  title_PLC_status = 'PLC狀態';
  title_error_exception = '異常排除';
  title_bill_query = '訂單查詢';

  systemstate_light: number;
  systemstate_word: string;

  billstate_light: boolean = false;

  PLC_error_light: boolean = false;

  EQ_error_count: number = 0;

  intervalId :any;
  constructor(private http: HttpClient) {
    http
      .post<EQStatus>('http://192.168.214.87:9080/get_status', '')
      .subscribe((data_result) => {
        this.countPLCerror(data_result);
        this.SetDataResult(data_result);
      });
    http
      .get<boolean>('https://localhost:7285/GetErrorBillExists')
      .subscribe((data_result) => {
        this.billstate_light = data_result;
      });

      this.intervalId=setInterval(() => {
      http
        .post<EQStatus>('http://192.168.214.87:9080/get_status', '')
        .subscribe((data_result) => {
          this.countPLCerror(data_result);
          this.SetDataResult(data_result);
        });
      http
        .get<boolean>('https://localhost:7285/GetErrorBillExists')
        .subscribe((data_result) => {
          this.billstate_light = data_result;
        });
    }, 3000);
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  getStatelightClass(state: number) {
    if (state == 0) {
      this.systemstate_word = '閒置';
      return 'icon-green-to-gray';
    } else if (state == 1) {
      this.systemstate_word = '停止中';
      return 'icon-blue-to-gray';
    } else if ((state = 2)) {
      this.systemstate_word = '停止';
      return 'icon-red-to-gray';
    } else {
      this.systemstate_word = '離線';
      return 'icon-keep-gray';
    }
  }

  countPLCerror(data: EQStatus) {
    this.EQ_error_count = 0;
    this.systemstate_light = data.system.state;
    for (const [key, value] of Object.entries(data.shuttles)) {
      // console.log(`${key}: ${value}`);
      if (value.is_error == 1) {
        this.EQ_error_count++;
      }
    }
    for (const [key, value] of Object.entries(data.lifters)) {
      // console.log(`${key}: ${value}`);
      if (value.is_error == 1) {
        this.EQ_error_count++;
      }
    }
    if (this.EQ_error_count > 0) {
      this.PLC_error_light = true;
    }
  }

  getErrorLightClass() {
    if (this.PLC_error_light === true) {
      return 'icon-red-to-gray';
    } else if (this.PLC_error_light === false) {
      return 'icon-green-to-gray';
    } else {
      return 'icon-keep-gray';
    }
  }

  getErrorBillExists(){
    if(this.billstate_light===true){
      return 'icon-red-to-gray';
    }
    else{
      return 'icon-green-to-gray';
    }
  }

  SetDataResult(data_rsl:EQStatus){
    this.EQ_data_evt.emit(data_rsl);
  }
}
