import { Storage } from 'aws-amplify'
import { defaultS3Conf} from '../constans'
import {interfaces} from '../model'
import S3ConfigType = interfaces.S3ConfigType

class S3Client {
  conf: S3ConfigType;
  storage: any;
  constructor(config: S3ConfigType = {}, storage: any = Storage) {
    this.conf = Object.assign(defaultS3Conf, config);
    this.storage = storage;
  }
  getS3ObjecPreSignedUrl(path: string) {
    return this.storage.get(path, this.conf);
  }
}
export default S3Client