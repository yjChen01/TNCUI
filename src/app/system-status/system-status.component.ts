import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EQStatus, TaskExecutor } from '../eqstatus';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
  styleUrls: ['./system-status.component.css'],
})
export class SystemStatusComponent {
  shuttle_state_list = [
    { key: 1, value: '自動模式' },
    { key: 2, value: '手動模式' },
    { key: 3, value: '移至充電站' },
    { key: 4, value: '移動至別層' },
  ];
  lift_state_list = [
    { key: 1, value: '啟用' },
    { key: 2, value: '禁用' },
  ];

  shuttle_system: { [key: string]: TaskExecutor };
  shuttle_system_arr: TaskExecutor[] = [];
  shuttle_name_arr: string[] = [];

  lift_system: { [key: string]: boolean };
  lift_system_arr:boolean[]=[];
  lift_name_arr:string[]=[];

  shuttle_count:number=0;
  lift_count:number=0;

  constructor(private http: HttpClient) {
    http
      .post<EQStatus>('http://192.168.214.87:9080/get_status', '')
      .subscribe((data_result) => {
        this.shuttle_system = data_result.task_executors;
        this.lift_system = data_result.system.lifters;
        let v_shuttle_system_arr: TaskExecutor[] = [];
        let v_lift_system_arr: boolean[] = [];
        for (const [key, value] of Object.entries(this.shuttle_system)) {
          // console.log(`${key}: ${value}`);
          v_shuttle_system_arr.push(value);
          this.shuttle_name_arr.push(key);
          this.shuttle_count++;
        }
        for(const[key,value] of Object.entries(this.lift_system)){
          v_lift_system_arr.push(value);
          this.lift_name_arr.push(key);
          this.lift_count++;
        }
        this.shuttle_system_arr = v_shuttle_system_arr;
        this.lift_system_arr=v_lift_system_arr;
      });
  }

  handle_EQ_data(data_result:EQStatus){
    this.shuttle_system = data_result.task_executors;
    this.lift_system = data_result.system.lifters;
    let v_shuttle_system_arr: TaskExecutor[] = [];
    let v_lift_system_arr: boolean[] = [];
    for (const [key, value] of Object.entries(this.shuttle_system)) {
      // console.log(`${key}: ${value}`);
      v_shuttle_system_arr.push(value);
    }
    for(const[key,value] of Object.entries(this.lift_system)){
      v_lift_system_arr.push(value);
    }
    this.shuttle_system_arr = v_shuttle_system_arr;
    this.lift_system_arr=v_lift_system_arr;
    // console.log('有感覺');
  }

  convert_eq_state(state: number) {
    if (state == 0) return '未連接';
    else if (state == 1) return '維修';
    else if ((state == 2)) return '閒置';
    else if ((state == 3)) return '任務';
    else return '異常';
  }

  get_state_class(state:number){
    if (state == 0) return 'ia-offline-shuttle';
    else if (state == 1) return 'ia-repair-shuttle';
    else if ((state == 2)) return 'ia-idle-shuttle';
    else if ((state == 3)) return 'ia-busy-shuttle';
    else return 'ia-error-shuttle';
  }

  get_lifter_state(state:boolean){
    if (state == true) return '禁用';
    else return '啟用';
  }

  get_lifter_class(state:boolean){
    if (state == true) return 'ia-error-shuttle';
    else return 'ia-idle-shuttle';
  }
}
