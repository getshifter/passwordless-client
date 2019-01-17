import { interfaces } from '../model';
import S3ConfigType = interfaces.S3ConfigType;
declare class S3Client {
    conf: S3ConfigType;
    storage: any;
    constructor(config?: S3ConfigType, storage?: any);
    getS3ObjecPreSignedUrl(path: string): any;
}
export default S3Client;
