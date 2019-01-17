import { interfaces } from '../model';
import S3Client from './s3Client';
import S3ConfigType = interfaces.S3ConfigType;
export default class PasswordLessService extends S3Client {
    private token?;
    private siteId;
    private client;
    constructor(siteId: string, config?: S3ConfigType, storage?: any, httpClient?: {
        get(url: string): Promise<{}>;
        post(url: string, body?: {}): Promise<{}>;
    });
    getToken(): string;
    requestToken(): Promise<this>;
    getPasswordLessURL(url: string, username: string): Promise<any>;
    getNewUser(wordpressUrl: string, postUrl: string): Promise<any>;
}
