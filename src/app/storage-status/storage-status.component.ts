import { EQStatus, Shuttle, LayerInfo } from './../eqstatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-storage-status',
  templateUrl: './storage-status.component.html',
  styleUrls: ['./storage-status.component.css'],
})
export class StorageStatusComponent {
  //setting
  layer_count: number = 21;
  column_count: number = 88;
  row_count: number = 5;

  layer_list_ddl: any[] = [];

  //shuttle同層樓僅有一台，arr長度=row數
  shuttle_row: number;
  shuttle_col: number[] = new Array(this.row_count);
  //TODO:把它變成[]
  shuttle_col_state: number = 0;

  current_layer: number = 1;

  storage_data: number[][] = [[]];
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
    setInterval(() => {
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
    for (const [key, value] of Object.entries(EQ.shuttles)) {
      shuttle.push(value);
    }
    // console.log(shuttle);
    let layer_shuttle_array:number[][]=[[]];
    for (let i = 0; i < shuttle.length; i++) {
      if (shuttle[i].layer == this.current_layer) {
        console.log('shuttle:'+i+';col:'+shuttle[i].column);

        layer_shuttle_array.push([shuttle[i].row,shuttle[i].column]);
        console.log(layer_shuttle_array);

        this.shuttle_row = shuttle[i].row;
        this.shuttle_col_state = shuttle[i].is_error;

        let shuttle_col:number=shuttle[i].column;
        for (let j = 0; j < this.shuttle_col.length; j++) {
          if (j === this.shuttle_row) {
            this.shuttle_col[j] = shuttle_col;
          } else {
            this.shuttle_col[j] = -99;
          }
        }
        console.log(this.shuttle_col);
        hasshuttle++;
      }
      // else{
      //   console.log('不相等:'+shuttle[i].layer+'??'+this.current_layer);
      // }
    }
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
      .post<LayerInfo>('https://localhost:7285/GetStorageState', body, options)
      .subscribe((data_result) => {
        for (const [key, value] of Object.entries(data_result)) {
          this.storage_data[value.row_no] = value.row_state;
        }
      });
  }
  changeLayerShuttle(http: HttpClient) {
    http
      .post<EQStatus>('http://192.168.214.87:9080/get_status', '')
      .subscribe((data_result) => {
        // console.log(this.shuttle_col);
        let haveshuttle: number = 0;
        haveshuttle = this.checkLayerHaveShuttle(data_result);
        // console.log(
        //   'layer' + this.current_layer + 'have shuttle:' + haveshuttle
        // );
        if (haveshuttle === 0) {
          for (let i = 0; i < this.shuttle_col.length; i++) {
            this.shuttle_col[i] = -99;
          }
        }
      });
  }
}
