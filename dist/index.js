"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordlressService_1 = __importDefault(require("./classes/passwordlressService"));
const wpUserBuilder_1 = __importDefault(require("./classes/wpUserBuilder"));
const constans_1 = require("./constans");
class PasswordLessWordPress {
    constructor(siteId, PasswordLess = passwordlressService_1.default, UserBuilder = wpUserBuilder_1.default) {
        this.passwordLessService = new PasswordLess(siteId);
        this.user = new UserBuilder();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.passwordLessService.requestToken();
            this.token = this.passwordLessService.getToken();
        });
    }
    createUserData(userData) {
        const { email, role, username } = userData;
        this.user
            .setEmail(email)
            .setUsername(username)
            .setToken(this.token);
        if (role)
            this.user.setRole(role);
        return this.user;
    }
    getSignInURL(wordpressUrl, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            const url = yield this.passwordLessService.getPasswordLessURL(wordpressUrl, userData.username);
            if (url !== constans_1.SHOULD_CREATE_USER)
                return url;
            const user = this.createUserData(userData);
            return this.passwordLessService.getNewUser(wordpressUrl, user.getQuery(wordpressUrl));
        });
    }
}
exports.default = PasswordLessWordPress;
