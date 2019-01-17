"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("superagent"));
const client = {
    get(url) {
        return new Promise((resolve, reject) => {
            request.get(url).end((err, response) => {
                if (err) {
                    reject(err);
                }
                else if (response.status > 299) {
                    reject(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },
    post(url, body = {}) {
        return new Promise((resolve, reject) => {
            request.post(url).end((err, response) => {
                if (err) {
                    reject(err);
                }
                else if (response.status > 299) {
                    reject(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
};
exports.default = client;
