import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class UploadFileService {
  async createFile(file):Promise<String>{
    try{
      const fileName=uuid.v4()+'.jpg'
      const filePath=path.resolve(__dirname, '..', 'static')
      if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath, {recursive:true})
      }
      fs.writeFileSync(path.join(filePath,fileName),file.buffer)
      return fileName
    }
    catch (e) {
      throw new HttpException('an error occurred while uploading the file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
