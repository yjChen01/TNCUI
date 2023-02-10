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
}
