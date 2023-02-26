import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationExeption } from "../exeptions/validation.exeption";

@Injectable()
export  class  ValidationPipe implements PipeTransform<any>{
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

    // валидация тела запроса
    const obj = plainToClass(metadata.metatype, value)
    if(!obj){return }
    const errors = await validate(obj)
    if (errors.length){
      let messages = errors.map(e=>{
        const blabla=e.property.toString()
        const value=Object.values(e.constraints).join(', ')
        return {[`${blabla}`]:value}
        // `${e.property} -  ${Object.values(e.constraints).join(', ')}`
      })
    throw new ValidationExeption(messages)
    }
    return value
  }

}
