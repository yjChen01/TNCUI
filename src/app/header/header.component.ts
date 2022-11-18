import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  title_system_status='系統狀態';
  title_storage_status='儲位狀態';
  title_PLC_status='PLC狀態';
  title_error_exception='異常排除';
  title_bill_query='訂單查詢';

  constructor() { }

}
