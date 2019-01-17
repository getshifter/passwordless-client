import {interfaces} from '../model'
import wpRole = interfaces.wpRole

class WPUserBuilder {
  private token?: string;
  private role: wpRole;
  private username?: string;
  private email?: string;
  constructor() {
    this.role = 'administrator';
  }
  setToken(token: string) {
    this.token = token;
    return this;
  }
  setUsername(username: string) {
    this.username = username;
    return this;
  }
  setEmail(email: string) {
    this.email = email;
    return this;
  }
  setRole(role: wpRole) {
    this.role = role;
    return this;
  }
  getQuery(wordpressUrl: string) {
    if (!this.username || !this.token || !this.email) throw new Error('username or token or email not found')
    return `${wordpressUrl}/wp-json/shifter/v1/user/create/${this.username}?token=${
      this.token
    }&email=${this.email}&role=${this.role}`;
  }
}

export default WPUserBuilder