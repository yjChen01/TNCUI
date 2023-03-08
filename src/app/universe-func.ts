import { block_lifter_error, correct_job_error, error_type, move_to_charge_stn_error, move_to_other_layer_error, resend_and_fin_job_error, start_error, stop_error, switch_to_auto_error, switch_to_manual_error, unblock_lifter_error } from "./eq-error-enum";

export class UniverseFunc{
  public transferCoordinateSqlToUser(input:string):string{
    let rsl:string='';
    let inputarr:string[]=[];
    let outputarr:number[]=[];

    inputarr=input.split(",");
    for (let index = 0; index < inputarr.length; index++) {
      const element = inputarr[index];
      if(index===0 || index===2){
        outputarr.push(+element+1);
      }
      else if(index===1){
        outputarr.push(+element-1);
      }
      else{
        outputarr.push(+element);
      }
    }

    rsl=outputarr[0]+','+outputarr[1]+','+outputarr[2]+','+outputarr[3];

    return rsl;
  }

  public transferCoordinateSqlToUser_systemstate(inputarr:number[]):number[]{
    let rsl:string='';
    let outputarr :number[]=[];
    for (let index = 0; index < inputarr.length; index++) {
      const element = inputarr[index];
      if(index===0 || index===2){
        outputarr.push(element+1);
      }
      else if(index===1){
        outputarr.push(element-1);
      }
      else{
        outputarr.push(element);
      }
    }

    return outputarr;
  }

  public transferCoordinateUserToSql(input:string):string{
    let rsl:string='';
    let inputarr:string[]=[];
    let outputarr:number[]=[];

    inputarr=input.split(",");
    for (let index = 0; index < inputarr.length; index++) {
      const element = inputarr[index];
      if(index===0 || index===2){
        outputarr.push(+element-1);
      }
      else if(index===1){
        outputarr.push(+element+1);
      }
      else{
        outputarr.push(+element);
      }
    }

    rsl=outputarr[0]+','+outputarr[1]+','+outputarr[2]+','+outputarr[3];

    return rsl;
  }

  error_msg_trans(errormsg:string,errortype:number):string{//不包含需帶入原本英文錯誤的最大enum值
    let transfer_rsl:string='';
    if(isNaN(Number(errormsg.split(",",1)))){
      // console.log('error code不是數字');
      //帶中文不明異常+原本的英文錯誤碼
      return '未知異常，請洽資訊人員;'+errormsg;
    }
    else{

      let errcode:number=Number(errormsg.split(",",1));

      switch(errortype){
        case error_type['start_error']:

          if(errcode<4){
            transfer_rsl=start_error[errcode];
          }
          else if(errcode===4||errcode===5){
            transfer_rsl=`${start_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
          return transfer_rsl;

        case error_type['stop_error']:
          if(errcode<2){
            transfer_rsl=stop_error[errcode];
          }
          else if(errcode==2){
            transfer_rsl=`${stop_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['switch_to_auto_error']:
          if(errcode<6){
            transfer_rsl=switch_to_auto_error[errcode];
          }
          else if(errcode==6){
            transfer_rsl=`${switch_to_auto_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl ;

        case error_type['switch_to_manual_error']:
          if(errcode<3){
            transfer_rsl=switch_to_manual_error[errcode];
          }
          else if(errcode==3){
            transfer_rsl=`${switch_to_manual_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['move_to_other_layer_error']:
          if(errcode<6){
            transfer_rsl=move_to_other_layer_error[errcode];
          }
          else if(errcode==6){
            transfer_rsl=`${move_to_other_layer_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['move_to_charge_stn_error']:
          if(errcode<5){
            transfer_rsl=move_to_charge_stn_error[errcode];
          }
          else if(errcode==5){
            transfer_rsl=`${move_to_charge_stn_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['resend_and_fin_job_error']:
          if(errcode<3){
            transfer_rsl=resend_and_fin_job_error[errcode];
          }
          else if(errcode==3){
            transfer_rsl=`${resend_and_fin_job_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['correct_job_error']:
          if(errcode<7){
            transfer_rsl=correct_job_error[errcode];
          }
          else if(errcode==7){
            transfer_rsl=`${correct_job_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['block_lifter_error']:
          if(errcode<3){
            transfer_rsl=block_lifter_error[errcode];
          }
          else if(errcode==3){
            transfer_rsl=`${block_lifter_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;

        case error_type['unblock_lifter_error']:
          if(errcode<5){
            transfer_rsl=unblock_lifter_error[errcode];
          }
          else if(errcode==5){
            transfer_rsl=`${unblock_lifter_error[errcode]};${errormsg}`;
          }
          else{
            transfer_rsl='未知異常，請洽資訊人員;'+errormsg;
          }
        return transfer_rsl;
      }

    }
    return transfer_rsl;
  }
}
