import PasswordLessService from './classes/passwordlressService'
import WPUserBuilder from './classes/wpUserBuilder'
import {interfaces} from './model'
import { SHOULD_CREATE_USER } from './constans'
import userDataType = interfaces.userDataType

export default class PasswordLessWordPress {
  passwordLessService: any;
  token?: string;
  user: any;
  constructor(
    siteId: string,
    PasswordLess: any = PasswordLessService,
    UserBuilder: any = WPUserBuilder,
  ) {
    this.passwordLessService = new PasswordLess(siteId);
    this.user = new UserBuilder();
  }
  async initialize() {
    await this.passwordLessService.requestToken();
    this.token = this.passwordLessService.getToken();
  }
  createUserData(userData: userDataType) {
    const { email, role, username } = userData;
    this.user
      .setEmail(email)
      .setUsername(username)
      .setToken(this.token);
    if (role) this.user.setRole(role);
    return this.user;
  }
  async getSignInURL(wordpressUrl: string, userData: userDataType) {
    await this.initialize();
    const url = await this.passwordLessService.getPasswordLessURL(wordpressUrl, userData.username);
    if (url !== SHOULD_CREATE_USER) return url;
    const user = this.createUserData(userData);
    return this.passwordLessService.getNewUser(wordpressUrl, user.getQuery(wordpressUrl));
  }
}
