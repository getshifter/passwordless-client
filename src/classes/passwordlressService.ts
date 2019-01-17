import { Storage } from 'aws-amplify'
import {interfaces} from '../model'
import S3Client from './s3Client'
import client from './client'
import { 
  SHOULD_CREATE_USER,
  ERROR_USER_NOT_FOUND
 } from '../constans'
 import S3ConfigType = interfaces.S3ConfigType

export default class PasswordLessService extends S3Client {
  private token?: string;
  private siteId: string;
  private client: any
  constructor(siteId: string, config: S3ConfigType = {}, storage: any = Storage, httpClient = client) {
    super(config, storage);
    this.siteId = siteId;
    this.client = httpClient
  }
  getToken() {
    if (!this.token) throw new Error('token is empty.');
    return this.token;
  }
  async requestToken() {
    const tokenUrl = await this.getS3ObjecPreSignedUrl(`${this.siteId}/token`);
    const result = await this.client.get(tokenUrl);
    this.token = result.text || '';
    return this;
  }
  async getPasswordLessURL(url: string, username: string) {
    const token = this.getToken();
    try {
      const result = await this.client.get(
        `${url}/wp-json/shifter/v1/user/${username}?token=${token}`,
      );
      return result.body.loginUrl;
    } catch (e) {
      // 404なら作成を促す定数をいれる
      if (e.status === 404) {
        if (e.response.body.code === ERROR_USER_NOT_FOUND) return SHOULD_CREATE_USER;
      }
      // NEED TO ADD A LOGGER
      console.log(e); // eslint-disable-line
      return `${url}/wp-admin/`;
    }
  }
  async getNewUser(wordpressUrl: string, postUrl: string) {
    try {
      const response = await this.client.post(postUrl);
      return response.body.loginUrl;
    } catch (e) {
      return `${wordpressUrl}/wp-admin/`;
    }
  }
}