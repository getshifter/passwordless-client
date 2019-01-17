"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WPUserBuilder {
    constructor() {
        this.role = 'administrator';
    }
    setToken(token) {
        this.token = token;
        return this;
    }
    setUsername(username) {
        this.username = username;
        return this;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    setRole(role) {
        this.role = role;
        return this;
    }
    getQuery(wordpressUrl) {
        if (!this.username || !this.token || !this.email)
            throw new Error('username or token or email not found');
        return `${wordpressUrl}/wp-json/shifter/v1/user/create/${this.username}?token=${this.token}&email=${this.email}&role=${this.role}`;
    }
}
exports.default = WPUserBuilder;
