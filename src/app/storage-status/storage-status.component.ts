import {
  EQStatus,
  Shuttle,
  LayerInfo,
  TaskExecutor,
  Shuttle_class,
} from './../eqstatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { environment } from '@environment';
import { StorageList } from '../job-bill';
import { UniverseFunc } from '../universe-func';

@Component({
  selector: 'app-storage-status',
  templateUrl: './storage-status.component.html',
  styleUrls: ['./storage-status.component.css'],
})
export class StorageStatusComponent implements OnDestroy {
  ngOnDestroy() {
    if (this.intv) {
      clearInterval(this.intv);
    }
  }
  //setting
  layer_count: number = 21;
  column_count: number = 88;
  row_count: number = 5;

  layer_list_ddl: any[] = [];

  //shuttle同層樓僅有一台，arr長度=row數
  shuttle_col: number[] = new Array(this.row_count);
  shuttle_col_state: number[] = new Array(this.row_count);

  current_layer: number = 1;

  storage_data: number[][] = [[]];

  //搜尋儲位狀態用變數
  data: StorageList[] = [];
  storage_serch_storage_id: string = '';
  storage_serch_bin_id: string = '';

  toolfunc: UniverseFunc = new UniverseFunc();

  intv: any;
  // hey:LayerInfo;
  constructor(private http: HttpClient) {
    for (let i = 1; i <= this.layer_count; i++) {
      this.layer_list_ddl.push({ key: i, value: i });
    }

    //ini storage state(樓層=顯示樓層-1 (0 base))
    this.changeLayerStorageState(http);

    //Ini shuttle state(樓層=PLC樓層(1 base))
    this.changeLayerShuttle(http);

    //刷新頁面
    this.intv = setInterval(() => {
      //ini storage state(樓層=顯示樓層-1 (0 base))
      this.changeLayerStorageState(http);

      //Ini shuttle state(樓層=PLC樓層(1 base))
      this.changeLayerShuttle(http);
    }, 3000);
  }

  getErrorLightClass(state: number) {
    if (state === 0) {
      return 'shuttle_normal_color';
    } else {
      return 'shuttle_error_color';
    }
  }

  getStorageClass(state: number) {
    if (state === 0) {
      return 'ia-empty-storage';
    } else if (state === 1) {
      return 'ia-solid-storage';
    } else if (state === 2) {
      return 'ia-inbound-storage';
    } else if (state === 3) {
      return 'ia-outbound-storage';
    } else if (state === 4) {
      return 'ia-relocated-storage';
    } else if (state === 5) {
      return 'ia-maintain-storage';
    } else {
      return 'ia-forbidden-storage';
    }
  }

  checkLayerHaveShuttle(EQ: EQStatus) {
    let shuttle: Shuttle[] = [];
    let hasshuttle = 0;

    for (const [key, value] of Object.entries(EQ.task_executors)) {
      let temp_task = new Shuttle_class();
      // console.log(value.coord);
      temp_task.row = value.coord[0];
      temp_task.column = value.coord[1];
      temp_task.layer = value.coord[2];
      temp_task.is_error = 0;
      // console.log(temp_task);
      shuttle.push(temp_task);
    }

    let layer_shuttle_array: number[][] = [[]];
    let temp_shuttle_state_arr: number[] = [0, 0, 0, 0, 0];
    let temp_column_arr: number[] = [-99, -99, -99, -99, -99];

    //檢查是否有shuttle在目標樓層，若有則將其row,col,state加入layer_shuttle_array[]中
    for (let i = 0; i < shuttle.length; i++) {
      if (shuttle[i].layer == this.current_layer) {
        // console.log('shuttle:' + i + ';col:' + shuttle[i].column);

        layer_shuttle_array.push([
          shuttle[i].row,
          shuttle[i].column,
          shuttle[i].is_error,
        ]);
        // console.log(layer_shuttle_array);

        // this.shuttle_row = shuttle[i].row;
        // this.shuttle_col_state = shuttle[i].is_error;

        // let shuttle_col:number=shuttle[i].column;
        // for (let j = 0; j < this.shuttle_col.length; j++) {
        //   if (j === this.shuttle_row) {
        //     this.shuttle_col[j] = shuttle_col;
        //   } else {
        //     this.shuttle_col[j] = -99;
        //   }
        // }
        // console.log(this.shuttle_col);

        //並計算本樓共有幾台shuttle
        hasshuttle++;
      }
    }
    //若該樓層存在梭車，則對取出的layer_shuttle_arr處理，將值指入顯示用的arr中(layer_shuttle_array[0]是空陣列，故從1開始)
    if (layer_shuttle_array.length > 1) {
      for (let j = 1; j < layer_shuttle_array.length; j++) {
        //將col指入對應row
        temp_column_arr[layer_shuttle_array[j][0]] = layer_shuttle_array[j][1];
        //將state指入對應row
        temp_shuttle_state_arr[layer_shuttle_array[j][0]] =
          layer_shuttle_array[j][2];
      }
    }
    //最後將值放入實際使用的顯示陣列中
    this.shuttle_col = temp_column_arr;
    this.shuttle_col_state = temp_shuttle_state_arr;
    // console.log('col:'+this.shuttle_col);
    // console.log('state:'+this.shuttle_col_state);
    return hasshuttle;
  }

  clickLayerDDL(layer: number) {
    this.current_layer = layer;
    this.changeLayerStorageState(this.http);
    this.changeLayerShuttle(this.http);
  }

  changeLayerStorageState(http: HttpClient) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };

    let body = {
      layer: this.current_layer - 1,
    };
    http
      .post<LayerInfo>(`${environment.api}/GetStorageState`, body, options)
      .subscribe((data_result) => {
        for (const [key, value] of Object.entries(data_result)) {
          this.storage_data[value.row_no] = value.row_state;
        }
      });
  }
  changeLayerShuttle(http: HttpClient) {
    http
      .post<EQStatus>(`${environment.geneapi}/get_status`, '')
      .subscribe((data_result) => {
        this.checkLayerHaveShuttle(data_result);
      });
  }

  SearchStorageData(v_storage_id: string, v_bin_id: string) {
    if (v_storage_id === '' && v_bin_id === '') {
      alert('請輸入儲位編號或箱號');
    } else {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      let options = {
        headers,
      };

      let input_storage_id: string;
      if (v_storage_id === '') {
        input_storage_id = v_storage_id;
      } else {
        input_storage_id =
          this.toolfunc.transferCoordinateUserToSql(v_storage_id);
      }

      console.log(input_storage_id);
      let body = {
        storage_id: input_storage_id,
        bin_id: v_bin_id,
      };
      this.http
        .post<StorageList[]>(`${environment.api}/GetStorageInfo`, body, options)
        .subscribe((data_result) => {
          for (let index = 0; index < data_result.length; index++) {
            const element = data_result[index];
            element.storage_id = this.toolfunc.transferCoordinateSqlToUser(
              element.storage_id
            );
          }
          this.data = data_result;
        });
      // console.log('testrsl:'+this.toolfunc.transferCoordinateUserToSql(v_storage_id));
    }
  }

  ChangeStoreStatus(v_storage_id: string, v_is_going_block: number) {
    if (v_storage_id === '') {
      alert('請輸入儲位編號');
    } else {
      var getstorage_id = v_storage_id.split(',');
      if (getstorage_id.length !== 4) {
        alert('輸入格式錯誤');
        return;
      }
      else if(Number.isNaN(+getstorage_id[0])||Number.isNaN(+getstorage_id[1])||Number.isNaN(+getstorage_id[2])||Number.isNaN(+getstorage_id[3])){
        alert('請勿輸入非數字字元');
        return;
      }
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      let options = {
        headers,
      };
      let body = {
        row: +getstorage_id[0] - 1,
        col: +getstorage_id[1] + 1,
        layer: +getstorage_id[2] - 1,
        side: +getstorage_id[3],
        blockcmd: +v_is_going_block, //禁用=1；啟用=0
      };

      this.http
        .post<number>(`${environment.api}/UpdateStorageState`, body, options)
        .subscribe((data_result) => {
          if (data_result === -1) {
            alert('更新儲位狀態失敗,不存在此儲位');
          } else if (data_result === 0) {
            alert('更新儲位狀態失敗,輸入儲位為復歸用保留儲位');
          } else if (data_result === 1) {
            alert(`已成功更新${v_storage_id}狀態`);
          } else if (data_result === 9) {
            alert(
              `儲位${v_storage_id}當前is_blocked狀態已為${v_is_going_block}`
            );
          }
        });
    }
  }
}
