import { SystemActionComfirmActionDialogComponent } from './../system-action-comfirm-action-dialog/system-action-comfirm-action-dialog.component';
import { StorageList } from './../job-bill';
import { JobDetailDialogComponent } from './../job-detail-dialog/job-detail-dialog.component';
import { UniverseFunc } from './../universe-func';
import { StationStatusDialogComponent } from './../station-status-dialog/station-status-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { EQStatus, TaskExecutor } from '../eqstatus';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environment';
import { Bill } from '../job-bill';
import { error_type } from '../eq-error-enum';

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

  system_state:number=0;
  system_state_btn_txt:string;

  shuttle_system: { [key: string]: TaskExecutor };
  shuttle_system_arr: TaskExecutor[] = [];
  shuttle_name_arr: string[] = [];

  lift_system: { [key: string]: boolean };
  lift_system_arr:boolean[]=[];
  lift_name_arr:string[]=[];

  shuttle_count:number=0;
  lift_count:number=0;

  functool :UniverseFunc=new UniverseFunc();

  constructor(private http: HttpClient,public dialog:MatDialog) {
    http
      .post<EQStatus>(`${environment.geneapi}/get_status`, '')
      .subscribe((data_result) => {
        this.shuttle_system = data_result.task_executors;
        this.lift_system = data_result.system.lifters;
        this.system_state=data_result.system.state;

        let v_shuttle_system_arr: TaskExecutor[] = [];
        let v_lift_system_arr: boolean[] = [];
        for (const [key, value] of Object.entries(this.shuttle_system)) {
          // console.log(`${key}: ${value}`);
          // console.log(value.coord);
          value.coord=this.functool.transferCoordinateSqlToUser_systemstate(value.coord);
          // console.log(value.coord);
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

  refresh_EQ_data(http:HttpClient){
    http
    .post<EQStatus>(`${environment.geneapi}/get_status`, '')
    .subscribe((data_result) => {
      this.shuttle_system = data_result.task_executors;
      this.lift_system = data_result.system.lifters;
      this.system_state=data_result.system.state;

      let v_shuttle_system_arr: TaskExecutor[] = [];
      let v_lift_system_arr: boolean[] = [];
      for (const [key, value] of Object.entries(this.shuttle_system)) {
        // console.log(`${key}: ${value}`);
        value.coord=this.functool.transferCoordinateSqlToUser_systemstate(value.coord);
        v_shuttle_system_arr.push(value);
        this.shuttle_name_arr.push(key);
        // this.shuttle_count++;
      }
      for(const[key,value] of Object.entries(this.lift_system)){
        v_lift_system_arr.push(value);
        this.lift_name_arr.push(key);
        // this.lift_count++;
      }
      this.shuttle_system_arr = v_shuttle_system_arr;
      this.lift_system_arr=v_lift_system_arr;
    });
  }

  handle_EQ_data(data_result:EQStatus){
    this.shuttle_system = data_result.task_executors;
    this.lift_system = data_result.system.lifters;
    this.system_state=data_result.system.state;
    // console.log('街道改變'+data_result.system.state);

    let v_shuttle_system_arr: TaskExecutor[] = [];
    let v_lift_system_arr: boolean[] = [];
    for (const [key, value] of Object.entries(this.shuttle_system)) {
      // console.log(`${key}: ${value}`);
      value.coord=this.functool.transferCoordinateSqlToUser_systemstate(value.coord);
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
  a:number=0;

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

  send_task_api(body:any,command_type:number){
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
            alert(this.functool.error_msg_trans(data_result.message,command_type));
          }
        },
        error:(err)=>{
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }

  system_botton_class(){
    // console.log(state);
    if(this.system_state==0){
      // console.log('系統停止')
      this.system_state_btn_txt='開始';
      return 'start_system';
    }
    else if(this.system_state==1){
      // console.log('系統停止中')
      this.system_state_btn_txt='停止中';
      return 'stoping_system';
    }
    else{
      // console.log('系統啟用')
      this.system_state_btn_txt='停止';
      return 'stop_system';
    }
  }

  system_action(){
    if(this.system_state!=1){
      // this.system_state=2;
      this.showComfirmSystemActionDialog(this.system_state);
    }
    else{
      console.log('系統停止中，無法切換');
    }
    this.refresh_EQ_data(this.http);
  }

  lift_action(task_type:number,lift_name:string){
    // console.log(task_type);
    let v_task_name:string;
    let command_type:string;
    if(task_type==1){
      v_task_name='remove_blocked_lifter';
      command_type='unblock_lifter_error';
    }
    else{
      v_task_name='add_blocked_lifter';
      command_type='block_lifter_error';
    }

    let v_task_param={
      lifter_name : lift_name
    }

    let body = {
      task_name:v_task_name,
      task_param:v_task_param
    };
    console.log(body);
    this.send_task_api(body,error_type[command_type]);
    this.refresh_EQ_data(this.http);
  }

  shuttle_action(task_type:number,shuttle_name:string){
    if(task_type==1){//自動
      let v_task_param={
        executor_name : shuttle_name
      }

      let body = {
        task_name:'switch_to_automatic',
        task_param:v_task_param
      };
      console.log(body);
      this.send_task_api(body,error_type['switch_to_auto_error']);
    }
    else if(task_type==2){//手動
      this.showStatinoStatusDialog(shuttle_name);
    }
    else if(task_type==3){//至充電站
      let v_task_param={
        executor_name : shuttle_name
      }

      let body = {
        task_name:'move_to_charging_station',
        task_param:v_task_param
      };
      console.log(body);
      this.send_task_api(body,error_type['move_to_charge_stn_error']);
    }
    else{//至別層
      let v_task_param={
        executor_name : shuttle_name
      }

      let body = {
        task_name:'move_to_another_layer',
        task_param:v_task_param
      };
      console.log(body);
      this.send_task_api(body,error_type['move_to_other_layer_error']);
    }
    this.refresh_EQ_data(this.http);
  }

  showStatinoStatusDialog(eq_name:string){
      this.dialog.open(StationStatusDialogComponent,{
        data:{
          EQ_name:eq_name
        }
      });
  }
  aaa(a:number){
    console.log(a);
  }

  getJobDetail(v_job_id:string){
    let body = {
      job_id:v_job_id
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };
    this.http
      .post<Bill>(`${environment.api}/GetJobDetail`,body,options)
      .subscribe({
        next: (data_result) => {
          this.dialog.open(JobDetailDialogComponent,{
            data:{
              job_id:v_job_id,
              bin_id:data_result.bin_id,
              job_type:data_result.job_type
            }
          });
        },
        error:(err)=>{
          alert('api連線錯誤: \n'+err.message);
        }
      });
  }

  showComfirmSystemActionDialog(action_type:number){
    this.dialog.open(SystemActionComfirmActionDialogComponent,{
      data:{
        CommandName:action_type
      }
    });
  }
}
