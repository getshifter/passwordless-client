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
const aws_amplify_1 = require("aws-amplify");
const s3Client_1 = __importDefault(require("./s3Client"));
const client_1 = __importDefault(require("./client"));
const constans_1 = require("../constans");
class PasswordLessService extends s3Client_1.default {
    constructor(siteId, config = {}, storage = aws_amplify_1.Storage, httpClient = client_1.default) {
        super(config, storage);
        this.siteId = siteId;
        this.client = httpClient;
    }
    getToken() {
        if (!this.token)
            throw new Error('token is empty.');
        return this.token;
    }
    requestToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUrl = yield this.getS3ObjecPreSignedUrl(`${this.siteId}/token`);
            const result = yield this.client.get(tokenUrl);
            this.token = result.text || '';
            return this;
        });
    }
    getPasswordLessURL(url, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.getToken();
            try {
                const result = yield this.client.get(`${url}/wp-json/shifter/v1/user/${username}?token=${token}`);
                return result.body.loginUrl;
            }
            catch (e) {
                // 404なら作成を促す定数をいれる
                if (e.status === 404) {
                    if (e.response.body.code === constans_1.ERROR_USER_NOT_FOUND)
                        return constans_1.SHOULD_CREATE_USER;
                }
                // NEED TO ADD A LOGGER
                console.log(e); // eslint-disable-line
                return `${url}/wp-admin/`;
            }
        });
    }
    getNewUser(wordpressUrl, postUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post(postUrl);
                return response.body.loginUrl;
            }
            catch (e) {
                return `${wordpressUrl}/wp-admin/`;
            }
        });
    }
}
exports.default = PasswordLessService;
