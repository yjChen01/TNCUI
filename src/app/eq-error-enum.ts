export enum error_type{
  'start_error'=0,
  'stop_error'=1,
  'switch_to_auto_error'=2,
  'switch_to_manual_error'=3,
  'move_to_other_layer_error'=4,
  'move_to_charge_stn_error'=5,
  'resend_and_fin_job_error'=6,
  'correct_job_error'=7,
  'block_lifter_error'=8,
  'unblock_lifter_error'=9
}

export enum start_error{
  '系統已啟動'=0,
  '有不在第三列充電站上的穿梭車'=1,
  '有非閒置或非手動的穿梭車'=2,
  '沒有可用的升降機'=3,
  '資料庫異常，請洽資訊人員'=4,//
  '服務異常，請洽資訊人員'=5//
}

export enum stop_error{
  '系統已停止'=0,
  '停止中，等待所有任務完成'=1,
  '服務異常，請洽資訊人員'=2//
}

export enum switch_to_auto_error{
  '請先停止系統'=0,
  '已在自動模式'=1,
  'PLC不在自動模式'=2,
  '未偵測到RFID'=3,
  '車上有箱'=4,
  '該位置無法切換自動模式'=5,
  '服務異常，請洽資訊人員'=6//
}

export enum switch_to_manual_error{
  '請先停止系統'=0,
  '有執行中任務'=1,
  '非法的維修區，請檢查其他梭車的位置是否重覆'=2,
  '服務異常，請洽資訊人員'=3//
}

export enum move_to_other_layer_error{
  '請先停止系統'=0,
  '穿梭車非閒置'=1,
  '有未連接的穿梭車'=2,
  '有異常的穿梭車'=3,
  '穿梭車不在第三列充電站上'=4,
  '沒有可用的升降機'=5,
  '服務異常，請洽資訊人員'=6//
}

export enum move_to_charge_stn_error{
  '請先停止系統'=0,
  '穿梭車非閒置'=1,
  '有未連接的穿梭車'=2,
  '有異常的穿梭車'=3,
  '已在充電站上'=4,
  '服務異常，請洽資訊人員'=5//
}

export enum resend_and_fin_job_error{
  '請先停止系統'=0,
  '無效的任務號'=1,
  '任務狀態非失敗'=2,
  '資料庫異常，請洽資訊人員'=3//
}

export enum correct_job_error{
  '請先停止系統'=0,
  '無效的任務號'=1,
  '任務狀態非失敗'=2,
  '無效的起點'=3,
  '起點有箱'=4,
  '起點狀態非閒置'=5,
  '非復歸起點'=6,
  '資料庫異常，請洽資訊人員'=7//
}

export enum block_lifter_error{
  '請先停止系統'=0,
  '無效的升降機'=1,
  '已禁用'=2,
  '服務異常，請洽資訊人員'=3//
}

export enum unblock_lifter_error{
  '請先停止系統'=0,
  '無效的升降機'=1,
  '手臂連接中'=2,
  'PLC不在自動模式'=3,
  '已啟用'=4,
  '服務異常，請洽資訊人員'=5//
}
