import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { LayerInfo } from '../eqstatus';

@Component({
  selector: 'app-storage-status',
  templateUrl: './storage-status.component.html',
  styleUrls: ['./storage-status.component.css'],
})
export class StorageStatusComponent {
  layer_list_ddl: any[] = [];
  layer_count: number = 21;

  column_count: number = 88;

  shuttle_column_4: number = 0;
  shuttle_column_3: number = 19;
  shuttle_column_2: number = -1;
  shuttle_column_1: number = -99;
  shuttle_column_0: number = 22;

  shuttle_column_state_4: boolean = false;
  shuttle_column_state_3: boolean = true;
  shuttle_column_state_2: boolean = true;
  shuttle_column_state_1: boolean = false;
  shuttle_column_state_0: boolean = false;

  current_layer: number = 4;

  storage_data: number[][] = [[]];
  // hey:LayerInfo;

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };

    let body = {
      layer: this.current_layer,
    };

    for (let i = 1; i <= this.layer_count; i++) {
      this.layer_list_ddl.push({ key: i, value: i });
    }

    http
      .post<LayerInfo>('https://localhost:7285/GetStorageState', body, options)
      .subscribe((data_result) => {
        for (const [key, value] of Object.entries(data_result)) {
          this.storage_data[value.row_no]=value.row_state;
        }
      });
    setInterval(() => {
      http
        .post<LayerInfo>(
          'https://localhost:7285/GetStorageState',
          body,
          options
        )
        .subscribe((data_result) => {
          for (const [key, value] of Object.entries(data_result)) {
            this.storage_data[value.row_no]=value.row_state;
          }
        });
    }, 4000);
  }

  getErrorLightClass(state: boolean) {
    if (state === true) {
      return 'shuttle_error_color';
    } else {
      return 'shuttle_normal_color';
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
}
