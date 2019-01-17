"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_amplify_1 = require("aws-amplify");
const constans_1 = require("../constans");
class S3Client {
    constructor(config = {}, storage = aws_amplify_1.Storage) {
        this.conf = Object.assign(constans_1.defaultS3Conf, config);
        this.storage = storage;
    }
    getS3ObjecPreSignedUrl(path) {
        return this.storage.get(path, this.conf);
    }
}
exports.default = S3Client;
